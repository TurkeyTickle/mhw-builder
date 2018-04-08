import { Injectable } from '@angular/core';
import { StatsModel } from '../models/stats.model';
import { StatDetailModel } from '../models/stat-detail.model';
import { Subject } from 'rxjs/Subject';

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

		this.attackCalcs.push({
			name: 'Attack',
			value: stats.totalAttack,
			calculationTemplate: `{attack} + {passiveAttack} × {weaponModifier} ≈ ${stats.totalAttack}`,
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
					colorClass: 'blue'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: stats.weaponAttackModifier,
					colorClass: 'yellow'
				}
			]
		});

		if (stats.activeAttack || stats.effectivePhysicalSharpnessModifier) {
			this.attackCalcs.push({
				name: 'Attack Potential',
				value: stats.totalAttackPotential,
				calculationTemplate: `({attack} × {sharpnessModifier}) + ({passiveAttack} + {activeAttack}) × {weaponModifier} ≈ ${stats.totalAttackPotential}`,
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
						colorClass: 'yellow'
					},
					{
						displayName: 'Active Attack',
						name: 'activeAttack',
						value: stats.activeAttack,
						colorClass: 'orange'
					},
					{
						displayName: 'Weapon Modifier',
						name: 'weaponModifier',
						value: stats.weaponAttackModifier,
						colorClass: 'red'
					},

				]
			});
		}

		const affinityValue = `${stats.affinity + stats.passiveAffinity}%`;
		this.attackCalcs.push({
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
		});

		if (stats.activeAffinity) {
			const value = `${stats.affinity + stats.passiveAffinity + stats.weakPointAffinity + stats.activeAffinity}%`;
			this.attackCalcs.push({
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
			});
		}

		if (stats.effectiveSharpnessLevel) {
			this.attackCalcs.push({
				name: 'Sharpness',
				value: `${stats.effectiveSharpnessLevel.value} ${stats.effectiveSharpnessLevel.color}`,
			});
		}

		const critBoostValue = `${125 + stats.passiveCriticalBoostPercent}%`;
		this.attackCalcs.push({
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
		});

		if (stats.ailment) {
			const ailment: StatDetailModel = {
				name: 'Ailment',
				value: stats.ailment,
				info: []
			};

			this.attackCalcs.push(ailment);

			if (stats.ailmentHidden) {
				if (stats.elementAttackMultiplier < 1) {
					ailment.info.push('Effectiveness reduced due to hidden ailment.');
					ailment.color = !stats.elementAttackMultiplier ? 'red' : 'yellow';
				}

				let ailmentAttackTemplate: string;

				if (stats.elementAttackMultiplier) {
					ailmentAttackTemplate = `{base} × {multiplier} + {passive} ≈ ${stats.totalAilmentAttack}`;
				} else {
					ailmentAttackTemplate = `({base} + {passive}) × {multiplier} ≈ ${stats.totalAilmentAttack}`;
				}

				if (stats.ailmentCapped) {
					ailment.info.push('Ailment attack is capped.');
					ailment.color = 'yellow';
				}

				this.attackCalcs.push({
					name: 'Ailment Attack',
					value: stats.totalAilmentAttack,
					color: ailment.color,
					info: ailment.info,
					calculationTemplate: ailmentAttackTemplate,
					calculationVariables: [
						{
							displayName: 'Weapon Base Ailment Attack',
							name: 'base',
							value: stats.baseAilmentAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Hidden Ailment Multiplier',
							name: 'multiplier',
							value: stats.elementAttackMultiplier,
							colorClass: 'blue'
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
				});
			} else {
				if (stats.ailmentCapped) {
					ailment.info.push('Ailment attack is capped.');
					ailment.color = 'yellow';
				}

				this.attackCalcs.push({
					name: 'Ailment Attack',
					value: stats.totalAilmentAttack,
					color: ailment.color,
					info: ailment.info,
					calculationTemplate: `{base} + {passive} = ${stats.totalAilmentAttack}`,
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
							colorClass: 'blue'
						},
						{
							displayName: 'Ailment Attack Cap',
							name: 'cap',
							value: stats.ailmentCap,
							colorClass: 'yellow'
						}
					]
				});
			}

			const ailmentBuildupRateValue = `${100 + stats.effectivePassiveAilmentBuildupPercent}%`;
			this.attackCalcs.push({
				name: 'Ailment Buildup Rate',
				value: ailmentBuildupRateValue,
				calculationTemplate: `{base} + {passive} = ${ailmentBuildupRateValue}`,
				calculationVariables: [
					{
						displayName: 'Base Buildup Rate',
						name: 'base',
						value: '100',
						colorClass: 'green'
					},
					{
						displayName: 'Passive Buildup Rate',
						name: 'passive',
						value: stats.effectivePassiveAilmentBuildupPercent,
						colorClass: 'blue'
					}
				]
			});
		}

		if (stats.element) {
			const element: StatDetailModel = {
				name: 'Element',
				value: stats.element,
				info: []
			};

			this.attackCalcs.push(element);

			if (stats.elementHidden) {
				if (stats.elementAttackMultiplier < 1) {
					element.info.push('Effectiveness reduced due to hidden element.');
					element.color = !stats.elementAttackMultiplier ? 'red' : 'yellow';
				}

				let elementAttackTemplate: string;

				if (stats.elementAttackMultiplier) {
					elementAttackTemplate = `{base} × {multiplier} + {passive} ≈ ${stats.totalElementAttack}`;
				} else {
					elementAttackTemplate = `({base} + {passive}) × {multiplier} ≈ ${stats.totalElementAttack}`;
				}

				if (stats.elementCapped) {
					element.info.push('Element attack is capped.');
					element.color = 'yellow';
				}

				this.attackCalcs.push({
					name: 'Element Attack',
					value: stats.totalElementAttack,
					color: element.color,
					info: element.info,
					calculationTemplate: elementAttackTemplate,
					calculationVariables: [
						{
							displayName: 'Weapon Base Element Attack',
							name: 'base',
							value: stats.baseElementAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Hidden Element Multiplier',
							name: 'multiplier',
							value: stats.elementAttackMultiplier,
							colorClass: 'blue'
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
				});
			} else {
				if (stats.elementCapped) {
					element.info.push('Element Attack is capped.');
					element.color = 'yellow';
				}

				this.attackCalcs.push({
					name: 'Element Attack',
					value: stats.totalElementAttack,
					color: element.color,
					info: element.info,
					calculationTemplate: `{base} + {passive} = ${stats.totalElementAttack}`,
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
							colorClass: 'blue'
						},
						{
							displayName: 'Element Attack Cap',
							name: 'cap',
							value: stats.elementCap,
							colorClass: 'yellow'
						}
					]
				});
			}
		}

		if (stats.elderseal) {
			this.attackCalcs.push({
				name: 'Elderseal',
				value: stats.elderseal
			});
		}

		if (stats.healOnHitPercent) {
			this.attackCalcs.push({
				name: 'Heal on Hit',
				value: stats.healOnHitPercent
			});
		}
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
