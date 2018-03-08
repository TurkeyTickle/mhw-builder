import { Component, ViewChild, ElementRef, OnInit, Renderer2, AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { ItemSlotComponent, ItemSlotClearModel } from './components/item-slot/item-slot.component';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { DecorationModel } from './models/decoration.model';
import { SkillService } from './services/skill.service';
import { TooltipService } from './services/tooltip.service';

import * as _ from 'lodash';
import { EquipmentCategoryType } from './types/equipment-category.type';
import { ItemsService } from './services/items.service';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
	public itemTypes = ItemType;
	title = 'MHW Builder';
	buildId = '';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;
	@ViewChild(ItemStatsComponent) itemStatsComponent: ItemStatsComponent;
	@ViewChild('equipmentItemList') equipmentItemListComponent: ItemListComponent;
	@ViewChild('decorationItemList') decorationItemListComponent: ItemListComponent;
	@ViewChild('itemStats') itemStatsContainer: ElementRef;
	@ViewChild('weaponSlot') weaponSlot: ItemSlotComponent;
	@ViewChild('headSlot') headSlot: ItemSlotComponent;
	@ViewChild('chestSlot') chestSlot: ItemSlotComponent;
	@ViewChild('handsSlot') handsSlot: ItemSlotComponent;
	@ViewChild('legsSlot') legsSlot: ItemSlotComponent;
	@ViewChild('feetSlot') feetSlot: ItemSlotComponent;
	@ViewChild('charmSlot') charmSlot: ItemSlotComponent;

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	equippedItems = new Array<ItemModel>();
	equippedDecorations = new Array<DecorationModel>();

	constructor(
		private tooltipService: TooltipService,
		private skillService: SkillService,
		private itemsService: ItemsService,
		private renderer: Renderer2,
		private location: Location,
		private changeDetector: ChangeDetectorRef
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

	ngAfterContentInit() {
		// this.loadBuild();
	}

	ngAfterViewInit() {
		setTimeout(() => this.loadBuild(), 100);
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

		this.updateBuildId();
	}

	selectDecoration(selectedDecoration: DecorationModel) {
		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.decoration = selectedDecoration;

			this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
				return decoration === selectedDecoration;
			});

			selectedDecoration.equipmentId = this.selectedDecorationSlot.item.id;
			this.equippedDecorations.push(selectedDecoration);
			this.updateStatsAndSkills();
		}

		this.updateBuildId();
	}

	itemLevelChanged() {
		this.updateStatsAndSkills();
		this.updateBuildId();
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
		this.updateBuildId();
	}

	decorationCleared(clearedDecoration: DecorationModel) {
		this.equippedDecorations = _.reject(this.equippedDecorations, (decoration: DecorationModel) => {
			return decoration === clearedDecoration;
		});

		this.updateStatsAndSkills();
		this.updateBuildId();
	}

	private updateStatsAndSkills() {
		this.skillService.updateSkills(this.equippedItems, this.equippedDecorations);
		this.equippedStatsComponent.update(this.equippedItems);
		this.equippedSkillsComponent.update();
	}

	itemSlotSelected(equipmentSlot: ItemSlotComponent) {
		if (this.selectedEquipmentSlot) {
			this.selectedEquipmentSlot.selected = false;
		}

		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.selected = false;
		}

		this.selectedDecorationSlot = null;

		this.selectedEquipmentSlot = equipmentSlot;
		this.selectedEquipmentSlot.selected = true;
		setTimeout(() => this.equipmentItemListComponent.searchBox.nativeElement.focus(), 100);
	}

	decorationSlotSelected(decorationSlot: DecorationSlotComponent) {
		if (this.selectedEquipmentSlot) {
			this.selectedEquipmentSlot.selected = false;
		}

		if (this.selectedDecorationSlot) {
			this.selectedDecorationSlot.selected = false;
		}

		this.selectedEquipmentSlot = null;

		this.selectedDecorationSlot = decorationSlot;
		this.selectedDecorationSlot.selected = true;
		setTimeout(() => this.decorationItemListComponent.searchBox.nativeElement.focus(), 100);
	}

	moveTooltip(event: MouseEvent) {
		let newTop = event.clientY + 40;
		let newLeft = event.clientX + 40;

		if (window.innerHeight < newTop + this.itemStatsContainer.nativeElement.scrollHeight) {
			newTop = window.innerHeight - this.itemStatsContainer.nativeElement.scrollHeight - 20;
		}

		if (window.innerWidth < newLeft + this.itemStatsContainer.nativeElement.scrollWidth) {
			newLeft = window.innerWidth - this.itemStatsContainer.nativeElement.scrollWidth;
		}

		this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'left', newLeft + 'px');
		this.renderer.setStyle(this.itemStatsContainer.nativeElement, 'top', newTop + 'px');
	}

	updateBuildId() {
		const weapon = this.equippedItems.find(item => item.equipmentCategory == EquipmentCategoryType.Weapon);
		const head = this.equippedItems.find(item => item.itemType == ItemType.Head);
		const chest = this.equippedItems.find(item => item.itemType == ItemType.Chest);
		const hands = this.equippedItems.find(item => item.itemType == ItemType.Hands);
		const legs = this.equippedItems.find(item => item.itemType == ItemType.Legs);
		const feet = this.equippedItems.find(item => item.itemType == ItemType.Feet);
		const charm = this.equippedItems.find(item => item.itemType == ItemType.Charm);

		this.buildId = 'v1';

		this.buildId += this.getItemBuildString(weapon);
		this.buildId += this.getItemBuildString(head);
		this.buildId += this.getItemBuildString(chest);
		this.buildId += this.getItemBuildString(hands);
		this.buildId += this.getItemBuildString(legs);
		this.buildId += this.getItemBuildString(feet);
		this.buildId += this.getItemBuildString(charm);

		this.location.replaceState(this.location.path(false), '#' + this.buildId);
	}

	getItemBuildString(item: ItemModel): string {
		let result = 'i';

		if (item) {
			result += item.id.toString();

			if (item.equippedLevel) {
				result += `l${item.equippedLevel}`;
			}

			if (item.slots) {
				let decorations = _.filter(this.equippedDecorations, d => d.equipmentId === item.id);
				for (let i = 0; i < item.slots.length; i++) {
					result += 'd';
					const slot = item.slots[i];
					const decoration = _.find(decorations, d => d.equipmentId == item.id && d.level <= slot.level);
					decorations = _.without(decorations, decoration);
					if (decoration) {
						result += `${decoration.id.toString()}`;
					}
				}
			}
		}

		return result;
	}

	loadBuild() {
		const hash = location.hash;
		const slotHashes = hash.split('i');

		// const version = slotHash[0];

		this.loadBuildSlot(slotHashes[1], this.weaponSlot);
		this.loadBuildSlot(slotHashes[2], this.headSlot);
		this.loadBuildSlot(slotHashes[3], this.chestSlot);
		this.loadBuildSlot(slotHashes[4], this.handsSlot);
		this.loadBuildSlot(slotHashes[5], this.legsSlot);
		this.loadBuildSlot(slotHashes[6], this.feetSlot);
		this.loadBuildSlot(slotHashes[7], this.charmSlot);

		this.updateStatsAndSkills();
	}

	loadBuildSlot(slotHash: string, slot: ItemSlotComponent) {
		const slotParts = slotHash.split('d');
		const itemParts = slotParts[0].split('l');
		const equipmentId = parseInt(itemParts[0], 10);
		if (equipmentId != null) {
			let equipment: ItemModel;
			if (slot.slotName == ItemType.Weapon) {
				equipment = this.itemsService.getWeapon(equipmentId);
			} else {
				equipment = this.itemsService.getArmorById(equipmentId);
			}

			if (itemParts.length > 1) {
				const level = parseInt(itemParts[1], 10);
				equipment.equippedLevel = level;
			}

			if (equipment) {
				this.equippedItems.push(equipment);
				slot.item = equipment;

				this.changeDetector.detectChanges();

				for (let i = 1; i < slotParts.length; i++) {
					const decorationId = parseInt(slotParts[i], 10);
					if (decorationId) {
						const decoration = this.itemsService.getDecoration(decorationId);
						if (decoration) {
							const newDecoration = Object.assign({}, decoration);
							slot.decorationSlots.toArray()[i - 1].decoration = newDecoration;
							newDecoration.equipmentId = equipment.id;
							this.equippedDecorations.push(newDecoration);
						}
					}
				}
			}
		}
	}
}
