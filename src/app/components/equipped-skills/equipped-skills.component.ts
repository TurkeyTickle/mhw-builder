import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { ItemsService } from '../../services/items.service';

import * as _ from 'lodash';
import { DecorationModel } from '../../models/decoration.model';

@Component({
	selector: 'mhw-builder-equipped-skills',
	templateUrl: './equipped-skills.component.html',
	styleUrls: ['./equipped-skills.component.scss']
})
export class EquippedSkillsComponent implements OnInit {
	equippedSkills: EquippedSkillModel[];
	equippedSetSkills: EquippedSkillModel[];
	items = new Array<ItemModel>();
	decorations = new Array<DecorationModel>();

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() { }

	getSkillCountColor(equippedSkill: EquippedSkillModel): string {
		if (!equippedSkill.setEquippedCount) {
			if (equippedSkill.equippedCount > equippedSkill.totalLevelCount) {
				return '#ffff52';
			} else if (equippedSkill.equippedCount == equippedSkill.totalLevelCount) {
				return '#86ff86';
			}
		}

		return 'white';
	}

	getSkillCount(equippedSkill: EquippedSkillModel): string {
		let result: string;
		if (equippedSkill.setEquippedCount) {
			result = `${equippedSkill.setEquippedCount}/${equippedSkill.totalLevelCount}`;
		} else {
			result = `${equippedSkill.equippedCount}/${equippedSkill.totalLevelCount}`;
		}
		return result;
	}

	updateItems(items: ItemModel[]) {
		this.items = items;
		this.resetSkills();
		this.updateSkills();
	}

	updateDecorations(decorations: DecorationModel[]) {
		this.decorations = decorations;
		this.resetSkills();
		this.updateSkills();
	}

	private resetSkills() {
		this.equippedSkills = new Array<EquippedSkillModel>();
		this.equippedSetSkills = new Array<EquippedSkillModel>();
	}

	private updateSkills() {
		for (const item of this.items) {
			this.addSkill(item);
		}

		for (const decoration of this.decorations) {
			this.addSkill(decoration);
		}
	}

	private addSkill(item: ItemModel | DecorationModel) {
		if (!item.skills) {
			return;
		}

		for (const itemSkill of item.skills) {
			const skill = this.itemsService.getSkill(itemSkill.id);

			const equippedSkill = _.find(this.equippedSkills, es => {
				return es.id == itemSkill.id;
			});

			if (!equippedSkill) {
				if (!skill.setLevels) {
					const newSkill = new EquippedSkillModel();
					newSkill.id = skill.id;
					newSkill.name = skill.name;
					newSkill.description = skill.description;
					newSkill.equippedCount = itemSkill.level;
					newSkill.totalLevelCount = skill.levels.length;
					this.equippedSkills.push(newSkill);
				}
			} else {
				equippedSkill.equippedCount += itemSkill.level;
			}

			const equippedSetSkills = _.filter(this.equippedSetSkills, ess => {
				return ess.id == itemSkill.id;
			});

			if (!equippedSetSkills.length) {
				if (skill.setLevels) {
					for (const setLevel of skill.setLevels) {
						const newSkill = new EquippedSkillModel();
						newSkill.id = skill.id;
						newSkill.name = skill.name;
						newSkill.description = setLevel.description;
						newSkill.setEquippedCount = 1;
						newSkill.totalLevelCount = setLevel.level;
						this.equippedSetSkills.push(newSkill);
					}
				}
			} else {
				for (const equippedSetSkill of equippedSetSkills) {
					equippedSetSkill.setEquippedCount += 1;
				}
			}
		}
	}
}
