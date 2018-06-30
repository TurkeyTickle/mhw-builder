import { Injectable } from '@angular/core';
import { EquippedSkillModel } from '../models/equipped-skill.model';
import { ItemModel } from '../models/item.model';
import { AugmentationModel } from '../models/augmentation.model';
import { ElementType } from '../types/element.type';
import { AilmentType } from '../types/ailment.type';
import { SkillLevelModel } from '../models/skill-level.model';
import { DamageType } from '../types/damage.type';
import * as _ from 'lodash';
import { DataService } from './data.service';
import { StatsModel } from '../models/stats.model';
import { Subject } from 'rxjs';
import { CalculationService } from './calculation.service';
import { EldersealType } from '../types/elderseal.type';

@Injectable()
export class StatService {
	public statsUpdated$ = new Subject<StatsModel>();

	readonly defaultElementAttackIncreaseCap = 0.3;

	stats = new StatsModel();

	constructor(
		private dataService: DataService,
		private calcService: CalculationService
	) { }

	update(skills: EquippedSkillModel[], items: ItemModel[], augmentations: AugmentationModel[]) {
		this.stats = new StatsModel();

		this.updateItemStats(items);
		this.updateSkillStats(skills);
		this.updateAugmentations(augmentations);

		const weapon = _.find(items, item => item.weaponType != null);
		this.calculateAttack(weapon);

		this.statsUpdated$.next(this.stats);

		this.calcService.updateCalcs(this.stats);
	}

	private updateItemStats(items: ItemModel[]) {
		for (const item of items) {
			if (item.baseAttack) { this.stats.attack += item.baseAttack; }
			if (item.baseAffinityPercent) { this.stats.affinity += item.baseAffinityPercent; }
			if (item.baseDefense) { this.stats.defense += item.baseDefense; }
			if (item.maxDefense) { this.stats.maxDefense += item.maxDefense; }
			if (item.augmentedDefense) { this.stats.augmentedDefense += item.augmentedDefense; }
			if (item.fireResist) { this.stats.fireResist += item.fireResist; }
			if (item.waterResist) { this.stats.waterResist += item.waterResist; }
			if (item.thunderResist) { this.stats.thunderResist += item.thunderResist; }
			if (item.iceResist) { this.stats.iceResist += item.iceResist; }
			if (item.dragonResist) { this.stats.dragonResist += item.dragonResist; }
			if (item.element) { this.stats.element = item.element; }
			if (item.elementBaseAttack) { this.stats.baseElementAttack += item.elementBaseAttack; }
			if (item.ailment) { this.stats.ailment = item.ailment; }
			if (item.ailmentBaseAttack) { this.stats.baseAilmentAttack += item.ailmentBaseAttack; }
			if (item.elderseal) { this.stats.elderseal = item.elderseal; }
		}
	}

	private updateSkillStats(equippedSkills: EquippedSkillModel[]) {
		for (const equippedSkill of equippedSkills) {
			let level: SkillLevelModel;

			if (equippedSkill.equippedCount) {
				const levelIndex = equippedSkill.equippedCount <= equippedSkill.skill.levels.length
					? equippedSkill.equippedCount - 1 : equippedSkill.skill.levels.length - 1;
				level = equippedSkill.skill.levels[levelIndex];
			}

			if (level) {
				if (level.passiveAttack) { this.stats.passiveAttack += level.passiveAttack; }
				if (level.activeAttack) { this.stats.activeAttack += level.activeAttack; }
				if (level.elementlessBoostPercent) { this.stats.elementlessBoostPercent += level.elementlessBoostPercent; }
				if (level.passiveAffinity) { this.stats.passiveAffinity += level.passiveAffinity; }
				if (level.activeAffinity) { this.stats.activeAffinity += level.activeAffinity; }
				if (level.weakPointAffinity) { this.stats.weakPointAffinity += level.weakPointAffinity; }
				if (level.passiveSharpness) { this.stats.passiveSharpness += level.passiveSharpness; }

				if (level.passiveCriticalBoostPercent) { this.stats.passiveCriticalBoostPercent += level.passiveCriticalBoostPercent; }

				if (level.passiveFireAttack) { this.stats.passiveFireAttack += level.passiveFireAttack; }
				if (level.passiveWaterAttack) { this.stats.passiveWaterAttack += level.passiveWaterAttack; }
				if (level.passiveThunderAttack) { this.stats.passiveThunderAttack += level.passiveThunderAttack; }
				if (level.passiveIceAttack) { this.stats.passiveIceAttack += level.passiveIceAttack; }
				if (level.passiveDragonAttack) { this.stats.passiveDragonAttack += level.passiveDragonAttack; }

				if (level.passiveFireAttackPercent) { this.stats.passiveFireAttackPercent += level.passiveFireAttackPercent; }
				if (level.passiveWaterAttackPercent) { this.stats.passiveWaterAttackPercent += level.passiveWaterAttackPercent; }
				if (level.passiveThunderAttackPercent) { this.stats.passiveThunderAttackPercent += level.passiveThunderAttackPercent; }
				if (level.passiveIceAttackPercent) { this.stats.passiveIceAttackPercent += level.passiveIceAttackPercent; }
				if (level.passiveDragonAttackPercent) { this.stats.passiveDragonAttackPercent += level.passiveDragonAttackPercent; }

				if (level.passivePoisonAttack) { this.stats.passivePoisonAttack += level.passivePoisonAttack; }
				if (level.passiveSleepAttack) { this.stats.passiveSleepAttack += level.passiveSleepAttack; }
				if (level.passiveParalysisAttack) { this.stats.passiveParalysisAttack += level.passiveParalysisAttack; }
				if (level.passiveBlastAttack) { this.stats.passiveBlastAttack += level.passiveBlastAttack; }
				if (level.passiveStunAttack) { this.stats.passiveStunAttack += level.passiveStunAttack; }

				if (level.passivePoisonBuildupPercent) { this.stats.passivePoisonBuildupPercent += level.passivePoisonBuildupPercent; }
				if (level.passiveSleepBuildupPercent) { this.stats.passiveSleepBuildupPercent += level.passiveSleepBuildupPercent; }
				if (level.passiveParalysisBuildupPercent) { this.stats.passiveParalysisBuildupPercent += level.passiveParalysisBuildupPercent; }
				if (level.passiveBlastBuildupPercent) { this.stats.passiveBlastBuildupPercent += level.passiveBlastBuildupPercent; }
				if (level.passiveStunBuildupPercent) { this.stats.passiveStunBuildupPercent += level.passiveStunBuildupPercent; }

				if (level.passiveDefense) { this.stats.passiveDefense += level.passiveDefense; }

				if (level.passiveFireResist) { this.stats.passiveFireResist += level.passiveFireResist; }
				if (level.passiveWaterResist) { this.stats.passiveWaterResist += level.passiveWaterResist; }
				if (level.passiveThunderResist) { this.stats.passiveThunderResist += level.passiveThunderResist; }
				if (level.passiveIceResist) { this.stats.passiveIceResist += level.passiveIceResist; }
				if (level.passiveDragonResist) { this.stats.passiveDragonResist += level.passiveDragonResist; }

				if (level.hiddenElementUp) { this.stats.elementAttackMultiplier = level.hiddenElementUp; }
				if (level.eldersealLevelBoost) { this.stats.eldersealLevelBoost = level.eldersealLevelBoost; }
			}
		}
	}

	private updateAugmentations(augmentations: AugmentationModel[]) {
		const augGroups = _.groupBy(augmentations, 'id');

		for (const key in augGroups) {
			const value = augGroups[key];

			const level = value[0].levels[value.length - 1];
			if (level) {
				if (level.passiveAttack) { this.stats.passiveAttack += level.passiveAttack; }
				if (level.passiveAffinity) { this.stats.passiveAffinity += level.passiveAffinity; }
				if (level.passiveDefense) { this.stats.passiveDefense += level.passiveDefense; }
				if (level.healOnHitPercent) { this.stats.healOnHitPercent += level.healOnHitPercent; }
			}
		}
	}

	private calculateAttack(weapon: ItemModel) {
		switch (this.stats.element) {
			case ElementType.Fire:
				this.stats.effectivePassiveElementAttack = this.stats.passiveFireAttack;
				this.stats.effectivePassiveElementAttack += this.nearestTen(this.stats.baseElementAttack * (this.stats.passiveFireAttackPercent / 100));
				break;
			case ElementType.Water:
				this.stats.effectivePassiveElementAttack = this.stats.passiveWaterAttack;
				this.stats.effectivePassiveElementAttack += this.nearestTen(this.stats.baseElementAttack * (this.stats.passiveWaterAttackPercent / 100));
				break;
			case ElementType.Thunder:
				this.stats.effectivePassiveElementAttack = this.stats.passiveThunderAttack;
				this.stats.effectivePassiveElementAttack += this.nearestTen(this.stats.baseElementAttack * (this.stats.passiveThunderAttackPercent / 100));
				break;
			case ElementType.Ice:
				this.stats.effectivePassiveElementAttack = this.stats.passiveIceAttack;
				this.stats.effectivePassiveElementAttack += this.nearestTen(this.stats.baseElementAttack * (this.stats.passiveIceAttackPercent / 100));
				break;
			case ElementType.Dragon:
				this.stats.effectivePassiveElementAttack = this.stats.passiveDragonAttack;
				this.stats.effectivePassiveElementAttack += this.nearestTen(this.stats.baseElementAttack * (this.stats.passiveDragonAttackPercent / 100));
				break;
			default:
				break;
		}

		switch (this.stats.ailment) {
			case AilmentType.Poison:
				this.stats.effectivePassiveAilmentAttack = this.stats.passivePoisonAttack;
				this.stats.effectivePassiveAilmentBuildupPercent = this.stats.passivePoisonBuildupPercent;
				break;
			case AilmentType.Sleep:
				this.stats.effectivePassiveAilmentAttack = this.stats.passiveSleepAttack;
				this.stats.effectivePassiveAilmentBuildupPercent = this.stats.passiveSleepBuildupPercent;
				break;
			case AilmentType.Paralysis:
				this.stats.effectivePassiveAilmentAttack = this.stats.passiveParalysisAttack;
				this.stats.effectivePassiveAilmentBuildupPercent = this.stats.passiveParalysisBuildupPercent;
				break;
			case AilmentType.Blast:
				this.stats.effectivePassiveAilmentAttack = this.stats.passiveBlastAttack;
				this.stats.effectivePassiveAilmentBuildupPercent = this.stats.passiveBlastBuildupPercent;
				break;
			case AilmentType.Stun:
				this.stats.effectivePassiveAilmentAttack = this.stats.passiveStunAttack;
				this.stats.effectivePassiveAilmentBuildupPercent = this.stats.passiveStunBuildupPercent;
				break;
			default:
				break;
		}

		if (weapon) {
			this.stats.sharpnessDataNeeded = weapon.sharpnessDataNeeded;
			this.stats.maxSharpness = weapon.maxSharpness;
			this.stats.elementHidden = weapon.elementHidden;
			this.stats.ailmentHidden = weapon.ailmentHidden;

			const weaponModifier = this.dataService.getWeaponModifier(weapon.weaponType);
			if (weaponModifier) {
				this.stats.weaponAttackModifier = weaponModifier.attackModifier;
			}
		}
		if (weapon && weapon.sharpnessLevels) {
			this.stats.effectiveSharpnessLevel = weapon.sharpnessLevels[Math.min(this.stats.passiveSharpness / 10, weapon.sharpnessLevels.length - 1)];
			if (this.stats.effectiveSharpnessLevel) {
				const sharpnessModifier = this.dataService.getSharpnessModifier(DamageType.Physical, this.stats.effectiveSharpnessLevel.color);
				if (sharpnessModifier) {
					this.stats.effectivePhysicalSharpnessModifier = sharpnessModifier.value;
				}
			}
		}


		if (this.stats.elementlessBoostPercent > 0 && this.stats.elementAttackMultiplier == 0) {
			this.stats.totalAttack =
				Math.round(
					this.stats.attack * (1 + this.stats.elementlessBoostPercent / 100)
					+ this.stats.passiveAttack * this.stats.weaponAttackModifier
				);

			this.stats.totalAttackPotential =
				Math.round(
					this.stats.attack * this.stats.effectivePhysicalSharpnessModifier * (1 + this.stats.elementlessBoostPercent / 100)
					+ (this.stats.passiveAttack + this.stats.activeAttack) * this.stats.weaponAttackModifier
				);
		} else {
			this.stats.totalAttack =
				this.stats.attack + Math.round(this.stats.passiveAttack * this.stats.weaponAttackModifier);
			this.stats.totalAttackPotential =
				Math.round(
					this.stats.attack * this.stats.effectivePhysicalSharpnessModifier
					+ (this.stats.passiveAttack + this.stats.activeAttack) * this.stats.weaponAttackModifier
				);
		}

		const elementAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;
		const ailmentAttackIncreaseCap = weapon ? weapon.elementAttackIncreaseCapOverride || this.defaultElementAttackIncreaseCap : this.defaultElementAttackIncreaseCap;

		if (this.stats.elementHidden) {
			this.stats.effectiveElementAttack = this.nearestTen(Math.round(this.stats.baseElementAttack * this.stats.elementAttackMultiplier));
		} else {
			this.stats.effectiveElementAttack = this.stats.baseElementAttack;
		}

		if (this.stats.ailmentHidden) {
			this.stats.effectiveAilmentAttack = this.nearestTen(Math.round(this.stats.baseAilmentAttack * this.stats.elementAttackMultiplier));
		} else {
			this.stats.effectiveAilmentAttack = this.stats.baseAilmentAttack;
		}

		this.stats.elementCap = this.nearestTen(Math.round(this.stats.effectiveElementAttack + (this.stats.effectiveElementAttack * elementAttackIncreaseCap)));
		this.stats.ailmentCap = this.nearestTen(Math.round(this.stats.effectiveAilmentAttack + (this.stats.effectiveAilmentAttack * ailmentAttackIncreaseCap)));

		this.stats.totalElementAttack = Math.min(this.stats.effectiveElementAttack + this.stats.effectivePassiveElementAttack, this.stats.elementCap);
		this.stats.totalAilmentAttack = Math.min(this.stats.effectiveAilmentAttack + this.stats.effectivePassiveAilmentAttack, this.stats.ailmentCap);

		this.stats.elementCapped = this.stats.totalElementAttack > 0 && this.stats.totalElementAttack >= this.stats.elementCap;
		this.stats.ailmentCapped = this.stats.totalAilmentAttack > 0 && this.stats.totalAilmentAttack >= this.stats.ailmentCap;

		if (this.stats.elderseal && this.stats.eldersealLevelBoost) {
			const eldersealTypes = Object.keys(EldersealType);
			const currentIndex = eldersealTypes.indexOf(this.stats.elderseal);
			const newIndex = Math.min(currentIndex + this.stats.eldersealLevelBoost, eldersealTypes.length - 1);
			this.stats.elderseal = eldersealTypes[newIndex];
		}
	}

	private nearestTen(value: number): number {
		return Math.round(value / 10) * 10;
	}
}
