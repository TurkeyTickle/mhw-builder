import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TSVParser } from '../helpers/tsv-parser';
import { AugmentationModel } from '../models/augmentation.model';
import { DecorationModel } from '../models/decoration.model';
import { ItemModel } from '../models/item.model';
import { SeedModel } from '../models/seed.model';
import { SetBonusModel } from '../models/set-bonus.model';
import { SharpnessModifierModel } from '../models/sharpness-modifier.model';
import { SkillModel } from '../models/skill.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { EquipmentCategoryType } from '../types/equipment-category.type';
import { ItemType } from '../types/item.type';

@Injectable()
export class AppDataProvider {
	private seedData: SeedModel;
	private baseRef: string;

	constructor(private http: HttpClient, private platformLocation: PlatformLocation) {
		this.seedData = new SeedModel();
		this.baseRef = (platformLocation as any).location.origin + (platformLocation as any).location.pathname;
	}

	getWeaponModifiers(): WeaponModifierModel[] {
		return this.seedData.weaponModifiers;
	}

	getSharpnessModifiers(): SharpnessModifierModel[] {
		return this.seedData.sharpnessModifiers;
	}

	getWeapons(): ItemModel[] {
		return this.seedData.weapons;
	}

	getArmor(): ItemModel[] {
		return this.seedData.armor;
	}

	getCharms(): ItemModel[] {
		return this.seedData.charms;
	}

	getSetBonuses(): SetBonusModel[] {
		return this.seedData.setBonuses;
	}

	getSkills(): SkillModel[] {
		return this.seedData.skills;
	}

	getDecorations(): DecorationModel[] {
		return this.seedData.decorations;
	}

	getAugmentations(): AugmentationModel[] {
		return this.seedData.augmentations;
	}

	load(): Promise<boolean> {
		const items = [
			this.loadWeaponModifiers(),
			this.loadSharpnessModifiers(),
			this.loadWeapons(),
			this.loadArmor(),
			this.loadCharms(),
			this.loadDecorations(),
			this.loadSetBonuses(),
			this.loadSkills(),
			this.loadAugmentations()
		];

		return Promise.all(items).then<boolean>(() => true);
	}

	loadWeaponModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<WeaponModifierModel[]>(this.baseRef + 'assets/weapon-modifiers.json').subscribe(items => {
				this.seedData.weaponModifiers = this.seedData.weaponModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadSharpnessModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SharpnessModifierModel[]>(this.baseRef + 'assets/sharpness-modifiers.json').subscribe(items => {
				this.seedData.sharpnessModifiers = this.seedData.sharpnessModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadWeapons(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get(this.baseRef + 'assets/weapons.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const weapons = TSVParser.parseWeapons(data);

				_.each(weapons, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					item.itemType = ItemType.Weapon;
				});

				this.seedData.weapons = weapons;
				resolve(true);
			});
		});
	}

	loadArmor(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get(this.baseRef + '/assets/armor.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const armor = TSVParser.parseArmor(data);

				_.each(armor, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
				});

				this.seedData.armor = armor;
				resolve(true);
			});
		});
	}

	loadCharms(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get(this.baseRef + '/assets/charms.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const charms = TSVParser.parseCharms(data);

				_.each(charms, charm => {
					charm.itemType = ItemType.Charm;
					charm.equipmentCategory = EquipmentCategoryType.Charm;
				});

				this.seedData.charms = charms;
				resolve(true);
			});
		});
	}

	loadDecorations(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get(this.baseRef + '/assets/decorations.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const decorations = TSVParser.parseDecorations(data);
				this.seedData.decorations = decorations;
				resolve(true);
			});
		});
	}

	loadSetBonuses(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SetBonusModel[]>(this.baseRef + '/assets/set-bonuses.json').subscribe(setBonuses => {
				this.seedData.setBonuses = setBonuses;
				resolve(true);
			});
		});
	}

	loadSkills(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SkillModel[]>(this.baseRef + '/assets/skills.json').subscribe(skills => {
				this.seedData.skills = skills;
				resolve(true);
			});
		});
	}

	loadAugmentations(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<AugmentationModel[]>(this.baseRef + '/assets/augmentations.json').subscribe(augmentations => {
				this.seedData.augmentations = augmentations;
				resolve(true);
			});
		});
	}
}
