import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { ItemModel } from '../../models/item.model';
import { SkillLevel } from '../../models/skill-level.model';
import { ItemsService } from '../../services/items.service';
import { SkillService } from '../../services/skill.service';
import { AilmentType } from '../../types/ailment.type';
import { ElementType } from '../../types/element.type';
import { SharpnessType } from '../../types/sharpness.type';
import { SharpnessLevelModel } from '../../models/sharpness-level.model';
import { DamageType } from '../../types/damage.type';
import { StatDetailModel } from '../../models/stat-detail.model';
import { TooltipService } from '../../services/tooltip.service';
import { AnchorType } from '../../types/anchor.type';

@Component({
	selector: 'mhw-builder-equipped-stats',
	templateUrl: './equipped-stats.component.html',
	styleUrls: ['./equipped-stats.component.scss']
})

export class EquippedStatsComponent implements OnInit {
	readonly defaultElementAttackIncreaseCap = 0.3;

	totalAttack: number;
	totalAttackPotential: number;
	attack: number;
	passiveAttack: number;
	activeAttack: number;
	maxSharpness: SharpnessType;
	passiveSharpness: number;
	effectiveSharpnessLevel: SharpnessLevelModel;
	effectivePhysicalSharpnessModifier: number;
	effectiveElementalSharpnessModifier: number;
	weaponAttackModifier: number;
	affinity: number;
	passiveAffinity: number;
	activeAffinity: number;
	weakPointAffinity: number;
	passiveCriticalBoostPercent: number;

	element: ElementType;
	baseElementAttack: number;
	effectivePassiveElementAttack: number;
	elementHidden: boolean;
	effectiveElementAttack: number;
	elementCap: number;
	elementCapped: boolean;
	totalElementAttack: number;

	ailment: AilmentType;
	baseAilmentAttack: number;
	effectivePassiveAilmentAttack: number;
	ailmentHidden: boolean;
	effectiveAilmentAttack: number;
	ailmentCap: number;
	ailmentCapped: boolean;
	totalAilmentAttack: number;

	elementAttackMultiplier: number;

	passiveDragonAttack: number;
	passiveDragonAttackPercent: number;
	passiveFireAttack: number;
	passiveFireAttackPercent: number;
	passiveIceAttack: number;
	passiveIceAttackPercent: number;
	passiveWaterAttack: number;
	passiveWaterAttackPercent: number;
	passiveThunderAttack: number;
	passiveThunderAttackPercent: number;
	passivePoisonAttack: number;
	passivePoisonBuildupPercent: number;
	passiveSleepAttack: number;
	passiveSleepBuildupPercent: number;
	passiveParalysisAttack: number;
	passiveParalysisBuildupPercent: number;
	passiveBlastAttack: number;
	passiveBlastBuildupPercent: number;
	passiveStunAttack: number;
	passiveStunBuildupPercent: number;

	effectivePassiveAilmentBuildupPercent: number;

	elderseal: string;

	defense: number;
	passiveDefense: number;

	fireResist: number;
	waterResist: number;
	thunderResist: number;
	iceResist: number;
	dragonResist: number;

	passiveFireResist: number;
	passiveWaterResist: number;
	passiveThunderResist: number;
	passiveIceResist: number;
	passiveDragonResist: number;

	attackStats = new Array<StatDetailModel>();
	defenseStats = new Array<StatDetailModel>();

	constructor(
		private itemsService: ItemsService,
		private skillService: SkillService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
		// this.reset();
	}

	update(items: ItemModel[]) {
		this.reset();

		for (const item of items) {
			this.updateStats(item);
		}

		this.updateSkills(items, this.skillService.skills);
	}

	private reset() {
		this.totalAttack = 0;
		this.attack = 0;
		this.passiveAttack = 0;
		this.activeAttack = 0;
		this.maxSharpness = null;
		this.passiveSharpness = 0;
		this.effectiveSharpnessLevel = null;
		this.effectivePhysicalSharpnessModifier = 1;
		this.effectiveElementalSharpnessModifier = 1;
		this.weaponAttackModifier = 0;
		this.affinity = 0;
		this.passiveAffinity = 0;
		this.activeAffinity = 0;
		this.weakPointAffinity = 0;
		this.passiveCriticalBoostPercent = 0;

		this.element = null;
		this.baseElementAttack = 0;
		this.elementHidden = false;
		this.effectiveElementAttack = 0;
		this.elementCap = 0;
		this.elementCapped = false;
		this.totalElementAttack = 0;

		this.ailment = null;
		this.baseAilmentAttack = 0;
		this.ailmentHidden = false;
		this.effectiveAilmentAttack = 0;
		this.ailmentCap = 0;
		this.ailmentCapped = false;
		this.totalAilmentAttack = 0;

		this.elementAttackMultiplier = 0;

		this.passiveFireAttack = 0;
		this.passiveFireAttackPercent = 0;
		this.passiveWaterAttack = 0;
		this.passiveWaterAttackPercent = 0;
		this.passiveThunderAttack = 0;
		this.passiveThunderAttackPercent = 0;
		this.passiveIceAttack = 0;
		this.passiveIceAttackPercent = 0;
		this.passiveDragonAttack = 0;
		this.passiveDragonAttackPercent = 0;
		this.passivePoisonAttack = 0;
		this.passivePoisonBuildupPercent = 0;
		this.passiveSleepAttack = 0;
		this.passiveSleepBuildupPercent = 0;
		this.passiveParalysisAttack = 0;
		this.passiveParalysisBuildupPercent = 0;
		this.passiveBlastAttack = 0;
		this.passiveBlastBuildupPercent = 0;
		this.passiveStunAttack = 0;
		this.passiveStunBuildupPercent = 0;
		this.effectivePassiveElementAttack = 0;
		this.effectivePassiveAilmentAttack = 0;
		this.effectivePassiveAilmentBuildupPercent = 0;

		this.elderseal = null;

		this.defense = 0;
		this.passiveDefense = 0;

		this.fireResist = 0;
		this.waterResist = 0;
		this.thunderResist = 0;
		this.iceResist = 0;
		this.dragonResist = 0;

		this.passiveFireResist = 0;
		this.passiveWaterResist = 0;
		this.passiveThunderResist = 0;
		this.passiveIceResist = 0;
		this.passiveDragonResist = 0;
	}

	private updateStats(item: ItemModel) {
		if (item.baseAttack) { this.attack += item.baseAttack; }
		if (item.baseAffinityPercent) { this.affinity += item.baseAffinityPercent; }
		if (item.baseDefense) { this.defense += item.baseDefense; }
		if (item.fireResist) { this.fireResist += item.fireResist; }
		if (item.waterResist) { this.waterResist += item.waterResist; }
		if (item.thunderResist) { this.thunderResist += item.thunderResist; }
		if (item.iceResist) { this.iceResist += item.iceResist; }
		if (item.dragonResist) { this.dragonResist += item.dragonResist; }
		if (item.element) { this.element = item.element; }
		if (item.elementBaseAttack) { this.baseElementAttack += item.elementBaseAttack; }
		if (item.ailment) { this.ailment = item.ailment; }
		if (item.ailmentBaseAttack) { this.baseAilmentAttack += item.ailmentBaseAttack; }
		if (item.elderseal) { this.elderseal = item.elderseal; }
	}

	private updateSkills(items: ItemModel[], equippedSkills: EquippedSkillModel[]) {
		const weapon = _.find(items, item => item.weaponType);
		if (weapon) {
			this.maxSharpness = weapon.maxSharpness;
			this.elementHidden = weapon.elementHidden;
			this.ailmentHidden = weapon.ailmentHidden;

			const weaponModifier = this.itemsService.getWeaponModifier(weapon.weaponType);
			if (weaponModifier) {
				this.weaponAttackModifier = weaponModifier.attackModifier;
			}
		}

		for (const equippedSkill of equippedSkills) {
			let level: SkillLevel;

			if (equippedSkill.equippedCount) {
				const levelIndex = equippedSkill.equippedCount <= equippedSkill.skill.levels.length
					? equippedSkill.equippedCount - 1 : equippedSkill.skill.levels.length - 1;
				level = equippedSkill.skill.levels[levelIndex];
			}

			if (level) {
				if (level.passiveAttack) { this.passiveAttack += level.passiveAttack; }
				if (level.activeAttack) { this.activeAttack += level.activeAttack; }
				if (level.passiveAffinity) { this.passiveAffinity += level.passiveAffinity; }
				if (level.activeAffinity) { this.activeAffinity += level.activeAffinity; }
				if (level.weakPointAffinity) { this.weakPointAffinity += level.weakPointAffinity; }
				if (level.passiveSharpness) { this.passiveSharpness += level.passiveSharpness; }

				if (level.passiveCriticalBoostPercent) { this.passiveCriticalBoostPercent += level.passiveCriticalBoostPercent; }

				if (level.passiveFireAttack) { this.passiveFireAttack += level.passiveFireAttack; }
				if (level.passiveWaterAttack) { this.passiveWaterAttack += level.passiveWaterAttack; }
				if (level.passiveThunderAttack) { this.passiveThunderAttack += level.passiveThunderAttack; }
				if (level.passiveIceAttack) { this.passiveIceAttack += level.passiveIceAttack; }
				if (level.passiveDragonAttack) { this.passiveDragonAttack += level.passiveDragonAttack; }

				if (level.passiveFireAttackPercent) { this.passiveFireAttackPercent += level.passiveFireAttackPercent; }
				if (level.passiveWaterAttackPercent) { this.passiveWaterAttackPercent += level.passiveWaterAttackPercent; }
				if (level.passiveThunderAttackPercent) { this.passiveThunderAttackPercent += level.passiveThunderAttackPercent; }
				if (level.passiveIceAttackPercent) { this.passiveIceAttackPercent += level.passiveIceAttackPercent; }
				if (level.passiveDragonAttackPercent) { this.passiveDragonAttackPercent += level.passiveDragonAttackPercent; }

				if (level.passivePoisonAttack) { this.passivePoisonAttack += level.passivePoisonAttack; }
				if (level.passiveSleepAttack) { this.passiveSleepAttack += level.passiveSleepAttack; }
				if (level.passiveParalysisAttack) { this.passiveParalysisAttack += level.passiveParalysisAttack; }
				if (level.passiveBlastAttack) { this.passiveBlastAttack += level.passiveBlastAttack; }
				if (level.passiveStunAttack) { this.passiveStunAttack += level.passiveStunAttack; }

				if (level.passivePoisonBuildupPercent) { this.passivePoisonBuildupPercent += level.passivePoisonBuildupPercent; }
				if (level.passiveSleepBuildupPercent) { this.passiveSleepBuildupPercent += level.passiveSleepBuildupPercent; }
				if (level.passiveParalysisBuildupPercent) { this.passiveParalysisBuildupPercent += level.passiveParalysisBuildupPercent; }
				if (level.passiveBlastBuildupPercent) { this.passiveBlastBuildupPercent += level.passiveBlastBuildupPercent; }
				if (level.passiveStunBuildupPercent) { this.passiveStunBuildupPercent += level.passiveStunBuildupPercent; }

				if (level.passiveDefense) { this.passiveDefense += level.passiveDefense; }

				if (level.passiveFireResist) { this.passiveFireResist += level.passiveFireResist; }
				if (level.passiveWaterResist) { this.passiveWaterResist += level.passiveWaterResist; }
				if (level.passiveThunderResist) { this.passiveThunderResist += level.passiveThunderResist; }
				if (level.passiveIceResist) { this.passiveIceResist += level.passiveIceResist; }
				if (level.passiveDragonResist) { this.passiveDragonResist += level.passiveDragonResist; }

				if (level.hiddenElementUp) { this.elementAttackMultiplier = level.hiddenElementUp; }
			}
		}

		switch (this.element) {
			case ElementType.Fire:
				this.effectivePassiveElementAttack = this.passiveFireAttack;
				this.effectivePassiveElementAttack += this.nearestTen(this.baseElementAttack * (this.passiveFireAttackPercent / 100));
				break;
			case ElementType.Water:
				this.effectivePassiveElementAttack = this.passiveWaterAttack;
				this.effectivePassiveElementAttack += this.nearestTen(this.baseElementAttack * (this.passiveWaterAttackPercent / 100));
				break;
			case ElementType.Thunder:
				this.effectivePassiveElementAttack = this.passiveThunderAttack;
				this.effectivePassiveElementAttack += this.nearestTen(this.baseElementAttack * (this.passiveThunderAttackPercent / 100));
				break;
			case ElementType.Ice:
				this.effectivePassiveElementAttack = this.passiveIceAttack;
				this.effectivePassiveElementAttack += this.nearestTen(this.baseElementAttack * (this.passiveIceAttackPercent / 100));
				break;
			case ElementType.Dragon:
				this.effectivePassiveElementAttack = this.passiveDragonAttack;
				this.effectivePassiveElementAttack += this.nearestTen(this.baseElementAttack * (this.passiveDragonAttackPercent / 100));
				break;
			default:
				break;
		}

		switch (this.ailment) {
			case AilmentType.Poison:
				this.effectivePassiveAilmentAttack = this.passivePoisonAttack;
				this.effectivePassiveAilmentBuildupPercent = this.passivePoisonBuildupPercent;
				break;
			case AilmentType.Sleep:
				this.effectivePassiveAilmentAttack = this.passiveSleepAttack;
				this.effectivePassiveAilmentBuildupPercent = this.passiveSleepBuildupPercent;
				break;
			case AilmentType.Paralysis:
				this.effectivePassiveAilmentAttack = this.passiveParalysisAttack;
				this.effectivePassiveAilmentBuildupPercent = this.passiveParalysisBuildupPercent;
				break;
			case AilmentType.Blast:
				this.effectivePassiveAilmentAttack = this.passiveBlastAttack;
				this.effectivePassiveAilmentBuildupPercent = this.passiveBlastBuildupPercent;
				break;
			case AilmentType.Stun:
				this.effectivePassiveAilmentAttack = this.passiveStunAttack;
				this.effectivePassiveAilmentBuildupPercent = this.passiveStunBuildupPercent;
				break;
			default:
				break;
		}

		if (weapon && weapon.sharpnessLevels) {
			this.effectiveSharpnessLevel = weapon.sharpnessLevels[Math.min(this.passiveSharpness / 10, weapon.sharpnessLevels.length - 1)];
			const sharpnessModifier = this.itemsService.getSharpnessModifier(DamageType.Physical, this.effectiveSharpnessLevel.color);
			if (sharpnessModifier) {
				this.effectivePhysicalSharpnessModifier = sharpnessModifier.value;
			}
		}

		this.totalAttack = this.attack + Math.round(this.passiveAttack * this.weaponAttackModifier);
		this.totalAttackPotential = Math.round(this.attack * this.effectivePhysicalSharpnessModifier + (this.passiveAttack + this.activeAttack) * this.weaponAttackModifier);

		const elementAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;
		const ailmentAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;

		if (this.elementHidden) {
			this.effectiveElementAttack = this.nearestTen(Math.round(this.baseElementAttack * this.elementAttackMultiplier));
		} else {
			this.effectiveElementAttack = this.baseElementAttack;
		}

		if (this.ailmentHidden) {
			this.effectiveAilmentAttack = this.nearestTen(Math.round(this.baseAilmentAttack * this.elementAttackMultiplier));
		} else {
			this.effectiveAilmentAttack = this.baseAilmentAttack;
		}

		this.elementCap = this.nearestTen(Math.round(this.effectiveElementAttack + (this.effectiveElementAttack * elementAttackIncreaseCap)));
		this.ailmentCap = this.nearestTen(Math.round(this.effectiveAilmentAttack + (this.effectiveAilmentAttack * ailmentAttackIncreaseCap)));

		this.totalElementAttack = Math.min(this.effectiveElementAttack + this.effectivePassiveElementAttack, this.elementCap);
		this.totalAilmentAttack = Math.min(this.effectiveAilmentAttack + this.effectivePassiveAilmentAttack, this.ailmentCap);

		this.elementCapped = this.totalElementAttack > 0 && this.totalElementAttack >= this.elementCap;
		this.ailmentCapped = this.totalAilmentAttack > 0 && this.totalAilmentAttack >= this.ailmentCap;

		this.buildCalcs();
	}

	nearestTen(value: number): number {
		return Math.round(value / 10) * 10;
	}

	getHiddenElemColor(): string {
		if (this.ailmentHidden || this.elementHidden) {
			if (this.elementAttackMultiplier >= 1) {
				return 'white';
			} else if (this.elementAttackMultiplier >= 0.66) {
				return '#ffffffcc';
			} else if (this.elementAttackMultiplier >= 0.33) {
				return '#ffffff99';
			} else {
				return '#ffffff66';
			}
		} else {
			return 'white';
		}
	}

	buildCalcs() {
		this.buildAttackCalcs();
		this.buildDefenseCalcs();
	}

	buildAttackCalcs() {
		this.attackStats = [];

		const attack: StatDetailModel = {
			name: 'Attack',
			value: this.totalAttack,
			calculationTemplate: `{attack} + {passiveAttack} × {weaponModifier} ≈ ${this.totalAttack}`,
			calculationVariables: [
				{
					displayName: 'Base Weapon Attack',
					name: 'attack',
					value: this.attack,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Attack',
					name: 'passiveAttack',
					value: this.passiveAttack,
					colorClass: 'blue'
				},
				{
					displayName: 'Weapon Modifier',
					name: 'weaponModifier',
					value: this.weaponAttackModifier,
					colorClass: 'yellow'
				}
			]
		};

		this.attackStats.push(attack);

		if (this.activeAttack || this.effectivePhysicalSharpnessModifier) {
			const attackPotential: StatDetailModel = {
				name: 'Attack Potential',
				value: this.totalAttackPotential,
				calculationTemplate: `({attack} × {sharpnessModifier}) + ({passiveAttack} + {activeAttack}) × {weaponModifier} ≈ ${this.totalAttackPotential}`,
				calculationVariables: [
					{
						displayName: 'Base Weapon Attack',
						name: 'attack',
						value: this.attack,
						colorClass: 'green'
					},
					{
						displayName: 'Physical Sharpness Modifier',
						name: 'sharpnessModifier',
						value: this.effectivePhysicalSharpnessModifier,
						colorClass: 'blue'
					},
					{
						displayName: 'Passive Attack',
						name: 'passiveAttack',
						value: this.passiveAttack,
						colorClass: 'yellow'
					},
					{
						displayName: 'Active Attack',
						name: 'activeAttack',
						value: this.activeAttack,
						colorClass: 'orange'
					},
					{
						displayName: 'Weapon Modifier',
						name: 'weaponModifier',
						value: this.weaponAttackModifier,
						colorClass: 'red'
					},

				]
			};

			this.attackStats.push(attackPotential);
		}

		const affinityValue = `${this.affinity + this.passiveAffinity}%`;
		const affinity: StatDetailModel = {
			name: 'Affinity',
			value: affinityValue,
			calculationTemplate: `{affinity} + {passiveAffinity} = ${affinityValue}`,
			calculationVariables: [
				{
					displayName: 'Weapon Base Affinity',
					name: 'affinity',
					value: this.affinity,
					colorClass: 'green'
				},
				{
					displayName: 'Passive Affinity',
					name: 'passiveAffinity',
					value: this.passiveAffinity,
					colorClass: 'blue'
				}
			]
		};

		this.attackStats.push(affinity);

		if (this.activeAffinity) {
			const value = `${this.affinity + this.passiveAffinity + this.weakPointAffinity + this.activeAffinity}%`;
			const affinityPotential: StatDetailModel = {
				name: 'Affinity Potential',
				value: value,
				calculationTemplate: `{base} + {passive} + {weakPoint} + {active} = ${value}`,
				calculationVariables: [
					{
						displayName: 'Weapon Base Affinity',
						name: 'base',
						value: this.affinity,
						colorClass: 'green'
					},
					{
						displayName: 'Passive Affinity',
						name: 'passive',
						value: this.passiveAffinity,
						colorClass: 'blue'
					},
					{
						displayName: 'Weak Point Affinity',
						name: 'weakPoint',
						value: this.weakPointAffinity,
						colorClass: 'yellow'
					},
					{
						displayName: 'Active Affinity',
						name: 'active',
						value: this.activeAffinity,
						colorClass: 'orange'
					}
				]
			};

			this.attackStats.push(affinityPotential);
		}

		if (this.effectiveSharpnessLevel) {
			const sharpness: StatDetailModel = {
				name: 'Sharpness',
				value: `${this.effectiveSharpnessLevel.value} ${this.effectiveSharpnessLevel.color}`,
			};

			this.attackStats.push(sharpness);
		}

		const critBoostValue = `${125 + this.passiveCriticalBoostPercent}%`;
		const critBoost: StatDetailModel = {
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
					value: this.passiveCriticalBoostPercent,
					colorClass: 'blue'
				}
			]
		};

		this.attackStats.push(critBoost);

		if (this.ailment) {
			const ailment: StatDetailModel = {
				name: 'Ailment',
				value: this.ailment,
				info: []
			};

			this.attackStats.push(ailment);

			if (this.ailmentHidden) {
				if (this.elementAttackMultiplier < 1) {
					ailment.info.push('Effectiveness reduced due to hidden ailment.');
					ailment.color = !this.elementAttackMultiplier ? 'red' : 'yellow';
				}

				let ailmentAttackTemplate: string;

				if (this.elementAttackMultiplier) {
					ailmentAttackTemplate = `{base} × {multiplier} + {passive} ≈ ${this.totalAilmentAttack}`;
				} else {
					ailmentAttackTemplate = `({base} + {passive}) × {multiplier} ≈ ${this.totalAilmentAttack}`;
				}

				if (this.ailmentCapped) {
					ailment.info.push('Ailment attack is capped.');
					ailment.color = 'yellow';
				}

				const ailmentAttack: StatDetailModel = {
					name: 'Ailment Attack',
					value: this.totalAilmentAttack,
					color: ailment.color,
					info: ailment.info,
					calculationTemplate: ailmentAttackTemplate,
					calculationVariables: [
						{
							displayName: 'Weapon Base Ailment Attack',
							name: 'base',
							value: this.baseAilmentAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Hidden Ailment Multiplier',
							name: 'multiplier',
							value: this.elementAttackMultiplier,
							colorClass: 'blue'
						},
						{
							displayName: 'Passive Ailment Attack',
							name: 'passive',
							value: this.effectivePassiveAilmentAttack,
							colorClass: 'yellow'
						},
						{
							displayName: 'Ailment Attack Cap',
							name: 'cap',
							value: this.ailmentCap,
							colorClass: 'orange'
						}
					]
				};

				this.attackStats.push(ailmentAttack);
			} else {
				if (this.ailmentCapped) {
					ailment.info.push('Ailment attack is capped.');
					ailment.color = 'yellow';
				}

				const ailmentAttack: StatDetailModel = {
					name: 'Ailment Attack',
					value: this.totalAilmentAttack,
					color: ailment.color,
					info: ailment.info,
					calculationTemplate: `{base} + {passive} = ${this.totalAilmentAttack}`,
					calculationVariables: [
						{
							displayName: 'Weapon Base Ailment Attack',
							name: 'base',
							value: this.baseAilmentAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Passive Ailment Attack',
							name: 'passive',
							value: this.effectivePassiveAilmentAttack,
							colorClass: 'blue'
						},
						{
							displayName: 'Ailment Attack Cap',
							name: 'cap',
							value: this.ailmentCap,
							colorClass: 'yellow'
						}
					]
				};

				this.attackStats.push(ailmentAttack);
			}

			const ailmentBuildupRateValue = `${100 + this.effectivePassiveAilmentBuildupPercent}%`;
			const ailmentBuildupRate: StatDetailModel = {
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
						value: this.effectivePassiveAilmentBuildupPercent,
						colorClass: 'blue'
					}
				]
			};

			this.attackStats.push(ailmentBuildupRate);
		}

		if (this.element) {
			const element: StatDetailModel = {
				name: 'Element',
				value: this.element,
				info: []
			};

			this.attackStats.push(element);

			if (this.elementHidden) {
				if (this.elementAttackMultiplier < 1) {
					element.info.push('Effectiveness reduced due to hidden element.');
					element.color = !this.elementAttackMultiplier ? 'red' : 'yellow';
				}

				let elementAttackTemplate: string;

				if (this.elementAttackMultiplier) {
					elementAttackTemplate = `{base} × {multiplier} + {passive} ≈ ${this.totalElementAttack}`;
				} else {
					elementAttackTemplate = `({base} + {passive}) × {multiplier} ≈ ${this.totalElementAttack}`;
				}

				if (this.elementCapped) {
					element.info.push('Element attack is capped.');
					element.color = 'yellow';
				}

				const elementAttack: StatDetailModel = {
					name: 'Element Attack',
					value: this.totalElementAttack,
					color: element.color,
					info: element.info,
					calculationTemplate: elementAttackTemplate,
					calculationVariables: [
						{
							displayName: 'Weapon Base Element Attack',
							name: 'base',
							value: this.baseElementAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Hidden Element Multiplier',
							name: 'multiplier',
							value: this.elementAttackMultiplier,
							colorClass: 'blue'
						},
						{
							displayName: 'Passive Element Attack',
							name: 'passive',
							value: this.effectivePassiveElementAttack,
							colorClass: 'yellow'
						},
						{
							displayName: 'Element Attack Cap',
							name: 'cap',
							value: this.elementCap,
							colorClass: 'orange'
						}
					]
				};

				this.attackStats.push(elementAttack);
			} else {
				if (this.elementCapped) {
					element.info.push('Element Attack is capped.');
					element.color = 'yellow';
				}

				const elementAttack: StatDetailModel = {
					name: 'Element Attack',
					value: this.totalElementAttack,
					color: element.color,
					info: element.info,
					calculationTemplate: `{base} + {passive} = ${this.totalElementAttack}`,
					calculationVariables: [
						{
							displayName: 'Weapon Base Element Attack',
							name: 'base',
							value: this.baseElementAttack,
							colorClass: 'green'
						},
						{
							displayName: 'Passive Element Attack',
							name: 'passive',
							value: this.effectivePassiveElementAttack,
							colorClass: 'blue'
						},
						{
							displayName: 'Element Attack Cap',
							name: 'cap',
							value: this.elementCap,
							colorClass: 'yellow'
						}
					]
				};

				this.attackStats.push(elementAttack);
			}
		}

		if (this.elderseal) {
			const elderseal: StatDetailModel = {
				name: 'Elderseal',
				value: this.elderseal
			};

			this.attackStats.push(elderseal);
		}
	}

	buildDefenseCalcs() {
		this.defenseStats = [];

		const defense: StatDetailModel = {
			name: 'Defense',
			value: this.defense + this.passiveDefense
		};

		this.defenseStats.push(defense);

		const fireResist: StatDetailModel = {
			name: 'Fire Resist',
			value: this.fireResist + this.passiveFireResist
		};

		this.defenseStats.push(fireResist);

		const waterResist: StatDetailModel = {
			name: 'Water Resist',
			value: this.waterResist + this.passiveWaterResist
		};

		this.defenseStats.push(waterResist);

		const thunderResist: StatDetailModel = {
			name: 'Thunder Resist',
			value: this.thunderResist + this.passiveThunderResist
		};

		this.defenseStats.push(thunderResist);

		const iceResist: StatDetailModel = {
			name: 'Ice Resist',
			value: this.iceResist + this.passiveIceResist
		};

		this.defenseStats.push(iceResist);

		const dragonResist: StatDetailModel = {
			name: 'Dragon Resist',
			value: this.dragonResist + this.passiveDragonResist
		};

		this.defenseStats.push(dragonResist);
	}

	showCalcDetails(calc: StatDetailModel) {
		if (calc.calculationTemplate || (calc.info && calc.info.length)) {
			this.tooltipService.anchorPoint = AnchorType.TopRight;
			this.tooltipService.setCalc(calc);
		}
	}

	clearCalcDetails() {
		this.tooltipService.anchorPoint = AnchorType.TopLeft;
		this.tooltipService.setCalc(null);
	}
}
