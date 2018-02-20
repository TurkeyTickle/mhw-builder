import { Component, Query, ViewChild } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';

import * as _ from 'lodash';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	public itemTypes = ItemType;
	title = 'MHW Builder';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;

	selectedSlot: ItemSlotComponent;
	equippedItems = new Array<ItemModel>();

	selectItem(selectedItem: ItemModel) {
		if (this.selectedSlot) {
			this.selectedSlot.item = selectedItem;

			this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
				return item.itemType == selectedItem.itemType;
			});

			this.equippedItems.push(selectedItem);
			this.equippedStatsComponent.updateStats(this.equippedItems);
		}
	}

	slotSelected(item) {
		this.selectedSlot = item;
	}
}
