import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { EquippedSkillModel } from '../../models/equipped-skill.model';
import { SkillLevel } from '../../models/skill-level.model';
import * as _ from 'lodash';
import { SkillService } from '../../services/skill.service';

@Component({
	selector: 'mhw-builder-equipped-stats',
	templateUrl: './equipped-stats.component.html',
	styleUrls: ['./equipped-stats.component.scss']
})

export class EquippedStatsComponent implements OnInit {
	totalAttack: number;
	attack: number;
	passiveAttack: number;
	weaponAttackModifier: number;
	affinity: number;
	passiveAffinity: number;
	element: string;
	elementAttack: number;
	ailment: string;
	ailmentAttack: number;
	elderseal: string;
	defense: number;
	fireResist: number;
	waterResist: number;
	thunderResist: number;
	iceResist: number;
	dragonResist: number;

	constructor(
		private itemsService: ItemsService,
		private skillService: SkillService
	) { }

	ngOnInit() {
		this.reset();
	}

	update(items: ItemModel[]) {
		this.reset();

		for (const item of items) {
			this.updateStats(item);
		}

		this.updateSkills(items, this.skillService.skills);
	}

	private reset() {
		this.totalAttack = 0;
		this.attack = 0;
		this.passiveAttack = 0;
		this.weaponAttackModifier = 0;
		this.affinity = 0;
		this.passiveAffinity = 0;
		this.defense = 0;
		this.element = null;
		this.elementAttack = 0;
		this.ailment = null;
		this.ailmentAttack = 0;
		this.elderseal = null;
		this.fireResist = 0;
		this.waterResist = 0;
		this.thunderResist = 0;
		this.iceResist = 0;
		this.dragonResist = 0;
		this.elementAttack = 0;
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

		if (item.elderseal) {
			this.elderseal = item.elderseal;
		}
	}

	private updateSkills(items: ItemModel[], equippedSkills: EquippedSkillModel[]) {
		for (const equippedSkill of equippedSkills) {
			let level: SkillLevel;

			if (equippedSkill.equippedCount) {
				const levelIndex = equippedSkill.equippedCount <= equippedSkill.skill.levels.length
					? equippedSkill.equippedCount - 1 : equippedSkill.skill.levels.length - 1;
				level = equippedSkill.skill.levels[levelIndex];
			}

			if (level) {
				if (level.passiveAttack) {
					this.passiveAttack += level.passiveAttack;
				}

				if (level.passiveAffinity) {
					this.passiveAffinity += level.passiveAffinity;
				}
			}
		}

		const weapon = _.find(items, item => item.weaponType);
		if (weapon) {
			const weaponModifier = this.itemsService.getWeaponModifier(weapon.weaponType);
			if (weaponModifier) {
				this.weaponAttackModifier = weaponModifier.attackModifier;
			}
		}

		this.totalAttack = this.attack + Math.round(this.passiveAttack * this.weaponAttackModifier);
	}
}
