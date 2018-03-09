import { Component, OnInit, Input } from '@angular/core';
import { SkillModel } from '../../models/skill.model';
import { DecorationModel } from '../../models/decoration.model';
import { ItemsService } from '../../services/items.service';

import * as _ from 'lodash';

@Component({
	selector: 'mhw-builder-decoration-details',
	templateUrl: './decoration-details.component.html',
	styleUrls: ['./decoration-details.component.scss']
})
export class DecorationDetailsComponent implements OnInit {
	private _decoration: DecorationModel;

	@Input()
	set decoration(decoration: DecorationModel) {
		this._decoration = decoration;
		if (decoration) {
			this.loadSkills();
		} else {
			this.skills = new Array<SkillModel>();
		}
	}
	get decoration(): DecorationModel {
		return this._decoration;
	}

	skills: SkillModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() { }

	loadSkills() {
		this.skills = this.itemsService.getSkills(this.decoration.skills);
	}

	getSkillCount(skill: SkillModel): string {
		const itemSkill = _.find(this.decoration.skills, s => s.id == skill.id);
		const result = `${itemSkill.level}/${skill.levels.length}`;
		return result;
	}
}
