import { SkillModel } from './skill.model';
import { ItemModel } from './item.model';
import { WeaponModifierModel } from './weapon-modifier.model';

export class SeedModel {
	weaponModifiers: WeaponModifierModel[];
	weapons: ItemModel[];
	armor: ItemModel[];
	skills: SkillModel[];
}
