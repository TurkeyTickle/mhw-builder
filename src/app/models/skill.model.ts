
export class SkillModel {
	id: string;
	name: string;
	description: string;
	setLevels: SetSkillLevel[];
	levels: SkillLevel[];
}

export class SetSkillLevel {
	description: string;
	level: number;
	passiveAttack: number;
	activeAttack: number;
	passiveAffinity: number;
	activeAffinity: number;
	passiveCritBoostPercent: number;
}

export class SkillLevel {
	description: string;
	passiveAttack: number;
	activeAttack: number;
	passiveAffinity: number;
	activeAffinity: number;
	passiveCritBoostPercent: number;
}
