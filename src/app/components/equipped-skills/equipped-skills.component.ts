import { Component, OnInit } from '@angular/core';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillService } from '../../services/skill.service';
import { EquippedSetBonusModel } from '../../models/equipped-set-bonus.model';

@Component({
	selector: 'mhw-builder-equipped-skills',
	templateUrl: './equipped-skills.component.html',
	styleUrls: ['./equipped-skills.component.scss']
})
export class EquippedSkillsComponent implements OnInit {
	skills: EquippedSkillModel[];
	setBonuses: EquippedSetBonusModel[];

	constructor(
		private skillService: SkillService
	) { }

	ngOnInit() { }

	getSkillCountColor(skill: EquippedSkillModel): string {
		if (skill.equippedCount > skill.totalLevelCount) {
			return '#ffff52';
		} else if (skill.equippedCount == skill.totalLevelCount) {
			return '#86ff86';
		}

		return 'white';
	}

	getSkillCount(skill: EquippedSkillModel): string {
		let result: string;
		result = `${skill.equippedCount}/${skill.totalLevelCount}`;
		return result;
	}

	update() {
		this.skills = this.skillService.skills;
		this.setBonuses = this.skillService.setBonuses;
	}
}
