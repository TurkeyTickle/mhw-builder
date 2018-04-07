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

@Injectable()
export class SlotService {
	public itemSelected$ = new Subject<SlotEventModel<ItemSlotComponent, ItemModel>>();
	public decorationSelected$ = new Subject<SlotEventModel<DecorationSlotComponent, DecorationModel>>();
	public augmentationSelected$ = new Subject<SlotEventModel<AugmentationSlotComponent, AugmentationModel>>();

	itemSlot: ItemSlotComponent;
	decorationSlot: DecorationSlotComponent;
	augmentationSlot: AugmentationSlotComponent;

	constructor(
		private equipmentService: EquipmentService
	) { }

	selectItemSlot(slot: ItemSlotComponent) {
		this.clearSlots();
		if (slot) {
			this.itemSlot = slot;
			this.itemSlot.selected = true;
		}
	}

	selectDecorationSlot(slot: DecorationSlotComponent) {
		this.clearSlots();
		if (slot) {
			this.decorationSlot = slot;
			this.decorationSlot.selected = true;
		}
	}

	selectAugmentationSlot(slot: AugmentationSlotComponent) {
		this.clearSlots();
		if (slot) {
			this.augmentationSlot = slot;
			this.augmentationSlot.selected = true;
		}
	}

	clearItemSlot(slot: ItemSlotComponent) {
		this.clearSlotItems(slot);

		slot.item = null;
		slot.augmentations = [];
	}

	clearDecorationSlot(slot: DecorationSlotComponent) {
		this.equipmentService.removeDecoration(slot.decoration);
		slot.decoration = null;
	}

	clearAugmentationSlot(slot: AugmentationSlotComponent) {
		this.equipmentService.removeAugmentation(slot.augmentation);
		slot.augmentation = null;
	}

	selectItem(item: ItemModel) {
		if (this.itemSlot) {
			this.clearSlotItems(this.itemSlot);

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
