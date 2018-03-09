import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DecorationModel } from '../models/decoration.model';
import { ItemModel } from '../models/item.model';
import { SkillModel } from '../models/skill.model';
import { AnchorType } from '../types/anchor.type';
import { EquippedSkillModel } from '../models/equipped-skill.model';

@Injectable()
export class TooltipService {
	public itemSubject = new Subject<ItemModel>();
	public decorationSubject = new Subject<DecorationModel>();
	public equippedSkillSubject = new Subject<EquippedSkillModel>();
	public skillSubject = new Subject<SkillModel>();

	public item: ItemModel;
	public decoration: DecorationModel;
	public equippedSkill: EquippedSkillModel;
	public skill: SkillModel;

	public anchorPoint: AnchorType;

	constructor() {
		this.anchorPoint = AnchorType.TopLeft;
	}

	setItem(item: ItemModel) {
		this.reset();
		this.item = item;
		this.itemSubject.next(item);
	}

	setDecoration(decoration: DecorationModel) {
		this.reset();
		this.decoration = decoration;
		this.decorationSubject.next(decoration);
	}

	setEquippedSkill(equippedSkill: EquippedSkillModel) {
		this.reset();
		this.equippedSkill = equippedSkill;
		this.equippedSkillSubject.next(equippedSkill);
	}

	setSkill(skill: SkillModel) {
		this.reset();
		this.skill = skill;
		this.skillSubject.next(skill);
	}

	private reset() {
		this.item = null;
		this.decoration = null;
		this.equippedSkill = null;
		this.skill = null;
	}
}
