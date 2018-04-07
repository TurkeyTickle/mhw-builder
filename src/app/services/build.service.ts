import { Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { ItemSlotComponent } from '../components/item-slot/item-slot.component';
import { DataService } from './data.service';
import { ItemModel } from '../models/item.model';
import { ItemType } from '../types/item.type';
import { SlotService } from './slot.service';
import { EquipmentService } from './equipment.service';
import { Subject } from 'rxjs/Subject';
import { EquipmentCategoryType } from '../types/equipment-category.type';

@Injectable()
export class BuildService implements OnInit {
	public buildIdUpdated$ = new Subject<string>();

	weaponSlot: ItemSlotComponent;
	headSlot: ItemSlotComponent;
	chestSlot: ItemSlotComponent;
	handsSlot: ItemSlotComponent;
	legsSlot: ItemSlotComponent;
	feetSlot: ItemSlotComponent;
	charmSlot: ItemSlotComponent;

	constructor(
		private dataService: DataService,
		private slotService: SlotService,
		private equipmentService: EquipmentService,
		private changeDetector: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		// this.slotService.itemSelected$.subscribe(event => {
		// 	this.updateBuildId();
		// });

		// this.slotService.decorationSelected$.subscribe(event => {
		// 	this.updateBuildId();
		// });

		// this.slotService.augmentationSelected$.subscribe(event => {
		// 	this.updateBuildId();
		// });
	}

	initialize(
		weaponSlot: ItemSlotComponent,
		headSlot: ItemSlotComponent,
		chestSlot: ItemSlotComponent,
		handsSlot: ItemSlotComponent,
		legsSlot: ItemSlotComponent,
		feetSlot: ItemSlotComponent,
		charmSlot: ItemSlotComponent
	) {
		this.weaponSlot = weaponSlot;
		this.headSlot = headSlot;
		this.chestSlot = chestSlot;
		this.handsSlot = handsSlot;
		this.legsSlot = legsSlot;
		this.feetSlot = feetSlot;
		this.charmSlot = charmSlot;
	}

	loadBuild(buildId: string) {
		const itemHashes = buildId.split('i');

		// version number is hash sub 0

		this.loadBuildSlot(itemHashes[1], this.weaponSlot);
		this.loadBuildSlot(itemHashes[2], this.headSlot);
		this.loadBuildSlot(itemHashes[3], this.chestSlot);
		this.loadBuildSlot(itemHashes[4], this.handsSlot);
		this.loadBuildSlot(itemHashes[5], this.legsSlot);
		this.loadBuildSlot(itemHashes[6], this.feetSlot);
		this.loadBuildSlot(itemHashes[7], this.charmSlot);
	}

	private loadBuildSlot(itemHash: string, slot: ItemSlotComponent) {
		if (itemHash) {
			const decorationParts = itemHash.split('d');
			const itemParts = itemHash.split('l');
			const itemId = parseInt(itemParts[0], 10);

			if (itemId) {
				let item: ItemModel;
				if (slot.slotName == ItemType.Weapon) {
					item = this.dataService.getWeapon(itemId);
				} else {
					item = this.dataService.getArmor(itemId);
				}

				if (itemParts.length > 1) {
					const level = parseInt(itemParts[1], 10);
					item.equippedLevel = level;
				}

				if (item) {
					this.slotService.selectItemSlot(slot);
					this.slotService.selectItem(item);

					this.changeDetector.detectChanges();

					for (let i = 1; i < decorationParts.length; i++) {
						const decorationId = parseInt(decorationParts[i], 10);
						if (decorationId) {
							const decoration = this.dataService.getDecoration(decorationId);
							if (decoration) {
								this.slotService.selectDecorationSlot(slot.decorationSlots.toArray()[i - 1]);
								const newDecoration = Object.assign({}, decoration);
								this.slotService.selectDecoration(newDecoration);
							}
						}
					}
				}
			}
		}
	}

	// loadBuild(buildId: string) {
	// 	const slotHashes = buildId.split('i');

	// 	this.loadBuildSlot(slotHashes[1], this.weaponSlot);
	// 	this.loadBuildSlot(slotHashes[2], this.headSlot);
	// 	this.loadBuildSlot(slotHashes[3], this.chestSlot);
	// 	this.loadBuildSlot(slotHashes[4], this.handsSlot);
	// 	this.loadBuildSlot(slotHashes[5], this.legsSlot);
	// 	this.loadBuildSlot(slotHashes[6], this.feetSlot);
	// 	this.loadBuildSlot(slotHashes[7], this.charmSlot);
	// }

	// private loadBuildSlot(slotHash: string, slot: ItemSlotComponent) {
	// 	if (slotHash) {
	// 		const slotParts = slotHash.split('d');
	// 		const itemParts = slotParts[0].split('l');
	// 		const equipmentId = parseInt(itemParts[0], 10);
	// 		if (equipmentId != null) {
	// 			let equipment: ItemModel;
	// 			if (slot.slotName == ItemType.Weapon) {
	// 				equipment = this.dataService.getWeapon(equipmentId);
	// 			} else {
	// 				equipment = this.dataService.getArmorById(equipmentId);
	// 			}

	// 			if (itemParts.length > 1) {
	// 				const level = parseInt(itemParts[1], 10);
	// 				equipment.equippedLevel = level;
	// 			}

	// 			if (equipment) {
	// 				this.equippedItems.push(equipment);
	// 				slot.item = equipment;

	// 				this.changeDetector.detectChanges();

	// 				for (let i = 1; i < slotParts.length; i++) {
	// 					const decorationId = parseInt(slotParts[i], 10);
	// 					if (decorationId) {
	// 						const decoration = this.dataService.getDecoration(decorationId);
	// 						if (decoration) {
	// 							const newDecoration = Object.assign({}, decoration);
	// 							slot.decorationSlots.toArray()[i - 1].decoration = newDecoration;
	// 							newDecoration.equipmentId = equipment.id;
	// 							this.equippedDecorations.push(newDecoration);
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// private updateBuildId() {
	// 	const weapon = this.equipmentService.items.find(item => item.equipmentCategory == EquipmentCategoryType.Weapon);
	// 	const head = this.equipmentService.items.find(item => item.itemType == ItemType.Head);
	// 	const chest = this.equipmentService.items.find(item => item.itemType == ItemType.Chest);
	// 	const hands = this.equipmentService.items.find(item => item.itemType == ItemType.Hands);
	// 	const legs = this.equipmentService.items.find(item => item.itemType == ItemType.Legs);
	// 	const feet = this.equipmentService.items.find(item => item.itemType == ItemType.Feet);
	// 	const charm = this.equipmentService.items.find(item => item.itemType == ItemType.Charm);

	// 	let buildId = 'v1';

	// 	buildId += this.getItemBuildString(weapon);
	// 	buildId += this.getItemBuildString(head);
	// 	buildId += this.getItemBuildString(chest);
	// 	buildId += this.getItemBuildString(hands);
	// 	buildId += this.getItemBuildString(legs);
	// 	buildId += this.getItemBuildString(feet);
	// 	buildId += this.getItemBuildString(charm);

	// 	this.buildIdUpdated$.next(buildId);

	// 	// this.location.replaceState(this.location.path(false), '#' + this.buildId);
	// }

	// private getItemBuildString(item: ItemModel): string {
	// 	let result = 'i';

	// 	if (item) {
	// 		result += item.id.toString();

	// 		if (item.equippedLevel) {
	// 			result += `l${item.equippedLevel}`;
	// 		}

	// 		if (item.slots) {
	// 			let decorations = _.filter(this.equippedDecorations, d => d.equipmentId === item.id);
	// 			for (let i = 0; i < item.slots.length; i++) {
	// 				result += 'd';
	// 				const slot = item.slots[i];
	// 				const decoration = _.find(decorations, d => d.equipmentId == item.id && d.level <= slot.level);
	// 				decorations = _.without(decorations, decoration);
	// 				if (decoration) {
	// 					result += `${decoration.id.toString()}`;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return result;
	// }
}
