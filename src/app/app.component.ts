import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent, ItemSlotClearModel } from './components/item-slot/item-slot.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';

import * as _ from 'lodash';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { DecorationModel } from './models/decoration.model';
import { TooltipService } from './services/tooltip.service';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';
import { SkillService } from './services/skill.service';

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
		private skillService: SkillService,
		private renderer: Renderer2
	) { }

	ngOnInit() {
		this.tooltipService.subject.subscribe((thing: ItemModel | DecorationModel) => {
			if (!thing) {
				this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'display', 'none');
			} else {
				this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'display', 'block');
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
			this.updateStatsAndSkills();
		}
	}

	selectDecoration(selectedDecoration: DecorationModel) {
		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.decoration = selectedDecoration;

			this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
				return decoration === selectedDecoration;
			});

			this.equippedDecorations.push(selectedDecoration);
			this.updateStatsAndSkills();
		}
	}

	itemLevelChanged(item: ItemModel) {
		this.updateStatsAndSkills();
	}

	itemCleared(clear: ItemSlotClearModel) {
		this.equippedItems = _.reject(this.equippedItems, (item: ItemModel) => {
			return item === clear.item;
		});

		if (clear.decorations) {
			// TODO: this causes the equipped skills component to update more than it needs to - fix it.
			for (const decoration of clear.decorations) {
				this.decorationCleared(decoration);
			}
		}

		this.updateStatsAndSkills();
	}

	decorationCleared(clearedDecoration: DecorationModel) {
		this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
			return decoration === clearedDecoration;
		});

		this.updateStatsAndSkills();
	}

	private updateStatsAndSkills() {
		this.skillService.updateSkills(this.equippedItems, this.equippedDecorations);
		this.equippedStatsComponent.update(this.equippedItems);
		this.equippedSkillsComponent.update();
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

		this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'left', newLeft + 'px');
		this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'top', newTop + 'px');
	}
}
