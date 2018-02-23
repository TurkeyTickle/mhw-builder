
export class SkillModel {
	id: string;
	name: string;
	description: string;
	setLevels: SetSkillLevel[];
	levels: SkillLevel[];
}

class SetSkillLevel {
	description: string;
	level: number;
}

class SkillLevel {
	description: string;
	passiveAttack: number;
	activeAttack: number;
	passiveAffinity: number;
	activeAffinity: number;
	passiveCritBoostPercent: number;
}
