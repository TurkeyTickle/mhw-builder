import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ItemSlotComponent } from '../components/item-slot/item-slot.component';
import { DataService } from './data.service';
import { ItemModel } from '../models/item.model';
import { ItemType } from '../types/item.type';
import { SlotService } from './slot.service';
import { EquipmentService } from './equipment.service';
import { Subject } from 'rxjs/Subject';
import { EquipmentCategoryType } from '../types/equipment-category.type';

import * as _ from 'lodash';

@Injectable()
export class BuildService {
	public buildIdUpdated$ = new Subject<string>();

	weaponSlot: ItemSlotComponent;
	headSlot: ItemSlotComponent;
	chestSlot: ItemSlotComponent;
	handsSlot: ItemSlotComponent;
	legsSlot: ItemSlotComponent;
	feetSlot: ItemSlotComponent;
	charmSlot: ItemSlotComponent;

	private changeDetector: ChangeDetectorRef;
	private loadingBuild = false;

	constructor(
		private dataService: DataService,
		private slotService: SlotService,
		private equipmentService: EquipmentService
	) { }

	initialize(
		weaponSlot: ItemSlotComponent,
		headSlot: ItemSlotComponent,
		chestSlot: ItemSlotComponent,
		handsSlot: ItemSlotComponent,
		legsSlot: ItemSlotComponent,
		feetSlot: ItemSlotComponent,
		charmSlot: ItemSlotComponent,
		changeDetector: ChangeDetectorRef
	) {
		this.weaponSlot = weaponSlot;
		this.headSlot = headSlot;
		this.chestSlot = chestSlot;
		this.handsSlot = handsSlot;
		this.legsSlot = legsSlot;
		this.feetSlot = feetSlot;
		this.charmSlot = charmSlot;

		// TODO: Passing in change detector feels gross, but at the moment it's needed to set up decoration slots when an item is loaded by build id.
		this.changeDetector = changeDetector;

		this.subscribeSlotEvents();
	}

	private subscribeSlotEvents() {
		this.slotService.itemSelected$.subscribe(() => {
			if (!this.loadingBuild) { this.updateBuildId(); }
		});

		this.slotService.decorationSelected$.subscribe(() => {
			if (!this.loadingBuild) { this.updateBuildId(); }
		});

		this.slotService.augmentationSelected$.subscribe(() => {
			if (!this.loadingBuild) { this.updateBuildId(); }
		});

		this.slotService.itemLevelChanged$.subscribe(() => {
			if (!this.loadingBuild) { this.updateBuildId(); }
		});
	}

	loadBuild(buildId: string) {
		this.loadingBuild = true;

		const itemHashes = buildId.split('i');

		// build string format version number is hash[0]

		this.loadBuildSlot(itemHashes[1], this.weaponSlot);
		this.loadBuildSlot(itemHashes[2], this.headSlot);
		this.loadBuildSlot(itemHashes[3], this.chestSlot);
		this.loadBuildSlot(itemHashes[4], this.handsSlot);
		this.loadBuildSlot(itemHashes[5], this.legsSlot);
		this.loadBuildSlot(itemHashes[6], this.feetSlot);
		this.loadBuildSlot(itemHashes[7], this.charmSlot);

		this.slotService.selectItemSlot(null);

		this.loadingBuild = false;
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

	private updateBuildId() {
		const weapon = this.equipmentService.items.find(item => item.equipmentCategory == EquipmentCategoryType.Weapon);
		const head = this.equipmentService.items.find(item => item.itemType == ItemType.Head);
		const chest = this.equipmentService.items.find(item => item.itemType == ItemType.Chest);
		const hands = this.equipmentService.items.find(item => item.itemType == ItemType.Hands);
		const legs = this.equipmentService.items.find(item => item.itemType == ItemType.Legs);
		const feet = this.equipmentService.items.find(item => item.itemType == ItemType.Feet);
		const charm = this.equipmentService.items.find(item => item.itemType == ItemType.Charm);

		let buildId = 'v1';

		buildId += this.getItemBuildString(weapon);
		buildId += this.getItemBuildString(head);
		buildId += this.getItemBuildString(chest);
		buildId += this.getItemBuildString(hands);
		buildId += this.getItemBuildString(legs);
		buildId += this.getItemBuildString(feet);
		buildId += this.getItemBuildString(charm);

		this.buildIdUpdated$.next(buildId);
	}

	private getItemBuildString(item: ItemModel): string {
		let result = 'i';

		if (item) {
			result += item.id.toString();

			if (item.equippedLevel) {
				result += `l${item.equippedLevel}`;
			}

			if (item.slots) {
				let decorations = _.filter(this.equipmentService.decorations, d => d.itemId === item.id);
				for (let i = 0; i < item.slots.length; i++) {
					result += 'd';
					const slot = item.slots[i];
					const decoration = _.find(decorations, d => d.itemId == item.id && d.level <= slot.level);
					decorations = _.without(decorations, decoration);
					if (decoration) {
						result += `${decoration.id.toString()}`;
					}
				}
			}
		}

		return result;
	}
}
