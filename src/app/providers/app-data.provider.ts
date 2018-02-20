import { HttpClient } from '@angular/common/http';
import { ItemsModel } from '../models/items.model';
import { SkillModel } from '../models/skill.model';
import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';

@Injectable()
export class AppDataProvider {
	private items: ItemsModel;

	constructor(private http: HttpClient) {
	}

	getWeapons(): ItemModel[] {
		return this.items.weapons;
	}

	getArmor(): ItemModel[] {
		return this.items.armor;
	}

	getSkills(): SkillModel[] {
		return this.items.skills;
	}

	load(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.http.get<ItemsModel>('../assets/seed.json').subscribe(items => {
				this.items = items;
				resolve(true);
			});
		});
	}
}
