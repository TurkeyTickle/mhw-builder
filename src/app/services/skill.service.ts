import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { EquippedSkillModel } from '../models/equipped-skill.model';
import * as _ from 'lodash';
import { ItemsService } from './items.service';
import { DecorationModel } from '../models/decoration.model';
import { EquippedSetBonusModel } from '../models/equipped-set-bonus.model';

@Injectable()
export class SkillService {
	public skills: EquippedSkillModel[];
	public setBonuses: EquippedSetBonusModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	updateSkills(items: ItemModel[], decorations: DecorationModel[]) {
		const equippedSkills = new Array<EquippedSkillModel>();
		const equippedSetBonuses = new Array<EquippedSetBonusModel>();

		// IMPROVEMENT: this code loops through items several times.
		this.addItemSkills(items, equippedSkills);
		this.addDecorationSkills(decorations, equippedSkills);
		this.addSetSkills(items, equippedSkills, equippedSetBonuses);

		this.skills = equippedSkills;
		this.setBonuses = equippedSetBonuses;
	}

	private addItemSkills(items: ItemModel[], equippedSkills: EquippedSkillModel[]) {
		for (const item of items) {
			if (!item.skills) {
				continue;
			}

			for (const itemSkill of item.skills) {
				if (!itemSkill.level) {
					continue;
				}

				let equippedSkill = _.find(equippedSkills, es => es.id == itemSkill.id);

				if (!equippedSkill) {
					const skill = this.itemsService.getSkill(itemSkill.id);
					equippedSkill = new EquippedSkillModel();
					equippedSkill.skill = skill;
					equippedSkill.id = skill.id;
					equippedSkill.name = skill.name;
					equippedSkill.description = skill.description;
					equippedSkill.equippedCount = itemSkill.level;
					equippedSkill.totalLevelCount = skill.levels.length;
					equippedSkills.push(equippedSkill);
				} else {
					equippedSkill.equippedCount += itemSkill.level;
				}
			}
		}
	}

	private addDecorationSkills(decorations: DecorationModel[], equippedSkills: EquippedSkillModel[]) {
		for (const decoration of decorations) {
			if (!decoration.skills) {
				continue;
			}

			for (const itemSkill of decoration.skills) {
				if (!itemSkill.level) {
					continue;
				}

				let equippedSkill = _.find(equippedSkills, es => es.id == itemSkill.id);

				if (!equippedSkill) {
					const skill = this.itemsService.getSkill(itemSkill.id);
					equippedSkill = new EquippedSkillModel();
					equippedSkill.skill = skill;
					equippedSkill.id = skill.id;
					equippedSkill.name = skill.name;
					equippedSkill.description = skill.description;
					equippedSkill.equippedCount = itemSkill.level;
					equippedSkill.totalLevelCount = skill.levels.length;
					equippedSkills.push(equippedSkill);
				} else {
					equippedSkill.equippedCount += itemSkill.level;
				}
			}
		}
	}

	private addSetSkills(items: ItemModel[], equippedSkills: EquippedSkillModel[], equippedSetBonuses: EquippedSetBonusModel[]) {
		let setBonusNames = new Array<string>();

		for (const item of items) {
			if (!item.skills) {
				continue;
			}

			for (const skill of item.skills) {
				if (!skill.level) {
					setBonusNames.push(skill.id);
				}
			}
		}

		const setCounts = _.countBy(setBonusNames);
		setBonusNames = _.uniq(setBonusNames);

		for (const setBonusName of setBonusNames) {
			const setBonus = this.itemsService.getSetBonus(setBonusName);
			const setLevels = _.filter(setBonus.setLevels, sl => sl.pieces <= setCounts[setBonusName]);

			if (setLevels) {
				for (const setLevel of setLevels) {
					let equippedSkill = _.find(equippedSkills, es => es.id == setLevel.id);

					if (!equippedSkill) {
						const skill = this.itemsService.getSkill(setLevel.id);
						equippedSkill = new EquippedSkillModel();
						equippedSkill.skill = skill;
						equippedSkill.id = skill.id;
						equippedSkill.name = skill.name;
						equippedSkill.description = skill.description;
						equippedSkill.equippedCount = 1;
						equippedSkill.totalLevelCount = skill.levels.length;
						equippedSkills.push(equippedSkill);
					}
				}
			}

			for (const bonusLevel of setBonus.setLevels) {
				const equippedSetBonus = new EquippedSetBonusModel();
				equippedSetBonus.id = setBonus.id;
				equippedSetBonus.name = setBonus.name;
				equippedSetBonus.equippedCount = setCounts[setBonusName];
				equippedSetBonus.requiredCount = bonusLevel.pieces;
				equippedSetBonuses.push(equippedSetBonus);
			}
		}
	}
}
