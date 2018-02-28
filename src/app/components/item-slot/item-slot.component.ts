import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { ItemType } from '../../types/item.type';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';
import { TooltipService } from '../../services/tooltip.service';
import { DecorationModel } from '../../models/decoration.model';

import * as _ from 'lodash';
import { ChangeModel } from '../../models/change.model';

@Component({
	selector: 'mhw-builder-item-slot',
	templateUrl: './item-slot.component.html',
	styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {
	@Input() slotName: ItemType;

	@Output() equipmentSlotSelected = new EventEmitter<ItemSlotComponent>();
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();
	@Output() levelChanged = new EventEmitter<ItemModel>();
	@Output() itemCleared = new EventEmitter<ItemSlotClearModel>();
	@Output() decorationCleared = new EventEmitter<DecorationModel>();

	private _item: ItemModel;
	set item(item: ItemModel) {
		if (item && item.levels) {
			item.equippedLevel = 1;
		}
		this._item = item;
	}
	get item() {
		return this._item;
	}

	public decorations = new Array<DecorationModel>();
	public selected: boolean;

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

	decorationSet(decorationChange: ChangeModel<DecorationModel>) {
		if (decorationChange.old) {
			this.decorations = _.reject(this.decorations, decoration => decoration === decorationChange.old);
			this.tooltipService.setItem(null);
			this.decorationCleared.emit(decorationChange.old);
		}

		if (decorationChange.new) {
			this.decorations.push(decorationChange.new);
		}
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

	equipmentClearClicked() {
		const model: ItemSlotClearModel = {
			item: this.item,
			decorations: this.decorations
		};

		this.itemCleared.emit(model);
		this.tooltipService.setItem(null);
		this.item = null;
		this.decorations = new Array<DecorationModel>();
	}

	// decorationClearClicked(decoration: DecorationClearModel) {
	// 	this.decorationCleared.emit(decoration);
	// 	this.tooltipService.setItem(null);
	// 	this.decorations = _.reject(this.decorations, d => d === decoration);
	// }

	setTooltipItem() {
		this.tooltipService.setItem(this.item);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}

export class ItemSlotClearModel {
	item: ItemModel;
	decorations: DecorationModel[];
}
