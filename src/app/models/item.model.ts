import { Guid } from '../core/guid';
import { SharpnessType } from '../types/sharpness.type';
import { ElementType } from '../types/element.type';
import { EldersealType } from '../types/elderseal.type';
import { SlotModel } from './slot.model';
import { SkillModel } from './skill.model';
import { ItemType } from '../types/item.type';
import { ItemSkillModel } from './item-skill.model';

export class ItemModel {
	id: string;
	name: string;
	itemType: ItemType;
	slots?: SlotModel[];
	baseDefense?: number;

	// weapon properties
	baseAttack?: number;
	maxSharpness: SharpnessType;
	baseAffinityPercent: number;
	element?: ElementType;
	elementBaseAttack?: number;
	elderseal?: EldersealType;

	// armor properties
	fireResist: number;
	waterResist: number;
	thunderResist: number;
	iceResist: number;
	dragonResist: number;
	skills?: ItemSkillModel[];

	constructor() {
		this.id = Guid.newGuid();
	}
}
