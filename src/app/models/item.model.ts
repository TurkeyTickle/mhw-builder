import { AilmentType } from '../types/ailment.type';
import { EldersealType } from '../types/elderseal.type';
import { ElementType } from '../types/element.type';
import { EquipmentCategoryType } from '../types/equipment-category.type';
import { ItemType } from '../types/item.type';
import { SharpnessType } from '../types/sharpness.type';
import { WeaponType } from '../types/weapon.type';
import { ItemSkillModel } from './item-skill.model';
import { SlotModel } from './slot.model';
import { SharpnessLevelModel } from './sharpness-level.model';

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
	sharpnessLevels: SharpnessLevelModel[];
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
