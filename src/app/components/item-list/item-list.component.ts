import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemType } from '../../types/item.type';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';
import { DecorationModel } from '../../models/decoration.model';
import { TooltipService } from '../../services/tooltip.service';

@Component({
	selector: 'mhw-builder-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
	private _itemType: ItemType;

	@Input()
	set itemType(itemType: ItemType) {
		this._itemType = itemType;
		this.loadItems();
	}
	get itemType(): ItemType { return this._itemType; }

	@Output() itemSelected = new EventEmitter<ItemModel>();
	@Output() decorationSelected = new EventEmitter<DecorationModel>();

	items: ItemModel[];
	decorations: DecorationModel[];

	constructor(
		private itemsService: ItemsService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
	}

	loadItems() {
		if (this.itemType == ItemType.Decoration) {
			this.decorations = this.itemsService.getDecorations();
		} else if (this.itemType == ItemType.Weapon) {
			this.items = this.itemsService.getWeapons();
		} else {
			this.items = this.itemsService.getArmor(this.itemType);
		}
	}

	selectItem(item: ItemModel) {
		this.itemSelected.emit(item);
	}

	selectDecoration(decoration: DecorationModel) {
		this.decorationSelected.emit(decoration);
	}

	setTooltipItem(item: ItemModel | DecorationModel) {
		this.tooltipService.setItem(item);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}
