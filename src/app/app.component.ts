import { Component, ViewChild } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';

import * as _ from 'lodash';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	public itemTypes = ItemType;
	title = 'MHW Builder';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;

	selectedSlot: ItemSlotComponent;
	equippedItems = new Array<ItemModel>();

	selectItem(selectedItem: ItemModel) {
		if (this.selectedSlot) {
			this.selectedSlot.item = selectedItem;

			this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
				return item.itemType == selectedItem.itemType;
			});

			this.equippedItems.push(selectedItem);
			this.equippedStatsComponent.update(this.equippedItems);
			this.equippedSkillsComponent.update(this.equippedItems);
		}
	}

	slotSelected(item: ItemSlotComponent) {
		this.selectedSlot = item;
	}
}
