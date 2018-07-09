import { NgModule } from '@angular/core';
import { WeaponsLoader } from './loaders/weapons.loader';
import { ArmorLoader } from './loaders/armor.loader';
import { SharpnessModifiersLoader } from './loaders/sharpness-modifiers.loader';
import { WeaponModifiersLoader } from './loaders/weapon-modifiers.loader';
import { CharmsLoader } from './loaders/charms.loader';
import { DecorationsLoader } from './loaders/decorations.loader';
import { SetBonusesLoader } from './loaders/set-bonuses.loader';
import { SkillsLoader } from './loaders/skills.loader';
import { AugmentationsLoader } from './loaders/augmentations.loader';
import { AmmoCapacitiesLoader } from './loaders/ammo-capacities.loader';
import { KinsectsLoader } from './loaders/kinsects.loader';

@NgModule({
	providers: [
		WeaponsLoader,
		ArmorLoader,
		CharmsLoader,
		DecorationsLoader,
		AugmentationsLoader,
		SkillsLoader,
		SetBonusesLoader,
		SharpnessModifiersLoader,
		WeaponModifiersLoader,
		AmmoCapacitiesLoader,
		KinsectsLoader
	],
})
export class DataModule { }
