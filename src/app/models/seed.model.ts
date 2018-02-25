import { SkillModel } from './skill.model';
import { ItemModel } from './item.model';
import { WeaponModifierModel } from './weapon-modifier.model';
import { DecorationModel } from './decoration.model';

export class SeedModel {
	weaponModifiers: WeaponModifierModel[];
	weapons: ItemModel[];
	armor: ItemModel[];
	skills: SkillModel[];
	decorations: DecorationModel[];

	constructor() {
		this.weaponModifiers = new Array<WeaponModifierModel>();
		this.weapons = new Array<ItemModel>();
		this.armor = new Array<ItemModel>();
		this.skills = new Array<SkillModel>();
		this.decorations = new Array<DecorationModel>();
	}
}
