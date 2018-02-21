import { Guid } from '../core/guid';
import { ItemModel } from './item.model';

export class SkillModel {
	id: string;
	name: string;
	description: string;
	levels: SkillLevel[];
}

class SkillLevel {
	description: string;
	activeAttack: number;
	activeAffinity: number;
}
