import { Injectable } from '@angular/core';
import { AppDataProvider } from '../providers/app-data.provider';

import * as _ from 'lodash';
import { SkillModel } from '../models/skill.model';
import { ItemType } from '../types/item.type';
import { ItemModel } from '../models/item.model';
import { WeaponType } from '../types/weapon.type';
import { WeaponModifierModel } from '../models/weapon-modifier.model';

@Injectable()
export class ItemsService {
	constructor(
		private appData: AppDataProvider
	) { }

	getItems(type: ItemType): ItemModel[] {
		if (type == ItemType.Weapon) {
			return this.appData.getWeapons();
		} else {
			return _.filter(this.appData.getArmor(), armor => armor.itemType === type);
		}
	}

	getSkill(id: string): SkillModel {
		return _.find(this.appData.getSkills(), skill => skill.id === id);
	}

	getWeaponModifier(weaponType: WeaponType): WeaponModifierModel {
		return _.find(this.appData.getWeaponModifiers(), (mod: WeaponModifierModel) => {
			return mod.type == weaponType;
		});
	}

	// getAllSkills(): SkillModel[] {
	// 	return this.appData.getSkills();
	// }

	// getSkill(id: string): SkillModel {
	// 	return _.find(this.appData.getSkills(), skill => skill.id === id);
	// }
}
