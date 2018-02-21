import { HttpClient } from '@angular/common/http';
import { SeedModel } from '../models/seed.model';
import { SkillModel } from '../models/skill.model';
import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';

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

	load(): Promise<boolean> {
		return new Promise((resolve) => {
			this.http.get<SeedModel>('../assets/seed.json').subscribe(items => {
				this.seedData = items;
				resolve(true);
			});
		});
	}
}
