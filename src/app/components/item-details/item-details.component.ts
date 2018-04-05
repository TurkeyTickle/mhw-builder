import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { ItemModel } from '../../models/item.model';
import { SkillModel } from '../../models/skill.model';
import { ItemsService } from '../../services/items.service';
import { WeaponType } from '../../types/weapon.type';
import { StatDetailModel } from '../../models/stat-detail.model';

@Component({
	selector: 'mhw-builder-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
	private _item: ItemModel;

	@Input()
	set item(item: ItemModel) {
		this._item = item;
		if (item) {
			this.setupStats();
			this.loadSkills();
		} else {
			this.skills = new Array<SkillModel>();
		}
	}
	get item(): ItemModel {
		return this._item;
	}

	skills: SkillModel[];
	stats: StatDetailModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() { }

	setupStats() {

	}

	loadSkills() {
		this.skills = this.itemsService.getSkills(this.item.skills);
	}

	getSkillCount(skill: SkillModel): string {
		const itemSkill = _.find(this.item.skills, s => s.id == skill.id);
		const result = `${itemSkill.level}/${skill.levels.length}`;
		return result;
	}

	getWeaponTypeName(weaponType: WeaponType): string {
		return this.itemsService.getWeaponTypeName(weaponType);
	}
}
