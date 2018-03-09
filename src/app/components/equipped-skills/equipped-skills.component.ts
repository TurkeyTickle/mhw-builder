import { Component, OnInit } from '@angular/core';

import { EquippedSetBonusModel } from '../../models/equipped-set-bonus.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillService } from '../../services/skill.service';
import { TooltipService } from '../../services/tooltip.service';
import { SkillModel } from '../../models/skill.model';

@Component({
	selector: 'mhw-builder-equipped-skills',
	templateUrl: './equipped-skills.component.html',
	styleUrls: ['./equipped-skills.component.scss']
})
export class EquippedSkillsComponent implements OnInit {
	skills: EquippedSkillModel[];
	setBonuses: EquippedSetBonusModel[];

	constructor(
		private skillService: SkillService,
		private tooltipService: TooltipService
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

	getSetBonusColor(setBonus: EquippedSetBonusModel): string {
		if (setBonus.equippedCount > setBonus.requiredCount) {
			return '#ffff52';
		} else if (setBonus.equippedCount == setBonus.requiredCount) {
			return '#86ff86';
		}

		return 'white';
	}

	update() {
		this.skills = this.skillService.skills;
		this.setBonuses = this.skillService.setBonuses;
	}

	skillMouseEnter(skill: SkillModel) {
		this.tooltipService.setSkill(skill);
	}

	skillMouseLeave() {
		this.tooltipService.setSkill(null);
	}
}
