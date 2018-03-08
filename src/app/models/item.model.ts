import { SharpnessType } from '../types/sharpness.type';
import { ElementType } from '../types/element.type';
import { EldersealType } from '../types/elderseal.type';
import { SlotModel } from './slot.model';
import { ItemType } from '../types/item.type';
import { ItemSkillModel } from './item-skill.model';
import { WeaponType } from '../types/weapon.type';
import { EquipmentCategoryType } from '../types/equipment-category.type';
import { AilmentType } from '../types/ailment.type';

export class ItemModel {
	id: number;
	name: string;
	itemType: ItemType;
	equipmentCategory: EquipmentCategoryType;
	slots?: SlotModel[];
	baseDefense?: number;
	levels?: number;

	// weapon properties
	weaponType?: WeaponType;
	baseAttack?: number;
	maxSharpness?: SharpnessType;
	baseAffinityPercent?: number;
	ailment?: AilmentType;
	ailmentBaseAttack: number;
	ailmentHidden: boolean;
	ailmentAttackIncreaseCapOverride: number;
	element?: ElementType;
	elementBaseAttack?: number;
	elementHidden: boolean;
	elementAttackIncreaseCapOverride: number;
	elderseal?: EldersealType;

	// armor properties
	fireResist: number;
	waterResist: number;
	thunderResist: number;
	iceResist: number;
	dragonResist: number;
	skills?: ItemSkillModel[];

	tags?: string[];

	equippedLevel?: number;
}
