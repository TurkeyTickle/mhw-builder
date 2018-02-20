import { WeaponType } from '../types/weapon.type';
import { SharpnessType } from '../types/sharpness.type';
import { ElementType } from '../types/element.type';
import { SlotModel } from './slot.model';
import { EldersealType } from '../types/elderseal.type';
import { Guid } from '../core/guid';
import { ItemModel } from './item.model';

export class WeaponModel extends ItemModel {
    type: WeaponType;
    baseAttack: number;
    maxSharpness: SharpnessType;
    baseAffinityPercent: number;
    element?: ElementType;
    elementBaseAttack?: number;
    elderseal?: EldersealType;
    slots?: SlotModel[];
    defense?: number;
}
