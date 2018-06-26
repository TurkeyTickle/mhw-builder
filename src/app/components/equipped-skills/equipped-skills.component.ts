import { Component, OnInit } from '@angular/core';
import { EquippedSetBonusModel } from '../../models/equipped-set-bonus.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillService } from '../../services/skill.service';
import { TooltipService } from '../../services/tooltip.service';
import { PointerType } from '../../types/pointer.type';

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

	ngOnInit() {
		this.skillService.skillsUpdated$.subscribe(skills => {
			this.skills = skills;
			this.skills.sort(function (skill1, skill2) {
				if (skill1.equippedCount > skill2.equippedCount) {
					return -1;
				} else if (skill1.equippedCount < skill2.equippedCount) {
					return 1;
				} else {
					return 0;
				}
			});
		});

		this.skillService.setBonusesUpdated$.subscribe(setBonuses => {
			this.setBonuses = setBonuses;
		});
	}

	getSkillCountColor(skill: EquippedSkillModel): string {
		if (skill.equippedCount > skill.totalLevelCount) {
			return '#e4ff1a';
		} else if (skill.equippedCount == skill.totalLevelCount) {
			return '#86ff86';
		}

		return 'white';
	}

	getSetBonusColor(setBonus: EquippedSetBonusModel): string {
		if (setBonus.equippedCount > setBonus.requiredCount) {
			return '#e4ff1a';
		} else if (setBonus.equippedCount == setBonus.requiredCount) {
			return '#86ff86';
		}

		return 'white';
	}

	showSkillDetails(event: PointerEvent, equippedSkill: EquippedSkillModel) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipService.setEquippedSkill(equippedSkill);
		}
	}

	clearSkillDetails() {
		this.tooltipService.setEquippedSkill(null);
	}

	showOnClickSkillDetails(equippedSkill: EquippedSkillModel) {
		this.tooltipService.setEquippedSkill(equippedSkill);
	}
}
