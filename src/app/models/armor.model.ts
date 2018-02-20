import { SkillModel } from './skill.model';
import { ItemType } from '../types/item.type';
import { SlotModel } from './slot.model';
import { Guid } from '../core/guid';
import { ItemModel } from './item.model';

export class ArmorModel extends ItemModel {
    type: ItemType;
    baseDefense: number;
    slots: SlotModel[];
    fireResist: number;
    waterResist: number;
    thunderResist: number;
    iceResist: number;
    dragonResist: number;
    skills: SkillModel[];
}
