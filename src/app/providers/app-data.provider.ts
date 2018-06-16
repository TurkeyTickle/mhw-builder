import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer } from 'rxjs';
import { AppDataModel } from '../models/app-data.model';
import { WeaponsLoader } from '../data/loaders/weapons.loader';
import { ArmorLoader } from '../data/loaders/armor.loader';
import { SharpnessModifiersLoader } from '../data/loaders/sharpness-modifiers.loader';
import { WeaponModifiersLoader } from '../data/loaders/weapon-modifiers.loader';
import { CharmsLoader } from '../data/loaders/charms.loader';
import { DecorationsLoader } from '../data/loaders/decorations.loader';
import { SetBonusesLoader } from '../data/loaders/set-bonuses.loader';
import { SkillsLoader } from '../data/loaders/skills.loader';
import { AugmentationsLoader } from '../data/loaders/augmentations.loader';

@Injectable()
export class AppDataProvider {
	public appData: AppDataModel;

	constructor(
		private weaponLoader: WeaponsLoader,
		private armorLoader: ArmorLoader,
		private charmsLoader: CharmsLoader,
		private decorationsLoader: DecorationsLoader,
		private augmentationsLoader: AugmentationsLoader,
		private skillsLoader: SkillsLoader,
		private setBonusesLoader: SetBonusesLoader,
		private sharpnessModifiersLoader: SharpnessModifiersLoader,
		private weaponModifiersLoader: WeaponModifiersLoader
	) {
		this.appData = new AppDataModel();
	}

	load(): Observable<boolean> {
		return Observable.create((observer: Observer<boolean>) => {
			forkJoin(
				this.weaponLoader.load('weapons.tsv'),
				this.armorLoader.load('armor.tsv'),
				this.charmsLoader.load('charms.tsv'),
				this.decorationsLoader.load('decorations.tsv'),
				this.augmentationsLoader.load('augmentations.json'),
				this.skillsLoader.load('skills.json'),
				this.setBonusesLoader.load('set-bonuses.json'),
				this.sharpnessModifiersLoader.load('sharpness-modifiers.json', false),
				this.weaponModifiersLoader.load('weapon-modifiers.json', false)
			).subscribe(results => {
				this.appData.weapons = results[0];
				this.appData.armor = results[1];
				this.appData.charms = results[2];
				this.appData.decorations = results[3];
				this.appData.augmentations = results[4];
				this.appData.skills = results[5];
				this.appData.setBonuses = results[6];
				this.appData.sharpnessModifiers = results[7];
				this.appData.weaponModifiers = results[8];

				observer.next(true);
				observer.complete();
			});
		});
	}
}
