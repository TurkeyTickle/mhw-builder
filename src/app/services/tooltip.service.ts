import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DecorationModel } from '../models/decoration.model';
import { EquippedSkillModel } from '../models/equipped-skill.model';
import { ItemModel } from '../models/item.model';
import { SkillModel } from '../models/skill.model';
import { StatDetailModel } from '../models/stat-detail.model';
import { AnchorType } from '../types/anchor.type';
import { AugmentationModel } from '../models/augmentation.model';

@Injectable()
export class TooltipService {
	public itemChanged$ = new Subject<ItemModel>();
	public decorationChanged$ = new Subject<DecorationModel>();
	public augmentationChanged$ = new Subject<AugmentationModel>();
	public equippedSkillChanged$ = new Subject<EquippedSkillModel>();
	public skillChanged$ = new Subject<SkillModel>();
	public calcChanged$ = new Subject<StatDetailModel>();

	public item: ItemModel;
	public decoration: DecorationModel;
	public augmentation: AugmentationModel;
	public equippedSkill: EquippedSkillModel;
	public skill: SkillModel;
	public calc: StatDetailModel;

	setItem(item: ItemModel) {
		if (item != this.item) {
			this.reset();
			this.item = item;
			this.itemChanged$.next(item);
		}
	}

	setDecoration(decoration: DecorationModel) {
		if (decoration != this.decoration) {
			this.reset();
			this.decoration = decoration;
			this.decorationChanged$.next(decoration);
		}
	}

	setAugmentation(augmentation: AugmentationModel) {
		if (augmentation != this.augmentation) {
			this.reset();
			this.augmentation = augmentation;
			this.augmentationChanged$.next(augmentation);
		}
	}

	setEquippedSkill(equippedSkill: EquippedSkillModel) {
		if (equippedSkill != this.equippedSkill) {
			this.reset();
			this.equippedSkill = equippedSkill;
			this.equippedSkillChanged$.next(equippedSkill);
		}
	}

	setSkill(skill: SkillModel) {
		if (skill != this.skill) {
			this.reset();
			this.skill = skill;
			this.skillChanged$.next(skill);
		}
	}

	setCalc(calc: StatDetailModel) {
		if (calc != this.calc) {
			this.reset();
			this.calc = calc;
			this.calcChanged$.next(calc);
		}
	}

	private reset() {
		this.item = null;
		this.decoration = null;
		this.augmentation = null;
		this.equippedSkill = null;
		this.skill = null;
		this.calc = null;
	}
}
