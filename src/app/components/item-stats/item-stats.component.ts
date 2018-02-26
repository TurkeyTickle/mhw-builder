import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { DecorationModel } from '../../models/decoration.model';
import { ItemsService } from '../../services/items.service';
import { SkillModel } from '../../models/skill.model';
import * as _ from 'lodash';
import { WeaponType } from '../../types/weapon.type';

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

	getWeaponTypeName(weaponType: WeaponType): string {
		switch (weaponType) {
			case WeaponType.ChargeBlade:
				return 'Charge Blade';
			case WeaponType.DualBlades:
				return 'Dual Blades';
			case WeaponType.GreatSword:
				return 'Great Sword';
			case WeaponType.HeavyBowgun:
				return 'Heavy Bowgun';
			case WeaponType.HuntingHorn:
				return 'Hunting Horn';
			case WeaponType.InsectGlaive:
				return 'Insect Glaive';
			case WeaponType.LightBowgun:
				return 'Light Bowgun';
			case WeaponType.LongSword:
				return 'Long Sword';
			case WeaponType.SwitchAxe:
				return 'Switch Axe';
			case WeaponType.SwordAndShield:
				return 'Sword and Shield';
			default:
				return weaponType;
		}
	}
}
