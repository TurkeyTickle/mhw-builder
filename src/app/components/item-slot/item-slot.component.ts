import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemType } from '../../types/item.type';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';

@Component({
	selector: 'mhw-builder-item-slot',
	templateUrl: './item-slot.component.html',
	styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {
	@Input() slotName: ItemType;
	@Output() equipmentSlotSelected = new EventEmitter<ItemSlotComponent>();
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();

	public item: ItemModel;

	constructor(
	) { }

	ngOnInit() {
	}

	equipmentSlotClicked() {
		this.equipmentSlotSelected.emit(this);
	}

	decorationSlotClicked(decorationSlot: DecorationSlotComponent) {
		this.decorationSlotSelected.emit(decorationSlot);
	}
}
