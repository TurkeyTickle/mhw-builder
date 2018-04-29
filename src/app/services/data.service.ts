import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DecorationModel } from '../models/decoration.model';
import { SkillReferenceModel } from '../models/skill-reference.model';
import { ItemModel } from '../models/item.model';
import { SetBonusModel } from '../models/set-bonus.model';
import { SharpnessModifierModel } from '../models/sharpness-modifier.model';
import { SkillModel } from '../models/skill.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { AppDataProvider } from '../providers/app-data.provider';
import { DamageType } from '../types/damage.type';
import { ItemType } from '../types/item.type';
import { SharpnessType } from '../types/sharpness.type';
import { WeaponType } from '../types/weapon.type';
import { AugmentationModel } from '../models/augmentation.model';
import { EquipmentCategoryType } from '../types/equipment-category.type';

@Injectable()
export class DataService {
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

	getArmor(id: number): ItemModel {
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

	getSkills(itemSkills: SkillReferenceModel[]): SkillModel[] {
		return _.filter(this.appData.getSkills(), skill => {
			return _.some(itemSkills, itemSkill => skill.id == itemSkill.id);
		});
	}

	getWeaponModifier(weaponType: WeaponType): WeaponModifierModel {
		return _.find(this.appData.getWeaponModifiers(), (mod: WeaponModifierModel) => {
			return mod.type == weaponType;
		});
	}

	getSharpnessModifier(damageType: DamageType, sharpnessType: SharpnessType): SharpnessModifierModel {
		return _.find(this.appData.getSharpnessModifiers(), mod => {
			return mod.damageType == damageType && mod.sharpnessType == sharpnessType;
		});
	}

	getDecoration(id: number): DecorationModel {
		return _.find(this.appData.getDecorations(), decoration => decoration.id == id);
	}

	getAugmentations(): AugmentationModel[] {
		return this.appData.getAugmentations();
	}

	getAugmentation(id: number): AugmentationModel {
		return _.find(this.appData.getAugmentations(), augmentation => augmentation.id == id);
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

	getEquipmentCategory(itemType: ItemType): EquipmentCategoryType {
		switch (itemType) {
			case ItemType.Weapon:
				return EquipmentCategoryType.Weapon;
			case ItemType.Charm:
				return EquipmentCategoryType.Charm;
			case ItemType.Head:
			case ItemType.Chest:
			case ItemType.Hands:
			case ItemType.Legs:
			case ItemType.Feet:
				return EquipmentCategoryType.Armor;
			default:
				return null;
		}
	}
}
