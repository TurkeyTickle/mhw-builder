import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { DecorationModel } from '../models/decoration.model';
import { ItemSkillModel } from '../models/item-skill.model';
import { ItemModel } from '../models/item.model';
import { SetBonusModel } from '../models/set-bonus.model';
import { SkillModel } from '../models/skill.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { AppDataProvider } from '../providers/app-data.provider';
import { ItemType } from '../types/item.type';
import { WeaponType } from '../types/weapon.type';

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

	getWeapon(id: number): ItemModel {
		return _.find(this.appData.getWeapons(), weapon => weapon.id === id);
	}

	getArmorById(id: number): ItemModel {
		return _.find(this.appData.getArmor(), armor => armor.id === id);
	}

	getArmorByType(type: ItemType): ItemModel[] {
		return _.filter(this.appData.getArmor(), armor => armor.itemType === type);
	}

	getDecorations(level?: number): DecorationModel[] {
		let result = new Array<DecorationModel>();
		if (level) {
			result = this.appData.getDecorations().filter(d => d.level <= level);
		} else {
			result = this.appData.getDecorations();
		}
		return result;
	}

	getSetBonus(id: string): SetBonusModel {
		return _.find(this.appData.getSetBonuses(), setBonus => setBonus.id === id);
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

	getDecoration(id: number): DecorationModel {
		return _.find(this.appData.getDecorations(), (decoration: DecorationModel) => decoration.id == id);
	}

	getWeaponTypeName(weaponType: WeaponType): string {
		switch (weaponType) {
			case WeaponType.ChargeBlade:
				return 'Charge Blade';
			case WeaponType.DualBlades:
				return 'Dual Blades';
			case WeaponType.GreatSword:
				return 'Great Sword';
			case WeaponType.HeavyBowgun:
				return 'Heavy Bowgun';
			case WeaponType.HuntingHorn:
				return 'Hunting Horn';
			case WeaponType.InsectGlaive:
				return 'Insect Glaive';
			case WeaponType.LightBowgun:
				return 'Light Bowgun';
			case WeaponType.LongSword:
				return 'Long Sword';
			case WeaponType.SwitchAxe:
				return 'Switch Axe';
			case WeaponType.SwordAndShield:
				return 'Sword and Shield';
			default:
				return weaponType;
		}
	}

	// getAllSkills(): SkillModel[] {
	// 	return this.appData.getSkills();
	// }

	// getSkill(id: string): SkillModel {
	// 	return _.find(this.appData.getSkills(), skill => skill.id === id);
	// }
}
