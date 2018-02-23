import { Injectable } from '@angular/core';
import { AppDataProvider } from '../providers/app-data.provider';

import * as _ from 'lodash';
import { SkillModel } from '../models/skill.model';
import { ItemType } from '../types/item.type';
import { ItemModel } from '../models/item.model';
import { WeaponType } from '../types/weapon.type';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { DecorationModel } from '../models/decoration.model';
import { ItemSkillModel } from '../models/item-skill.model';

@Injectable()
export class ItemsService {
	constructor(
		private appData: AppDataProvider
	) { }

	getWeapons(weaponType?: WeaponType): ItemModel[] {
		let result = new Array<ItemModel>();
		if (weaponType) {
			result = this.appData.getWeapons().filter(w => w.weaponType == weaponType);
		} else {
			result = this.appData.getWeapons();
		}
		return result;
	}

	getArmor(type: ItemType): ItemModel[] {
		return _.filter(this.appData.getArmor(), armor => armor.itemType === type);
	}

	getDecorations(): DecorationModel[] {
		return this.appData.getDecorations();
	}

	getSkill(id: string): SkillModel {
		return _.find(this.appData.getSkills(), skill => skill.id === id);
	}

	getSkills(itemSkills: ItemSkillModel[]) {
		return _.filter(this.appData.getSkills(), skill => {
			return _.some(itemSkills, itemSkill => skill.id == itemSkill.id);
		});
	}

	getWeaponModifier(weaponType: WeaponType): WeaponModifierModel {
		return _.find(this.appData.getWeaponModifiers(), (mod: WeaponModifierModel) => {
			return mod.type == weaponType;
		});
	}

	getDecoration(id: string): DecorationModel {
		return _.find(this.appData.getDecorations(), (decoration: DecorationModel) => decoration.id == id);
	}

	// getAllSkills(): SkillModel[] {
	// 	return this.appData.getSkills();
	// }

	// getSkill(id: string): SkillModel {
	// 	return _.find(this.appData.getSkills(), skill => skill.id === id);
	// }
}
