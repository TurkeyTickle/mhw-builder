import { Injectable } from '@angular/core';
import { ItemSlotComponent } from '../components/item-slot/item-slot.component';
import { DecorationSlotComponent } from '../components/decoration-slot/decoration-slot.component';
import { AugmentationSlotComponent } from '../components/augmentation-slot/augmentation-slot.component';
import { ItemModel } from '../models/item.model';
import { DecorationModel } from '../models/decoration.model';
import { AugmentationModel } from '../models/augmentation.model';
import { EquipmentService } from './equipment.service';
import { Subject } from 'rxjs/Subject';
import { SlotEventModel } from '../models/slot-event.model';
import { ItemType } from '../types/item.type';
import * as _ from 'lodash';

@Injectable()
export class SlotService {
	public itemSelected$ = new Subject<SlotEventModel<ItemSlotComponent, ItemModel>>();
	public decorationSelected$ = new Subject<SlotEventModel<DecorationSlotComponent, DecorationModel>>();
	public augmentationSelected$ = new Subject<SlotEventModel<AugmentationSlotComponent, AugmentationModel>>();
	public itemLevelChanged$ = new Subject();

	weaponSlot: ItemSlotComponent;
	headSlot: ItemSlotComponent;
	chestSlot: ItemSlotComponent;
	handsSlot: ItemSlotComponent;
	legsSlot: ItemSlotComponent;
	feetSlot: ItemSlotComponent;
	charmSlot: ItemSlotComponent;

	selectedItemSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	selectedAugmentationSlot: AugmentationSlotComponent;

	constructor(
		private equipmentService: EquipmentService
	) { }

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

	selectItemSlot(slot: ItemSlotComponent) {
		this.clearSlots();
		this.selectedItemSlot = slot;
		if (this.selectedItemSlot) {
			this.selectedItemSlot.selected = true;
		}
	}

	selectDecorationSlot(slot: DecorationSlotComponent) {
		this.clearSlots();
		this.selectedDecorationSlot = slot;
		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.selected = true;
		}
	}

	selectAugmentationSlot(slot: AugmentationSlotComponent) {
		this.clearSlots();
		this.selectedAugmentationSlot = slot;
		if (this.selectedAugmentationSlot) {
			this.selectedAugmentationSlot.selected = true;
		}
	}

	clearItemSlot(slot: ItemSlotComponent) {
		this.clearSlotItems(slot);

		slot.item = null;
		slot.augmentations = [];
		this.itemSelected$.next({ slot: slot, equipment: null });
	}

	clearDecorationSlot(slot: DecorationSlotComponent) {
		this.equipmentService.removeDecoration(slot.decoration);
		slot.decoration = null;
		this.decorationSelected$.next({ slot: slot, equipment: null });
	}

	clearAugmentationSlot(slot: AugmentationSlotComponent) {
		this.equipmentService.removeAugmentation(slot.augmentation);
		this.applySlotAugmentation();
		slot.augmentation = null;
		this.augmentationSelected$.next({ slot: slot, equipment: null });
	}

	selectItem(item: ItemModel) {
		if (this.selectedItemSlot) {
			this.clearSlotItems(this.selectedItemSlot);

			if (!item.equippedLevel && item.itemType == ItemType.Charm) {
				item.equippedLevel = 1;
			}

			this.equipmentService.addItem(item);
			this.selectedItemSlot.item = item;
			this.itemSelected$.next({ slot: this.selectedItemSlot, equipment: item });

			if (item.rarity == 6) {
				this.selectedItemSlot.augmentations = [
					new AugmentationModel(),
					new AugmentationModel(),
					new AugmentationModel()
				];
			} else if (item.rarity == 7) {
				this.selectedItemSlot.augmentations = [
					new AugmentationModel(),
					new AugmentationModel()
				];
			} else if (item.rarity == 8) {
				this.selectedItemSlot.augmentations = [
					new AugmentationModel()
				];
			} else {
				this.selectedItemSlot.augmentations = [];
			}
		}
	}

	selectDecoration(decoration: DecorationModel) {
		if (this.selectedDecorationSlot) {
			if (this.selectedDecorationSlot.decoration) {
				this.equipmentService.removeDecoration(this.selectedDecorationSlot.decoration);
			}

			decoration.itemId = this.selectedDecorationSlot.itemId;
			this.equipmentService.addDecoration(decoration);
			this.selectedDecorationSlot.decoration = decoration;
			this.decorationSelected$.next({ slot: this.selectedDecorationSlot, equipment: decoration });
		}
	}

	selectAugmentation(augmentation: AugmentationModel) {
		if (this.selectedAugmentationSlot) {
			if (this.selectedAugmentationSlot.augmentation) {
				this.equipmentService.removeAugmentation(this.selectedAugmentationSlot.augmentation);
			}

			this.equipmentService.addAugmentation(augmentation);
			this.applySlotAugmentation();
			this.selectedAugmentationSlot.augmentation = augmentation;
			this.augmentationSelected$.next({ slot: this.selectedAugmentationSlot, equipment: augmentation });
		}
	}

	updateItemLevel() {
		this.itemLevelChanged$.next();
		this.equipmentService.updateItemLevel();
	}

	private applySlotAugmentation() {
		const slotAugs = _.filter(this.equipmentService.augmentations, aug => aug.id == 4);

		if (slotAugs && slotAugs.length) {
			const augDecorationSlot = _.find(this.weaponSlot.item.slots, slot => slot.augmentation);
			if (augDecorationSlot) {
				augDecorationSlot.level = slotAugs[0].levels[slotAugs.length - 1].slotLevel;
			} else {
				this.weaponSlot.item.slots.push({ level: slotAugs[0].levels[slotAugs.length - 1].slotLevel, augmentation: true });
			}
		} else {
			this.weaponSlot.item.slots = _.reject(this.weaponSlot.item.slots, aug => aug.augmentation);
		}
	}

	private clearSlotItems(slot: ItemSlotComponent) {
		this.equipmentService.removeItem(slot.item);

		slot.decorationSlots.forEach(ds => {
			this.equipmentService.removeDecoration(ds.decoration);
		});

		slot.augmentationSlots.forEach(as => {
			this.equipmentService.removeAugmentation(as.augmentation);
		});
	}

	private clearSlots() {
		if (this.selectedItemSlot) {
			this.selectedItemSlot.selected = false;
		}

		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.selected = false;
		}

		if (this.selectedAugmentationSlot) {
			this.selectedAugmentationSlot.selected = false;
		}

		this.selectedItemSlot = null;
		this.selectedDecorationSlot = null;
		this.selectedAugmentationSlot = null;
	}
}
