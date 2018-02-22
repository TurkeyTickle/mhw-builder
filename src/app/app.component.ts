import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';

import * as _ from 'lodash';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { DecorationModel } from './models/decoration.model';
import { TooltipService } from './services/tooltip.service';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	public itemTypes = ItemType;
	title = 'MHW Builder';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;
	@ViewChild(ItemStatsComponent) itemStatsComponent: ItemStatsComponent;
	@ViewChild('itemStats') itemStatsContainer: ElementRef;

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	equippedItems = new Array<ItemModel>();
	equippedDecorations = new Array<DecorationModel>();

	constructor(
		private tooltipService: TooltipService,
		private renderer: Renderer
	) { }

	ngOnInit() {
		this.tooltipService.subject.subscribe(item => {
			if (!item) {
				this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'display', 'none');
			} else {
				this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'display', 'block');
				this.itemStatsComponent.setItem(item);
			}
		});
	}

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

	itemCleared(clearedItem: ItemModel) {
		this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
			return item === clearedItem;
		});

		this.equippedStatsComponent.update(this.equippedItems);
		this.equippedSkillsComponent.update(this.equippedItems);
	}

	equipmentSlotSelected(equipmentSlot: ItemSlotComponent) {
		this.selectedDecorationSlot = null;
		this.selectedEquipmentSlot = equipmentSlot;
	}

	decorationSlotSelected(decorationSlot: DecorationSlotComponent) {
		this.selectedEquipmentSlot = null;
		this.selectedDecorationSlot = decorationSlot;
	}

	moveTooltip(event: MouseEvent) {
		this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'left', event.clientX + 40 + 'px');
		this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'top', event.clientY + 40 + 'px');
	}
}
