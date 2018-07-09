import { AttackType } from '../types/attack.type';
import { DustEffectType } from '../types/dust-effect.type';
import { ElementType } from '../types/element.type';

export class KinsectModel {
	id: number;
	rarity: number;
	name: string;
	attackType: AttackType;
	dustEffect: DustEffectType;
	power: number;
	speed: number;
	heal: number;

	element?: ElementType;
}
