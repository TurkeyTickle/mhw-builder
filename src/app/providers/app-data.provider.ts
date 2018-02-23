import { HttpClient } from '@angular/common/http';
import { SeedModel } from '../models/seed.model';
import { SkillModel } from '../models/skill.model';
import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { DecorationModel } from '../models/decoration.model';
import * as  _ from 'lodash';
import { EquipmentCategoryType } from '../types/equipment-category.type';

@Injectable()
export class AppDataProvider {
	private seedData: SeedModel;

	constructor(private http: HttpClient) {
	}

	getWeapons(): ItemModel[] {
		return this.seedData.weapons;
	}

	getArmor(): ItemModel[] {
		return this.seedData.armor;
	}

	getSkills(): SkillModel[] {
		return this.seedData.skills;
	}

	getWeaponModifiers(): WeaponModifierModel[] {
		return this.seedData.weaponModifiers;
	}

	getDecorations(): DecorationModel[] {
		return this.seedData.decorations;
	}

	load(): Promise<boolean> {
		return new Promise((resolve) => {
			this.http.get<SeedModel>('../assets/seed.json').subscribe(items => {
				_.each(items.weapons, weapon => {
					weapon.equipmentCategory = EquipmentCategoryType.Weapon;
				});

				_.each(items.armor, armor => {
					armor.equipmentCategory = EquipmentCategoryType.Armor;
				});

				this.seedData = items;
				resolve(true);
			});
		});
	}
}
