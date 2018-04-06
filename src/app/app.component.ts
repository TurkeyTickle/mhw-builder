import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSlotClearModel, ItemSlotComponent } from './components/item-slot/item-slot.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DecorationModel } from './models/decoration.model';
import { ItemModel } from './models/item.model';
import { ItemsService } from './services/items.service';
import { SkillService } from './services/skill.service';
import { EquipmentCategoryType } from './types/equipment-category.type';
import { ItemType } from './types/item.type';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
	public itemTypes = ItemType;
	title = 'MHW Builder';
	buildId = '';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;
	@ViewChild(TooltipComponent) tooltipComponent: TooltipComponent;
	@ViewChild('equipmentItemList') equipmentItemListComponent: ItemListComponent;
	@ViewChild('decorationItemList') decorationItemListComponent: ItemListComponent;
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
		private skillService: SkillService,
		private itemsService: ItemsService,
		private location: Location,
		private changeDetector: ChangeDetectorRef
	) { }


	ngAfterViewInit() {
		setTimeout(() => this.loadBuild(), 100);
	}

	selectItem(selectedItem: ItemModel) {
		if (this.selectedEquipmentSlot) {
			this.selectedEquipmentSlot.item = selectedItem;

			this.equippedItems = _.reject(this.equippedItems, item => {
				if (item.itemType == selectedItem.itemType) {
					this.equippedDecorations = _.reject(this.equippedDecorations, decoration => decoration.equipmentId == item.id);
					return true;
				} else {
					return false;
				}
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

		if (this.selectedDecorationSlot && this.selectedDecorationSlot.item === clear.item) {
			this.selectedDecorationSlot = null;
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
		this.tooltipComponent.move(event.clientX, event.clientY);
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
		if (slotHash) {
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
}
