import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { DecorationModel } from '../../models/decoration.model';
import { ItemModel } from '../../models/item.model';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';
import { AugmentationSlotComponent } from '../augmentation-slot/augmentation-slot.component';
import { AugmentationModel } from '../../models/augmentation.model';
import { SlotService } from '../../services/slot.service';

@Component({
	selector: 'mhw-builder-item-slot',
	templateUrl: './item-slot.component.html',
	styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {
	@Input() slotName: ItemType;

	@Output() levelChanged = new EventEmitter<ItemModel>();

	@ViewChildren(DecorationSlotComponent) decorationSlots: QueryList<DecorationSlotComponent>;
	@ViewChildren(AugmentationSlotComponent) augmentationSlots: QueryList<AugmentationSlotComponent>;

	item: ItemModel;

	public decorations = new Array<DecorationModel>();
	public augmentations = new Array<AugmentationModel>();
	public selected: boolean;

	constructor(
		private slotService: SlotService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() { }

	equipmentSlotClicked() {
		this.slotService.setItemSlot(this);
	}

	levelDownClicked() {
		if (this.item.equippedLevel > 1) {
			this.item.equippedLevel--;
			this.levelChanged.emit(this.item);
		}
	}

	levelUpClicked() {
		if (this.item.equippedLevel < this.item.levels) {
			this.item.equippedLevel++;
			this.levelChanged.emit(this.item);
		}
	}

	equipmentClearClicked(event: Event) {
		event.stopPropagation();
		this.slotService.clearItemSlot(this);
		this.clearTooltipItem();
	}

	setTooltipItem() {
		this.tooltipService.setItem(this.item);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}
