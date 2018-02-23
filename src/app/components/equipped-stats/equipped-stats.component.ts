import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { EquippedSkillModel } from '../../models/equipped-skill.model';

import * as _ from 'lodash';

@Component({
	selector: 'mhw-builder-equipped-stats',
	templateUrl: './equipped-stats.component.html',
	styleUrls: ['./equipped-stats.component.scss']
})

export class EquippedStatsComponent implements OnInit {
	attack: number;
	weaponAttackModifier: number;
	affinity: number;
	element: string;
	elementAttack: number;
	ailment: string;
	ailmentAttack: number;
	defense: number;
	fireResist: number;
	waterResist: number;
	thunderResist: number;
	iceResist: number;
	dragonResist: number;

	equippedSkills: EquippedSkillModel[];

	constructor(
		private itemsService: ItemsService
	) { }

	ngOnInit() {
		this.reset();
	}

	update(items: ItemModel[]): void {
		this.reset();

		for (const item of items) {
			this.updateStats(item);
		}

		this.updateSkills(items);
	}

	private reset() {
		this.attack = 0;
		this.weaponAttackModifier = 0;
		this.affinity = 0;
		this.defense = 0;
		this.element = null;
		this.elementAttack = 0;
		this.ailment = null;
		this.ailmentAttack = 0;
		this.fireResist = 0;
		this.waterResist = 0;
		this.thunderResist = 0;
		this.iceResist = 0;
		this.dragonResist = 0;
		this.elementAttack = 0;

		this.equippedSkills = new Array<EquippedSkillModel>();
	}

	private updateStats(item: ItemModel) {
		if (item.baseAttack) {
			this.attack += item.baseAttack;
		}

		if (item.baseAffinityPercent) {
			this.affinity += item.baseAffinityPercent;
		}

		if (item.baseDefense) {
			this.defense += item.baseDefense;
		}

		if (item.fireResist) {
			this.fireResist += item.fireResist;
		}

		if (item.waterResist) {
			this.waterResist += item.waterResist;
		}

		if (item.thunderResist) {
			this.thunderResist += item.thunderResist;
		}

		if (item.iceResist) {
			this.iceResist += item.iceResist;
		}

		if (item.dragonResist) {
			this.dragonResist += item.dragonResist;
		}

		if (item.element) {
			this.element = item.element;
		}

		if (item.elementBaseAttack) {
			this.elementAttack += item.elementBaseAttack;
		}

		if (item.ailment) {
			this.ailment = item.ailment;
		}

		if (item.ailmentBaseAttack) {
			this.ailmentAttack += item.ailmentBaseAttack;
		}
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

		let additionalAttack = 0;
		let additionalAffinity = 0;

		for (const equippedSkill of this.equippedSkills) {
			const level = equippedSkill.skill.levels[equippedSkill.equippedCount - 1];

			if (level) {
				if (level.passiveAttack) {
					additionalAttack += level.passiveAttack;
				}

				if (level.passiveAffinity) {
					additionalAffinity += level.passiveAffinity;
				}
			}
		}

		const weapon = _.find(items, item => item.weaponType);
		if (weapon) {
			const weaponModifier = this.itemsService.getWeaponModifier(weapon.weaponType);
			if (weaponModifier) {
				this.weaponAttackModifier = weaponModifier.attackModifier;
				additionalAttack = Math.round(additionalAttack * weaponModifier.attackModifier);
			}
		}

		this.attack += additionalAttack;
		this.affinity += additionalAffinity;
	}
}
