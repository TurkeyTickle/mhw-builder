import { ElementType } from '../types/element.type';
import { AilmentType } from '../types/ailment.type';
import { SharpnessLevelModel } from './sharpness-level.model';
import { SharpnessType } from '../types/sharpness.type';

export class StatsModel {
	totalAttack: number;
	totalAttackPotential: number;
	attack: number;
	passiveAttack: number;
	activeAttack: number;
	sharpnessDataNeeded: boolean;
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

	elementlessBoostPercent: number;

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
	eldersealLevelBoost: number;

	defense: number;
	maxDefense: number;
	augmentedDefense: number;
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

	healOnHitPercent: number;

	constructor() {
		this.totalAttack = 0;
		this.attack = 0;
		this.passiveAttack = 0;
		this.activeAttack = 0;

		this.elementlessBoostPercent = 0;

		this.sharpnessDataNeeded = false;
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
		this.eldersealLevelBoost = 0;

		this.defense = 0;
		this.maxDefense = 0;
		this.augmentedDefense = 0;
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

		this.healOnHitPercent = 0;
	}
}
