import { Component, Input, OnInit } from '@angular/core';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillModel } from '../../models/skill.model';

@Component({
	selector: 'mhw-builder-skill-details',
	templateUrl: './skill-details.component.html',
	styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit {

	@Input() equippedSkill: EquippedSkillModel;
	@Input() skill: SkillModel;

	constructor() { }

	ngOnInit() { }

	getLevelColor(level: number): string {
		return Math.min(this.equippedSkill.equippedCount, this.equippedSkill.totalLevelCount) == level ? '#86ff86' : 'white';
	}
}
