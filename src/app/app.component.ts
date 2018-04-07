import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ItemModel } from './models/item.model';
import { EquipmentCategoryType } from './types/equipment-category.type';
import { ItemType } from './types/item.type';
import { AugmentationSlotComponent } from './components/augmentation-slot/augmentation-slot.component';
import { SlotService } from './services/slot.service';
import { BuildService } from './services/build.service';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
	public itemTypes = ItemType;
	buildId = '';

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;
	@ViewChild(TooltipComponent) tooltipComponent: TooltipComponent;
	@ViewChild('weaponSlot') weaponSlot: ItemSlotComponent;
	@ViewChild('headSlot') headSlot: ItemSlotComponent;
	@ViewChild('chestSlot') chestSlot: ItemSlotComponent;
	@ViewChild('handsSlot') handsSlot: ItemSlotComponent;
	@ViewChild('legsSlot') legsSlot: ItemSlotComponent;
	@ViewChild('feetSlot') feetSlot: ItemSlotComponent;
	@ViewChild('charmSlot') charmSlot: ItemSlotComponent;

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	selectedAugmentationSlot: AugmentationSlotComponent;

	constructor(
		public slotService: SlotService,
		private buildService: BuildService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.buildService.initialize(
			this.weaponSlot,
			this.headSlot,
			this.chestSlot,
			this.handsSlot,
			this.legsSlot,
			this.feetSlot,
			this.charmSlot);
	}

	ngAfterViewInit() {
		setTimeout(() => this.buildService.loadBuild(location.hash), 100);
	}

	// itemLevelChanged() {
	// 	this.updateStatsAndSkills();
	// 	this.updateBuildId();
	// }

	// private updateStatsAndSkills() {
	// 	this.skillService.updateSkills(this.equippedItems, this.equippedDecorations);
	// }

	moveTooltip(event: MouseEvent) {
		this.tooltipComponent.move(event.clientX, event.clientY);
	}

	// updateBuildId() {
	// 	const weapon = this.equippedItems.find(item => item.equipmentCategory == EquipmentCategoryType.Weapon);
	// 	const head = this.equippedItems.find(item => item.itemType == ItemType.Head);
	// 	const chest = this.equippedItems.find(item => item.itemType == ItemType.Chest);
	// 	const hands = this.equippedItems.find(item => item.itemType == ItemType.Hands);
	// 	const legs = this.equippedItems.find(item => item.itemType == ItemType.Legs);
	// 	const feet = this.equippedItems.find(item => item.itemType == ItemType.Feet);
	// 	const charm = this.equippedItems.find(item => item.itemType == ItemType.Charm);

	// 	this.buildId = 'v1';

	// 	this.buildId += this.getItemBuildString(weapon);
	// 	this.buildId += this.getItemBuildString(head);
	// 	this.buildId += this.getItemBuildString(chest);
	// 	this.buildId += this.getItemBuildString(hands);
	// 	this.buildId += this.getItemBuildString(legs);
	// 	this.buildId += this.getItemBuildString(feet);
	// 	this.buildId += this.getItemBuildString(charm);

	// 	this.location.replaceState(this.location.path(false), '#' + this.buildId);
	// }

	// getItemBuildString(item: ItemModel): string {
	// 	let result = 'i';

	// 	if (item) {
	// 		result += item.id.toString();

	// 		if (item.equippedLevel) {
	// 			result += `l${item.equippedLevel}`;
	// 		}

	// 		if (item.slots) {
	// 			let decorations = _.filter(this.equippedDecorations, d => d.equipmentId === item.id);
	// 			for (let i = 0; i < item.slots.length; i++) {
	// 				result += 'd';
	// 				const slot = item.slots[i];
	// 				const decoration = _.find(decorations, d => d.equipmentId == item.id && d.level <= slot.level);
	// 				decorations = _.without(decorations, decoration);
	// 				if (decoration) {
	// 					result += `${decoration.id.toString()}`;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return result;
	// }
}
