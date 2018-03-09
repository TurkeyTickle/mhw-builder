import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillLevel } from '../../models/skill-level.model';
import * as _ from 'lodash';
import { SkillService } from '../../services/skill.service';
import { ElementType } from '../../types/element.type';
import { AilmentType } from '../../types/ailment.type';
import { SharpnessType } from '../../types/sharpness.type';

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
	elementCapped: boolean;
	totalElementAttack: number;

	ailment: AilmentType;
	baseAilmentAttack: number;
	effectivePassiveAilmentAttack: number;
	ailmentHidden: boolean;
	effectiveAilmentAttack: number;
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

	constructor(
		private itemsService: ItemsService,
		private skillService: SkillService
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
		this.elementCapped = false;
		this.totalElementAttack = 0;

		this.ailment = null;
		this.baseAilmentAttack = 0;
		this.ailmentHidden = false;
		this.effectiveAilmentAttack = 0;
		this.ailmentCapped = false;
		this.totalAilmentAttack = 0;

		this.elementAttackMultiplier = 0;

		this.passiveFireAttack = 0;
		this.passiveWaterAttack = 0;
		this.passiveThunderAttack = 0;
		this.passiveIceAttack = 0;
		this.passiveDragonAttack = 0;
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
		if (item.baseAttack) {
			this.attack += item.baseAttack;
		}

		if (item.baseAffinityPercent) {
			this.affinity += item.baseAffinityPercent;
		}

		if (item.baseDefense) {
			this.defense += item.baseDefense;
		}

		if (item.fireResist) {
			this.fireResist += item.fireResist;
		}

		if (item.waterResist) {
			this.waterResist += item.waterResist;
		}

		if (item.thunderResist) {
			this.thunderResist += item.thunderResist;
		}

		if (item.iceResist) {
			this.iceResist += item.iceResist;
		}

		if (item.dragonResist) {
			this.dragonResist += item.dragonResist;
		}

		if (item.element) {
			this.element = item.element;
		}

		if (item.elementBaseAttack) {
			this.baseElementAttack += item.elementBaseAttack;
		}

		if (item.ailment) {
			this.ailment = item.ailment;
		}

		if (item.ailmentBaseAttack) {
			this.baseAilmentAttack += item.ailmentBaseAttack;
		}

		if (item.elderseal) {
			this.elderseal = item.elderseal;
		}
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
				if (level.passiveAttack) {
					this.passiveAttack += level.passiveAttack;
				}

				if (level.activeAttack) {
					this.activeAttack += level.activeAttack;
				}

				if (level.passiveAffinity) {
					this.passiveAffinity += level.passiveAffinity;
				}

				if (level.activeAffinity) {
					this.activeAffinity += level.activeAffinity;
				}

				if (level.weakPointAffinity) {
					this.weakPointAffinity += level.weakPointAffinity;
				}

				if (level.passiveCriticalBoostPercent) {
					this.passiveCriticalBoostPercent += level.passiveCriticalBoostPercent;
				}

				if (level.passiveFireAttack) {
					this.passiveFireAttack += level.passiveFireAttack;
				}

				if (level.passiveWaterAttack) {
					this.passiveWaterAttack += level.passiveWaterAttack;
				}

				if (level.passiveThunderAttack) {
					this.passiveThunderAttack += level.passiveThunderAttack;
				}

				if (level.passiveIceAttack) {
					this.passiveIceAttack += level.passiveIceAttack;
				}

				if (level.passiveDragonAttack) {
					this.passiveDragonAttack += level.passiveDragonAttack;
				}

				if (level.passivePoisonAttack) {
					this.passivePoisonAttack += level.passivePoisonAttack;
				}

				if (level.passiveSleepAttack) {
					this.passiveSleepAttack += level.passiveSleepAttack;
				}

				if (level.passiveParalysisAttack) {
					this.passiveParalysisAttack += level.passiveParalysisAttack;
				}

				if (level.passiveBlastAttack) {
					this.passiveBlastAttack += level.passiveBlastAttack;
				}

				if (level.passiveStunAttack) {
					this.passiveStunAttack += level.passiveStunAttack;
				}

				if (level.passivePoisonBuildupPercent) {
					this.passivePoisonBuildupPercent += level.passivePoisonBuildupPercent;
				}

				if (level.passiveSleepBuildupPercent) {
					this.passiveSleepBuildupPercent += level.passiveSleepBuildupPercent;
				}

				if (level.passiveParalysisBuildupPercent) {
					this.passiveParalysisBuildupPercent += level.passiveParalysisBuildupPercent;
				}

				if (level.passiveBlastBuildupPercent) {
					this.passiveBlastBuildupPercent += level.passiveBlastBuildupPercent;
				}

				if (level.passiveStunBuildupPercent) {
					this.passiveStunBuildupPercent += level.passiveStunBuildupPercent;
				}

				if (level.passiveDefense) {
					this.passiveDefense += level.passiveDefense;
				}

				if (level.passiveFireResist) {
					this.passiveFireResist += level.passiveFireResist;
				}

				if (level.passiveWaterResist) {
					this.passiveWaterResist += level.passiveWaterResist;
				}

				if (level.passiveThunderResist) {
					this.passiveThunderResist += level.passiveThunderResist;
				}

				if (level.passiveIceResist) {
					this.passiveIceResist += level.passiveIceResist;
				}

				if (level.passiveDragonResist) {
					this.passiveDragonResist += level.passiveDragonResist;
				}

				if (level.hiddenElementUp) {
					this.elementAttackMultiplier = level.hiddenElementUp;
				}
			}
		}

		switch (this.element) {
			case ElementType.Fire:
				this.effectivePassiveElementAttack = this.passiveFireAttack;
				break;
			case ElementType.Water:
				this.effectivePassiveElementAttack = this.passiveWaterAttack;
				break;
			case ElementType.Thunder:
				this.effectivePassiveElementAttack = this.passiveThunderAttack;
				break;
			case ElementType.Ice:
				this.effectivePassiveElementAttack = this.passiveIceAttack;
				break;
			case ElementType.Dragon:
				this.effectivePassiveElementAttack = this.passiveDragonAttack;
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

		this.totalAttack = this.attack + Math.round(this.passiveAttack * this.weaponAttackModifier);
		this.totalAttackPotential = this.attack + Math.round((this.passiveAttack + this.activeAttack) * this.weaponAttackModifier);

		const elementAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;
		const ailmentAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;

		if (this.elementHidden) {
			this.effectiveElementAttack = Math.ceil(Math.round(this.baseElementAttack * this.elementAttackMultiplier) / 10) * 10;
		} else {
			this.effectiveElementAttack = this.baseElementAttack;
		}

		if (this.ailmentHidden) {
			this.effectiveAilmentAttack = Math.ceil(Math.round(this.baseAilmentAttack * this.elementAttackMultiplier) / 10) * 10;
		} else {
			this.effectiveAilmentAttack = this.baseAilmentAttack;
		}

		const elementCap = Math.ceil(Math.round(this.effectiveElementAttack + (this.effectiveElementAttack * elementAttackIncreaseCap)) / 10) * 10;
		const ailmentCap = Math.ceil(Math.round(this.effectiveAilmentAttack + (this.effectiveAilmentAttack * ailmentAttackIncreaseCap)) / 10) * 10;

		this.totalElementAttack = Math.min(this.effectiveElementAttack + this.effectivePassiveElementAttack, elementCap);
		this.totalAilmentAttack = Math.min(this.effectiveAilmentAttack + this.effectivePassiveAilmentAttack, ailmentCap);

		this.elementCapped = this.totalElementAttack > 0 && this.totalElementAttack >= elementCap;
		this.ailmentCapped = this.totalAilmentAttack > 0 && this.totalAilmentAttack >= ailmentCap;
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
}
