import { SkillLevel } from './skill-level.model';

export class SkillModel {
	id: string;
	name: string;
	description: string;
	levels: SkillLevel[];
}
