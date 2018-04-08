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

@Injectable()
export class SlotService {
	public itemSelected$ = new Subject<SlotEventModel<ItemSlotComponent, ItemModel>>();
	public decorationSelected$ = new Subject<SlotEventModel<DecorationSlotComponent, DecorationModel>>();
	public augmentationSelected$ = new Subject<SlotEventModel<AugmentationSlotComponent, AugmentationModel>>();
	public itemLevelChanged$ = new Subject();

	itemSlot: ItemSlotComponent;
	decorationSlot: DecorationSlotComponent;
	augmentationSlot: AugmentationSlotComponent;

	constructor(
		private equipmentService: EquipmentService
	) { }

	selectItemSlot(slot: ItemSlotComponent) {
		this.clearSlots();
		this.itemSlot = slot;
		if (this.itemSlot) {
			this.itemSlot.selected = true;
		}
	}

	selectDecorationSlot(slot: DecorationSlotComponent) {
		this.clearSlots();
		this.decorationSlot = slot;
		if (this.decorationSlot) {
			this.decorationSlot.selected = true;
		}
	}

	selectAugmentationSlot(slot: AugmentationSlotComponent) {
		this.clearSlots();
		this.augmentationSlot = slot;
		if (this.augmentationSlot) {
			this.augmentationSlot.selected = true;
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
		slot.augmentation = null;
		this.augmentationSelected$.next({ slot: slot, equipment: null });
	}

	selectItem(item: ItemModel) {
		if (this.itemSlot) {
			this.clearSlotItems(this.itemSlot);

			if (!item.equippedLevel && item.itemType == ItemType.Charm) {
				item.equippedLevel = 1;
			}

			this.equipmentService.addItem(item);
			this.itemSlot.item = item;
			this.itemSelected$.next({ slot: this.itemSlot, equipment: item });

			if (item.rarity == 6) {
				this.itemSlot.augmentations = [
					new AugmentationModel(),
					new AugmentationModel(),
					new AugmentationModel()
				];
			} else if (item.rarity == 7) {
				this.itemSlot.augmentations = [
					new AugmentationModel(),
					new AugmentationModel()
				];
			} else if (item.rarity == 8) {
				this.itemSlot.augmentations = [
					new AugmentationModel()
				];
			} else {
				this.itemSlot.augmentations = [];
			}
		}
	}

	selectDecoration(decoration: DecorationModel) {
		if (this.decorationSlot) {
			if (this.decorationSlot.decoration) {
				this.equipmentService.removeDecoration(this.decorationSlot.decoration);
			}

			decoration.itemId = this.decorationSlot.itemId;
			this.equipmentService.addDecoration(decoration);
			this.decorationSlot.decoration = decoration;
			this.decorationSelected$.next({ slot: this.decorationSlot, equipment: decoration });
		}
	}

	selectAugmentation(augmentation: AugmentationModel) {
		if (this.augmentationSlot) {
			if (this.augmentationSlot.augmentation) {
				this.equipmentService.removeAugmentation(this.augmentationSlot.augmentation);
			}

			this.equipmentService.addAugmentation(augmentation);
			this.augmentationSlot.augmentation = augmentation;
			this.augmentationSelected$.next({ slot: this.augmentationSlot, equipment: augmentation });
		}
	}

	updateItemLevel() {
		this.itemLevelChanged$.next();
		this.equipmentService.updateItemLevel();
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
		if (this.itemSlot) {
			this.itemSlot.selected = false;
		}

		if (this.decorationSlot) {
			this.decorationSlot.selected = false;
		}

		if (this.augmentationSlot) {
			this.augmentationSlot.selected = false;
		}

		this.itemSlot = null;
		this.decorationSlot = null;
		this.augmentationSlot = null;
	}
}
