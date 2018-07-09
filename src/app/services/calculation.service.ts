import { Injectable } from '@angular/core';
import { StatsModel } from '../models/stats.model';
import { StatDetailModel } from '../models/stat-detail.model';
import { Subject } from 'rxjs';
import { CalculationVariableModel } from '../models/calculation-variable.model';

@Injectable()
export class CalculationService {
	public attackCalcsUpdated$ = new Subject<StatDetailModel[]>();
	public defenseCalcsUpdated$ = new Subject<StatDetailModel[]>();

	attackCalcs = new Array<StatDetailModel>();
	defenseCalcs = new Array<StatDetailModel>();

	updateCalcs(stats: StatsModel) {
		this.buildAttackCalcs(stats);
		this.buildDefenseCalcs(stats);

		this.attackCalcsUpdated$.next(this.attackCalcs);
		this.defenseCalcsUpdated$.next(this.defenseCalcs);
	}

	private buildAttackCalcs(stats: StatsModel) {
		this.attackCalcs = [];

		this.attackCalcs.push(this.getAttack(stats));
		if (stats.activeAttack || stats.effectivePhysicalSharpnessModifier) {
			this.attackCalcs.push(this.getAttackPotential(stats));
		}

		this.attackCalcs.push(this.getRawAttackAverage(stats));
		this.attackCalcs.push(this.getRawAttackAveragePotential(stats));

		this.attackCalcs.push(this.getAffinity(stats));
		if (stats.activeAffinity || stats.weakPointAffinity) {
			this.attackCalcs.push(this.getAffinityPotential(stats));
		}

		if (stats.effectiveSharpnessLevel) {
			this.attackCalcs.push(this.getEffectiveSharpness(stats));
		}

		this.attackCalcs.push(this.getCriticalBoost(stats));

		if (stats.ailment) {
			const ailmentCalc = this.getAilment(stats);
			this.attackCalcs.push(ailmentCalc);
			this.attackCalcs.push(this.getAilmentAttack(stats, ailmentCalc));
		}

		if (stats.element) {
			const elementCalc = this.getElement(stats);
			this.attackCalcs.push(elementCalc);
			this.attackCalcs.push(this.getElementAttack(stats, elementCalc));
		}

		if (stats.elderseal) {
			this.attackCalcs.push(this.getElderseal(stats));
		}

		if (stats.healOnHitPercent) {
			this.attackCalcs.push(this.getHealOnHitPercent(stats));
		}
	}

	private getAttack(stats: StatsModel): StatDetailModel {
		const attackCalc: StatDetailModel = {
			name: 'Attack',
			value: stats.totalAttack,
			calculationVariables: [
				{
					displayName: 'Base Weapon Attack',
					name: 'attack',
					value: stats.attack,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Attack',
					name: 'passiveAttack',
					value: stats.passiveAttack,
					colorClass: 'orange'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: stats.weaponAttackModifier,
					colorClass: 'purple'
				}
			]
		};

		if (stats.elementlessBoostPercent > 0 && stats.elementAttackMultiplier == 0) {
			attackCalc.calculationVariables.push(this.getElementlessVariable(stats));
			attackCalc.calculationTemplate = `{attack} × {elementlessBoostPercent} + {passiveAttack} × {weaponModifier} ≈ ${stats.totalAttack}`;
		} else {
			attackCalc.calculationTemplate = `{attack} + {passiveAttack} × {weaponModifier} ≈ ${stats.totalAttack}`;
		}

		return attackCalc;
	}

	private getElementlessVariable(stats: StatsModel): CalculationVariableModel {
		return {
			displayName: 'Elementless Boost Modifier',
			name: 'elementlessBoostPercent',
			value: (1 + stats.elementlessBoostPercent / 100),
			colorClass: 'kakhi'
		};
	}

	private getAttackPotential(stats: StatsModel): StatDetailModel {
		const attackPotentialCalc: StatDetailModel = {
			name: 'Attack Potential',
			value: stats.totalAttackPotential,
			calculationVariables: [
				{
					displayName: 'Base Weapon Attack',
					name: 'attack',
					value: stats.attack,
					colorClass: 'green'
				},
				{
					displayName: 'Physical Sharpness Modifier',
					name: 'sharpnessModifier',
					value: stats.effectivePhysicalSharpnessModifier,
					colorClass: 'blue'
				},
				{
					displayName: 'Passive Attack',
					name: 'passiveAttack',
					value: stats.passiveAttack,
					colorClass: 'orange'
				},
				{
					displayName: 'Active Attack',
					name: 'activeAttack',
					value: stats.activeAttack,
					colorClass: 'red'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: stats.weaponAttackModifier,
					colorClass: 'purple'
				}
			]
		};

		if (stats.elementlessBoostPercent > 0 && stats.elementAttackMultiplier == 0) {
			attackPotentialCalc.calculationTemplate = `{attack} × {elementlessBoostPercent} × {sharpnessModifier} + ({passiveAttack} + {activeAttack}) × {weaponModifier} ≈ ${stats.totalAttackPotential}`;
			attackPotentialCalc.calculationVariables.push(this.getElementlessVariable(stats));
		} else {
			attackPotentialCalc.calculationTemplate = `{attack} × {sharpnessModifier} + ({passiveAttack} + {activeAttack}) × {weaponModifier} ≈ ${stats.totalAttackPotential}`;
		}

		return attackPotentialCalc;
	}

	private getAffinity(stats: StatsModel): StatDetailModel {
		const affinityValue = `${stats.affinity + stats.passiveAffinity}%`;
		const affinityCalc: StatDetailModel = {
			name: 'Affinity',
			value: affinityValue,
			calculationTemplate: `{affinity} + {passiveAffinity} = ${affinityValue}`,
			calculationVariables: [
				{
					displayName: 'Weapon Base Affinity',
					name: 'affinity',
					value: stats.affinity,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Affinity',
					name: 'passiveAffinity',
					value: stats.passiveAffinity,
					colorClass: 'blue'
				}
			]
		};

		return affinityCalc;
	}

	private getAffinityPotential(stats: StatsModel): StatDetailModel {
		const value = `${stats.affinity + stats.passiveAffinity + stats.weakPointAffinity + stats.activeAffinity}%`;
		const affinityPotentialCalc: StatDetailModel = {
			name: 'Affinity Potential',
			value: value,
			calculationTemplate: `{base} + {passive} + {weakPoint} + {active} = ${value}`,
			calculationVariables: [
				{
					displayName: 'Weapon Base Affinity',
					name: 'base',
					value: stats.affinity,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Affinity',
					name: 'passive',
					value: stats.passiveAffinity,
					colorClass: 'blue'
				},
				{
					displayName: 'Weak Point Affinity',
					name: 'weakPoint',
					value: stats.weakPointAffinity,
					colorClass: 'yellow'
				},
				{
					displayName: 'Active Affinity',
					name: 'active',
					value: stats.activeAffinity,
					colorClass: 'orange'
				}
			]
		};

		return affinityPotentialCalc;
	}

	private getEffectiveSharpness(stats: StatsModel): StatDetailModel {
		const sharpnessCalc: StatDetailModel = {
			name: 'Sharpness',
			value: `${stats.effectiveSharpnessLevel.value} ${stats.effectiveSharpnessLevel.color}`,
			info: []
		};

		if (stats.sharpnessDataNeeded) {
			sharpnessCalc.color = 'red';
			sharpnessCalc.info.push('Missing data for this weapon! Sharpness values are probably incorrect!');
		}

		return sharpnessCalc;
	}

	private getCriticalBoost(stats: StatsModel): StatDetailModel {
		const critBoostValue = `${125 + stats.passiveCriticalBoostPercent}%`;
		const critBoostCalc: StatDetailModel = {
			name: 'Critical Boost',
			value: critBoostValue,
			calculationTemplate: `{base} + {passive} = ${critBoostValue}`,
			calculationVariables: [
				{
					displayName: 'Base Critical Boost',
					name: 'base',
					value: '125',
					colorClass: 'green'
				},
				{
					displayName: 'Passive Critical Boost',
					name: 'passive',
					value: stats.passiveCriticalBoostPercent,
					colorClass: 'blue'
				}
			]
		};

		return critBoostCalc;
	}

	private getAilment(stats: StatsModel): StatDetailModel {
		const ailmentCalc: StatDetailModel = {
			name: 'Ailment',
			value: stats.ailment,
			info: []
		};

		if (stats.ailmentCapped) {
			ailmentCalc.info.push('Ailment attack is capped.');
			ailmentCalc.color = 'yellow';
		}

		if (stats.ailmentHidden && stats.elementAttackMultiplier < 1) {
			ailmentCalc.info.push('Effectiveness reduced due to hidden ailment.');
			ailmentCalc.color = !stats.elementAttackMultiplier ? 'red' : 'yellow';
		}

		return ailmentCalc;
	}

	private getAilmentAttack(stats: StatsModel, ailmentCalc: StatDetailModel): StatDetailModel {
		const ailmentAttackCalc: StatDetailModel = {
			name: 'Ailment Attack',
			value: stats.totalAilmentAttack,
			color: ailmentCalc.color,
			info: ailmentCalc.info,
			calculationVariables: [
				{
					displayName: 'Weapon Base Ailment Attack',
					name: 'base',
					value: stats.baseAilmentAttack,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Ailment Attack',
					name: 'passive',
					value: stats.effectivePassiveAilmentAttack,
					colorClass: 'yellow'
				},
				{
					displayName: 'Ailment Attack Cap',
					name: 'cap',
					value: stats.ailmentCap,
					colorClass: 'orange'
				}
			]
		};

		if (stats.ailmentHidden) {
			ailmentAttackCalc.calculationVariables.push({
				displayName: 'Hidden Ailment Multiplier',
				name: 'multiplier',
				value: stats.elementAttackMultiplier,
				colorClass: 'blue'
			});

			if (stats.elementAttackMultiplier) {
				ailmentAttackCalc.calculationTemplate = `{base} × {multiplier} + {passive} ≈ ${stats.totalAilmentAttack}`;
			} else {
				ailmentAttackCalc.calculationTemplate = `({base} + {passive}) × {multiplier} ≈ ${stats.totalAilmentAttack}`;
			}
		} else {
			ailmentAttackCalc.calculationTemplate = `{base} + {passive} = ${stats.totalAilmentAttack}`;
		}

		return ailmentAttackCalc;
	}

	private getElement(stats: StatsModel): StatDetailModel {
		const elementCalc: StatDetailModel = {
			name: 'Element',
			value: stats.element,
			info: []
		};

		if (stats.elementCapped) {
			elementCalc.info.push('Element attack is capped.');
			elementCalc.color = 'yellow';
		}

		if (stats.ailmentHidden && stats.elementAttackMultiplier < 1) {
			elementCalc.info.push('Effectiveness reduced due to hidden element.');
			elementCalc.color = !stats.elementAttackMultiplier ? 'red' : 'yellow';
		}

		return elementCalc;
	}

	private getElementAttack(stats: StatsModel, elementCalc: StatDetailModel): StatDetailModel {
		const elementAttackCalc: StatDetailModel = {
			name: 'Element Attack',
			value: stats.totalElementAttack,
			color: elementCalc.color,
			info: elementCalc.info,
			calculationVariables: [
				{
					displayName: 'Weapon Base Element Attack',
					name: 'base',
					value: stats.baseElementAttack,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Element Attack',
					name: 'passive',
					value: stats.effectivePassiveElementAttack,
					colorClass: 'yellow'
				},
				{
					displayName: 'Element Attack Cap',
					name: 'cap',
					value: stats.elementCap,
					colorClass: 'orange'
				}
			]
		};

		if (stats.elementHidden) {
			elementAttackCalc.calculationVariables.push({
				displayName: 'Hidden Element Multiplier',
				name: 'multiplier',
				value: stats.elementAttackMultiplier,
				colorClass: 'blue'
			});

			if (stats.elementAttackMultiplier) {
				elementAttackCalc.calculationTemplate = `{base} × {multiplier} + {passive} ≈ ${stats.totalElementAttack}`;
			} else {
				elementAttackCalc.calculationTemplate = `({base} + {passive}) × {multiplier} ≈ ${stats.totalElementAttack}`;
			}
		} else {
			elementAttackCalc.calculationTemplate = `{base} + {passive} = ${stats.totalElementAttack}`;
		}

		return elementAttackCalc;
	}

	private getElderseal(stats: StatsModel): StatDetailModel {
		return {
			name: 'Elderseal',
			value: stats.elderseal
		};
	}

	private getHealOnHitPercent(stats: StatsModel): StatDetailModel {
		return {
			name: 'Heal on Hit',
			value: stats.healOnHitPercent
		};
	}

	private getRawAttackAverage(stats: StatsModel): StatDetailModel {
		const totalAffinity = Math.min(stats.affinity + stats.passiveAffinity, 100);
		const rawAttackAvg =
			Math.round((
				(stats.totalAttack * (totalAffinity / 100) * ((stats.passiveCriticalBoostPercent + 125) / 100))
				+ (stats.totalAttack * (1 - (totalAffinity / 100)))
			) / stats.weaponAttackModifier);

		const rawAttackAvgCalc: StatDetailModel = {
			name: 'Raw Attack Average',
			value: Number.isInteger(rawAttackAvg) ? rawAttackAvg : 0,
			calculationTemplate: `({totalAttack} × {totalAffinity} × {criticalBoost} + {totalAttack} × (100% - {totalAffinity})) ÷ {weaponModifier} = ${rawAttackAvg}`,
			calculationVariables: [
				{
					displayName: 'Total Attack',
					name: 'totalAttack',
					value: stats.totalAttack,
					colorClass: 'green'
				},
				{
					displayName: 'Total Affinity',
					name: 'totalAffinity',
					value: totalAffinity + '%',
					colorClass: 'blue'
				},
				{
					displayName: 'Total Critical Boost',
					name: 'criticalBoost',
					value: (stats.passiveCriticalBoostPercent + 125) + '%',
					colorClass: 'kakhi'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: stats.weaponAttackModifier,
					colorClass: 'purple'
				}
			]
		};

		return rawAttackAvgCalc;
	}

	private getRawAttackAveragePotential(stats: StatsModel): StatDetailModel {
		const totalAffinityPotential = Math.min(stats.affinity + stats.passiveAffinity + stats.weakPointAffinity + stats.activeAffinity, 100);
		const rawAttackAveragePotential =
			Math.round((
				(stats.totalAttackPotential * (totalAffinityPotential / 100) * ((stats.passiveCriticalBoostPercent + 125) / 100))
				+ (stats.totalAttackPotential * (1 - (totalAffinityPotential / 100)))
			) / stats.weaponAttackModifier);

		const rawAttackAveragePotentialCalc: StatDetailModel = {
			name: 'Raw Attack Average Potential',
			value: Number.isInteger(rawAttackAveragePotential) ? rawAttackAveragePotential : 0,
			calculationTemplate:
				`({totalAttackPotential} × {totalAffinityPotential} × {criticalBoost} + {totalAttackPotential} × (100% - {totalAffinityPotential})) ÷ {weaponModifier} = ${rawAttackAveragePotential}`,
			calculationVariables: [
				{
					displayName: 'Total Attack Potential',
					name: 'totalAttackPotential',
					value: stats.totalAttackPotential,
					colorClass: 'green'
				},
				{
					displayName: 'Total Affinity Potential',
					name: 'totalAffinityPotential',
					value: totalAffinityPotential + '%',
					colorClass: 'blue'
				},
				{
					displayName: 'Total Critical Boost',
					name: 'criticalBoost',
					value: stats.passiveCriticalBoostPercent + 125 + '%',
					colorClass: 'kakhi'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: stats.weaponAttackModifier,
					colorClass: 'purple'
				}
			]
		};

		return rawAttackAveragePotentialCalc;
	}

	private buildDefenseCalcs(stats: StatsModel) {
		this.defenseCalcs = [];

		this.defenseCalcs.push({
			name: 'Defense',
			value: stats.defense + stats.passiveDefense
		});

		this.defenseCalcs.push({
			name: 'Fire Resist',
			value: stats.fireResist + stats.passiveFireResist
		});

		this.defenseCalcs.push({
			name: 'Water Resist',
			value: stats.waterResist + stats.passiveWaterResist
		});

		this.defenseCalcs.push({
			name: 'Thunder Resist',
			value: stats.thunderResist + stats.passiveThunderResist
		});

		this.defenseCalcs.push({
			name: 'Ice Resist',
			value: stats.iceResist + stats.passiveIceResist
		});

		this.defenseCalcs.push({
			name: 'Dragon Resist',
			value: stats.dragonResist + stats.passiveDragonResist
		});
	}
}
