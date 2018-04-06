import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DecorationModel } from '../models/decoration.model';
import { EquippedSkillModel } from '../models/equipped-skill.model';
import { ItemModel } from '../models/item.model';
import { SkillModel } from '../models/skill.model';
import { StatDetailModel } from '../models/stat-detail.model';
import { AnchorType } from '../types/anchor.type';

@Injectable()
export class TooltipService {
	public itemSubject = new Subject<ItemModel>();
	public decorationSubject = new Subject<DecorationModel>();
	public equippedSkillSubject = new Subject<EquippedSkillModel>();
	public skillSubject = new Subject<SkillModel>();
	public calcSubject = new Subject<StatDetailModel>();

	public item: ItemModel;
	public decoration: DecorationModel;
	public equippedSkill: EquippedSkillModel;
	public skill: SkillModel;
	public calc: StatDetailModel;

	public anchorPoint: AnchorType;

	constructor() {
		this.anchorPoint = AnchorType.TopLeft;
	}

	setItem(item: ItemModel) {
		if (item != this.item) {
			this.reset();
			this.item = item;
			this.itemSubject.next(item);
		}
	}

	setDecoration(decoration: DecorationModel) {
		if (decoration != this.decoration) {
			this.reset();
			this.decoration = decoration;
			this.decorationSubject.next(decoration);
		}
	}

	setEquippedSkill(equippedSkill: EquippedSkillModel) {
		if (equippedSkill != this.equippedSkill) {
			this.reset();
			this.equippedSkill = equippedSkill;
			this.equippedSkillSubject.next(equippedSkill);
		}
	}

	setSkill(skill: SkillModel) {
		if (skill != this.skill) {
			this.reset();
			this.skill = skill;
			this.skillSubject.next(skill);
		}
	}

	setCalc(calc: StatDetailModel) {
		if (calc != this.calc) {
			this.reset();
			this.calc = calc;
			this.calcSubject.next(calc);
		}
	}

	private reset() {
		this.item = null;
		this.decoration = null;
		this.equippedSkill = null;
		this.skill = null;
		this.calc = null;
	}
}
