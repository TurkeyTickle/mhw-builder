import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChangeModel } from '../../models/change.model';
import { DecorationModel } from '../../models/decoration.model';
import { ItemModel } from '../../models/item.model';
import { TooltipService } from '../../services/tooltip.service';

@Component({
	selector: 'mhw-builder-decoration-slot',
	templateUrl: './decoration-slot.component.html',
	styleUrls: ['./decoration-slot.component.scss'],
})
export class DecorationSlotComponent implements OnInit {
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();
	@Output() decorationSet = new EventEmitter<ChangeModel<DecorationModel>>();
	// @Output() cleared = new EventEmitter();

	@Input() item: ItemModel;
	@Input() level: number;

	private _decoration: DecorationModel;
	@Input()
	public set decoration(decoration: DecorationModel) {
		this.decorationSet.emit({ old: this._decoration, new: decoration});
		this._decoration = decoration;
	}
	public get decoration() { return this._decoration; }

	public selected: boolean;

	constructor(
		private tooltipService: TooltipService
	) { }

	ngOnInit() { }

	clearClicked() {
		this.clearTooltipItem();
		this.decoration = null;
	}

	clicked() {
		this.decorationSlotSelected.emit(this);
	}

	setTooltipItem() {
		this.tooltipService.setItem(this.decoration);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}
