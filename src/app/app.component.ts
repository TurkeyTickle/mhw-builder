import { Component, ViewChild } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';

import * as _ from 'lodash';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { DecorationModel } from './models/decoration.model';

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

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	equippedItems = new Array<ItemModel>();
	equippedDecorations = new Array<DecorationModel>();

	selectItem(selectedItem: ItemModel) {
		if (this.selectedEquipmentSlot) {
			this.selectedEquipmentSlot.item = selectedItem;

			this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
				return item.itemType == selectedItem.itemType;
			});

			this.equippedItems.push(selectedItem);
			this.equippedStatsComponent.update(this.equippedItems);
			this.equippedSkillsComponent.update(this.equippedItems);
		}
	}

	selectDecoration(selectedDecoration: DecorationModel) {
		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.decoration = selectedDecoration;

			// this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
			// 	return decoration.
			// });

			this.equippedDecorations.push(selectedDecoration);
		}
	}

	equipmentSlotSelected(equipmentSlot: ItemSlotComponent) {
		this.selectedDecorationSlot = null;
		this.selectedEquipmentSlot = equipmentSlot;
	}

	decorationSlotSelected(decorationSlot: DecorationSlotComponent) {
		this.selectedEquipmentSlot = null;
		this.selectedDecorationSlot = decorationSlot;
	}
}
