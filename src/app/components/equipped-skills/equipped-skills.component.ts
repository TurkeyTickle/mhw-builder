import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { ItemsService } from '../../services/items.service';

import * as _ from 'lodash';

@Component({
	selector: 'mhw-builder-equipped-skills',
	templateUrl: './equipped-skills.component.html',
	styleUrls: ['./equipped-skills.component.scss']
})
export class EquippedSkillsComponent implements OnInit {
	equippedSkills: EquippedSkillModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() { }

	getColor(equippedSkill: EquippedSkillModel): string {
		if (equippedSkill.equippedCount > equippedSkill.skill.levels.length) {
			return 'red';
		} else if (equippedSkill.equippedCount == equippedSkill.skill.levels.length) {
			return '#86ff86';
		}

		return 'white';
	}

	update(items: ItemModel[]): void {
		this.reset();
		this.updateSkills(items);
	}

	private reset() {
		this.equippedSkills = new Array<EquippedSkillModel>();
	}

	private updateSkills(items: ItemModel[]) {
		for (const item of items) {
			if (!item.skills) {
				continue;
			}

			for (const itemSkill of item.skills) {
				const skill = this.itemsService.getSkill(itemSkill.id);

				let equippedSkill: EquippedSkillModel = _.find(this.equippedSkills, (es: EquippedSkillModel) => {
					return es.skill.id == itemSkill.id;
				});

				if (!equippedSkill) {
					equippedSkill = new EquippedSkillModel();
					equippedSkill.skill = skill;
					equippedSkill.equippedCount = itemSkill.level;
					this.equippedSkills.push(equippedSkill);
				} else {
					equippedSkill.equippedCount += itemSkill.level;
				}
			}
		}
	}
}
