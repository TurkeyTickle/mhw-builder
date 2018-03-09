import { Component, OnInit, Input } from '@angular/core';
import { SkillModel } from '../../models/skill.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';

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
}
