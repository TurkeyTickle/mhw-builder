import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemType } from '../../types/item.type';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';
import { TooltipService } from '../../services/tooltip.service';
import { DecorationModel } from '../../models/decoration.model';

@Component({
	selector: 'mhw-builder-item-slot',
	templateUrl: './item-slot.component.html',
	styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {
	@Input() slotName: ItemType;
	@Output() equipmentSlotSelected = new EventEmitter<ItemSlotComponent>();
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();
	@Output() equipmentCleared = new EventEmitter<ItemModel>();
	@Output() decorationCleared = new EventEmitter<DecorationModel>();

	public item: ItemModel;

	constructor(
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
	}

	equipmentSlotClicked() {
		this.equipmentSlotSelected.emit(this);
	}

	decorationSlotClicked(decorationSlot: DecorationSlotComponent) {
		this.decorationSlotSelected.emit(decorationSlot);
	}

	equipmentClearClicked(event: Event) {
		event.preventDefault();
		this.equipmentCleared.emit(this.item);
		this.tooltipService.setItem(null);
		this.item = null;
	}

	decorationClearClicked(decoration: DecorationModel) {
		this.decorationCleared.emit(decoration);
		this.tooltipService.setItem(null);
	}

	setTooltipItem() {
		this.tooltipService.setItem(this.item);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}
