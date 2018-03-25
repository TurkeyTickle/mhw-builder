import { DecorationModel } from './decoration.model';
import { ItemModel } from './item.model';
import { SetBonusModel } from './set-bonus.model';
import { SkillModel } from './skill.model';
import { WeaponModifierModel } from './weapon-modifier.model';

export class SeedModel {
	weaponModifiers: WeaponModifierModel[];
	weapons: ItemModel[];
	armor: ItemModel[];
	setBonuses: SetBonusModel[];
	skills: SkillModel[];
	decorations: DecorationModel[];

	constructor() {
		this.weaponModifiers = new Array<WeaponModifierModel>();
		this.weapons = new Array<ItemModel>();
		this.armor = new Array<ItemModel>();
		this.setBonuses = new Array<SetBonusModel>();
		this.skills = new Array<SkillModel>();
		this.decorations = new Array<DecorationModel>();
	}
}
