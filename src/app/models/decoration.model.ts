import { ItemSkillModel } from './item-skill.model';

export class DecorationModel {
	id: number;
	name: string;
	level: number;
	skills: ItemSkillModel[];

	equipmentId: number;
}
