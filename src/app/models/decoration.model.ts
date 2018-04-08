import { SkillReferenceModel } from './skill-reference.model';

export class DecorationModel {
	id: number;
	name: string;
	level: number;
	skills: SkillReferenceModel[];

	itemId: number;
}
