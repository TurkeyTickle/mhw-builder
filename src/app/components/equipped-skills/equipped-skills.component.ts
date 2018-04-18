import { Component, OnInit } from '@angular/core';
import { EquippedSetBonusModel } from '../../models/equipped-set-bonus.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillService } from '../../services/skill.service';
import { TooltipService } from '../../services/tooltip.service';
import { AnchorType } from '../../types/anchor.type';
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
		});

		this.skillService.setBonusesUpdated$.subscribe(setBonuses => {
			this.setBonuses = setBonuses;
		});
	}

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

	showSkillDetails(event: PointerEvent, equippedSkill: EquippedSkillModel) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipService.anchorPoint = AnchorType.TopRight;
			this.tooltipService.setEquippedSkill(equippedSkill);
		}
	}

	clearSkillDetails() {
		this.tooltipService.anchorPoint = AnchorType.TopLeft;
		this.tooltipService.setEquippedSkill(null);
	}
}
