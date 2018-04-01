import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { DecorationModel } from '../models/decoration.model';
import { ItemModel } from '../models/item.model';
import { SeedModel } from '../models/seed.model';
import { SetBonusModel } from '../models/set-bonus.model';
import { SkillModel } from '../models/skill.model';
import { WeaponModifierModel } from '../models/weapon-modifier.model';
import { EquipmentCategoryType } from '../types/equipment-category.type';
import { SharpnessModifierModel } from '../models/sharpness-modifier.model';

@Injectable()
export class AppDataProvider {
	private seedData: SeedModel;

	constructor(private http: HttpClient) {
		this.seedData = new SeedModel();
	}

	getWeaponModifiers(): WeaponModifierModel[] {
		return this.seedData.weaponModifiers;
	}

	getSharpnessModifiers(): SharpnessModifierModel[] {
		return this.seedData.sharpnessModifiers;
	}

	getWeapons(): ItemModel[] {
		return this.seedData.weapons;
	}

	getArmor(): ItemModel[] {
		return this.seedData.armor;
	}

	getSetBonuses(): SetBonusModel[] {
		return this.seedData.setBonuses;
	}

	getSkills(): SkillModel[] {
		return this.seedData.skills;
	}

	getDecorations(): DecorationModel[] {
		return this.seedData.decorations;
	}

	load(): Promise<boolean> {
		const items = [
			this.loadWeaponModifiers(),
			this.loadSharpnessModifiers(),
			this.loadGreatSwords(),
			this.loadLongSwords(),
			this.loadSwordAndShields(),
			this.loadDualBlades(),
			this.loadHammers(),
			this.loadHuntingHorns(),
			this.loadLances(),
			this.loadGunlances(),
			this.loadSwitchAxes(),
			this.loadChargeBlades(),
			this.loadInsectGlaives(),
			this.loadLightBowguns(),
			this.loadHeavyBowguns(),
			this.loadBows(),
			this.loadHeads(),
			this.loadChests(),
			this.loadHands(),
			this.loadLegs(),
			this.loadFeet(),
			this.loadCharms(),
			this.loadDecorations(),
			this.loadSetBonuses(),
			this.loadSkills()
		];

		return Promise.all(items).then<boolean>(() => {
			this.seedData.weapons = _.orderBy(this.seedData.weapons, ['weaponType', 'asc']);
			this.seedData.armor = _.orderBy(this.seedData.armor, ['itemType', 'asc']);
			return true;
		});
	}

	loadWeaponModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<WeaponModifierModel[]>('../assets/weapon-modifiers.json').subscribe(items => {
				this.seedData.weaponModifiers = this.seedData.weaponModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadSharpnessModifiers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SharpnessModifierModel[]>('../assets/sharpness-modifiers.json').subscribe(items => {
				this.seedData.sharpnessModifiers = this.seedData.sharpnessModifiers.concat(items);
				resolve(true);
			});
		});
	}

	loadGreatSwords(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/great-swords.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadLongSwords(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/long-swords.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadSwordAndShields(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/sword-and-shields.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadDualBlades(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/dual-blades.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadHammers(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/hammers.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadHuntingHorns(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/hunting-horns.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadLances(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/lances.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadGunlances(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/gunlances.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadSwitchAxes(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/switch-axes.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadChargeBlades(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/charge-blades.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadInsectGlaives(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/insect-glaives.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadLightBowguns(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/light-bowguns.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadHeavyBowguns(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/heavy-bowguns.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadBows(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/bows.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Weapon;
					// item.id = this.seedData.weapons.length;
					this.seedData.weapons.push(item);
				});

				resolve(true);
			});
		});
	}

	loadHeads(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/heads.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadChests(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/chests.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadHands(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/hands.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadLegs(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/legs.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadFeet(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/feet.json').subscribe(items => {
				_.each(items, item => {
					item.equipmentCategory = EquipmentCategoryType.Armor;
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadCharms(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<ItemModel[]>('../assets/charms.json').subscribe(items => {
				_.each(items, item => {
					// item.id = this.seedData.armor.length;
					this.seedData.armor.push(item);
				});
				resolve(true);
			});
		});
	}

	loadDecorations(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<DecorationModel[]>('../assets/decorations.json').subscribe(items => {
				_.each(items, item => {
					// item.id = this.seedData.decorations.length;
					this.seedData.decorations.push(item);
				});
				resolve(true);
			});
		});
	}

	loadSetBonuses(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SetBonusModel[]>('../assets/set-bonuses.json').subscribe(items => {
				this.seedData.setBonuses = this.seedData.setBonuses.concat(items);
				resolve(true);
			});
		});
	}

	loadSkills(): Promise<boolean> {
		return new Promise(resolve => {
			this.http.get<SkillModel[]>('../assets/skills.json').subscribe(items => {
				this.seedData.skills = this.seedData.skills.concat(items);
				resolve(true);
			});
		});
	}
}
