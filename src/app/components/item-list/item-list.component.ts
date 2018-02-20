import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemType } from '../../types/item.type';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';

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

	items: ItemModel[];

	constructor(private itemsService: ItemsService) { }

	ngOnInit() {
	}

	loadItems() {
		this.items = this.itemsService.getItems(this.itemType);
	}

	selectItem(item: ItemModel) {
		this.itemSelected.emit(item);
	}
}
