import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DecorationModel } from '../models/decoration.model';
import { ItemModel } from '../models/item.model';
import { SeedModel } from '../models/seed.model';
import { SetBonusModel } from '../models/set-bonus.model';
import { SharpnessModifierModel } from '../models/sharpness-modifier.model';
import { SkillModel } from '../models/skill.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { EquipmentCategoryType } from '../types/equipment-category.type';
import { AugmentationModel } from '../models/augmentation.model';
import { CSVParser } from '../helpers/csv-parser';
import { SlotModel } from '../models/slot.model';
import { SharpnessLevelModel } from '../models/sharpness-level.model';
import { SharpnessType } from '../types/sharpness.type';
import { ItemType } from '../types/item.type';

@Injectable()
export class AppDataProvider {
	private seedData: SeedModel;

	constructor(private http: HttpClient) {
		this.seedData = new SeedModel();
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

		return Promise.all(items).then<boolean>(() => {
			return true;
		});
	}

	loadWeaponModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<WeaponModifierModel[]>('../assets/weapon-modifiers.json').subscribe(items => {
				this.seedData.weaponModifiers = this.seedData.weaponModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadSharpnessModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SharpnessModifierModel[]>('../assets/sharpness-modifiers.json').subscribe(items => {
				this.seedData.sharpnessModifiers = this.seedData.sharpnessModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadWeapons(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get('../assets/weapons.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const weapons = CSVParser.parseWeapons(data);

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
			this.http.get('../assets/armor.tsv', { responseType: 'text' }).subscribe((data: string) => {
				const armor = CSVParser.parseArmor(data);
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
			this.http.get<ItemModel[]>('../assets/charms.json').subscribe(charms => {
				_.each(charms, charm => {
					charm.equipmentCategory = EquipmentCategoryType.Charm;
				});
				this.seedData.charms = charms;
				resolve(true);
			});
		});
	}

	loadDecorations(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<DecorationModel[]>('../assets/decorations.json').subscribe(decorations => {
				this.seedData.decorations = decorations;
				resolve(true);
			});
		});
	}

	loadSetBonuses(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SetBonusModel[]>('../assets/set-bonuses.json').subscribe(setBonuses => {
				this.seedData.setBonuses = setBonuses;
				resolve(true);
			});
		});
	}

	loadSkills(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SkillModel[]>('../assets/skills.json').subscribe(skills => {
				this.seedData.skills = skills;
				resolve(true);
			});
		});
	}

	loadAugmentations(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<AugmentationModel[]>('../assets/augmentations.json').subscribe(augmentations => {
				this.seedData.augmentations = augmentations;
				resolve(true);
			});
		});
	}
}
