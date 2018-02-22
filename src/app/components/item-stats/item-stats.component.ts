import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item.model';

@Component({
	selector: 'mhw-builder-item-stats',
	templateUrl: './item-stats.component.html',
	styleUrls: ['./item-stats.component.scss']
})
export class ItemStatsComponent implements OnInit {
	constructor() { }

	item: ItemModel;

	ngOnInit() { }

	setItem(item: ItemModel) {
		this.item = item;
	}
}
