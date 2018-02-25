import { ItemSkillModel } from './item-skill.model';

export class DecorationModel {
	id: string;
	name: string;
	level: number;
	skills: ItemSkillModel[];
}
