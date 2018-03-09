import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { DecorationModel } from '../../models/decoration.model';
import { ItemModel } from '../../models/item.model';
import { SkillModel } from '../../models/skill.model';
import { ItemsService } from '../../services/items.service';

@Component({
	selector: 'mhw-builder-item-stats',
	templateUrl: './item-stats.component.html',
	styleUrls: ['./item-stats.component.scss']
})
export class ItemStatsComponent implements OnInit {
	item: ItemModel | DecorationModel;
	skills: SkillModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() { }

	setItem(item: ItemModel | DecorationModel) {
		this.item = item;
		this.loadSkills();
	}

	loadSkills() {
		this.skills = this.itemsService.getSkills(this.item.skills);
	}

	getSkillCount(skill: SkillModel): string {
		const itemSkill = _.find(this.item.skills, s => s.id == skill.id);
		const result = `${itemSkill.level}/${skill.levels.length}`;
		return result;
	}
}
