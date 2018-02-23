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
		this.tooltipService.subject.subscribe((thing: ItemModel | DecorationModel) => {
			if (!thing) {
				this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'display', 'none');
			} else {
				this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'display', 'block');
				this.itemStatsComponent.setItem(thing);
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
			this.equippedStatsComponent.updateItems(this.equippedItems);
			this.equippedSkillsComponent.updateItems(this.equippedItems);
		}
	}

	selectDecoration(selectedDecoration: DecorationModel) {
		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.decoration = selectedDecoration;

			this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
				return decoration.id == selectedDecoration.id;
			});

			this.equippedDecorations.push(selectedDecoration);
			this.equippedSkillsComponent.updateItems(this.equippedItems);
		}
	}

	itemCleared(clearedItem: ItemModel) {
		this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
			return item == clearedItem;
		});

		this.equippedStatsComponent.updateItems(this.equippedItems);
		this.equippedSkillsComponent.updateItems(this.equippedItems);
	}

	decorationCleared(clearedDecoration: DecorationModel) {
		this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
			return decoration.id == clearedDecoration.id;
		});

		this.equippedSkillsComponent.updateDecorations(this.equippedDecorations);
	}

	itemSlotSelected(equipmentSlot: ItemSlotComponent) {
		this.selectedDecorationSlot = null;
		this.selectedEquipmentSlot = equipmentSlot;
	}

	decorationSlotSelected(decorationSlot: DecorationSlotComponent) {
		this.selectedEquipmentSlot = null;
		this.selectedDecorationSlot = decorationSlot;
	}

	moveTooltip(event: MouseEvent) {
		let newTop = event.clientY + 40;
		let newLeft = event.clientX + 40;

		if (window.innerHeight < newTop + this.itemStatsContainer.nativeElement.scrollHeight) {
			newTop = window.innerHeight - this.itemStatsContainer.nativeElement.scrollHeight;
		}

		if (window.innerWidth < newLeft + this.itemStatsContainer.nativeElement.scrollWidth) {
			newLeft = window.innerWidth - this.itemStatsContainer.nativeElement.scrollWidth;
		}

		this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'left', newLeft + 'px');
		this.renderer.setElementStyle(this.itemStatsContainer.nativeElement, 'top', newTop + 'px');
	}
}
