import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { DecorationModel } from '../../models/decoration.model';
import { ItemModel } from '../../models/item.model';
import { DataService } from '../../services/data.service';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { WeaponType } from '../../types/weapon.type';
import { SlotService } from '../../services/slot.service';
import { PointerType } from '../../types/pointer.type';
import { Observable } from 'rxjs/Observable';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import { EquipmentCategoryType } from '../../types/equipment-category.type';
import { SkillModel } from '../../models/skill.model';

@Component({
	selector: 'mhw-builder-weapon-list',
	templateUrl: './weapon-list.component.html',
	styleUrls: ['./weapon-list.component.scss']
})
export class WeaponListComponent implements OnInit {
	public itemTypes = ItemType;
	public equipmentCategoryType = EquipmentCategoryType;
	private _itemType: ItemType;

	@Input()
	set itemType(itemType: ItemType) {
		this._itemType = itemType;
		this.loadItems();
	}
	get itemType(): ItemType { return this._itemType; }

	@Output() itemSelected = new EventEmitter<ItemModel>();

	@ViewChild('searchBox') searchBox: ElementRef;
	@ViewChild('itemList') itemList: VirtualScrollComponent;

	items: ItemModel[];
	filteredItems: ItemModel[];
	virtualItems: ItemModel[];
	weaponTypeFilter?: WeaponType;

	childHeight: number;

	@HostListener('window:resize')
	onResize() {
		this.refreshList();
	}

	constructor(
		private slotService: SlotService,
		public dataService: DataService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
	}

	refreshList() {
		if (this.itemList) {
			this.itemList.refresh();
		}
	}

	onItemListUpdate(items: ItemModel[]) {
		this.virtualItems = items;
	}

	loadItems() {
		if (this.itemType == ItemType.Weapon) {
			this.items = this.dataService.getWeapons() as ItemModel[];
		} else {
			this.items = this.dataService.getArmorByType(this.itemType) as ItemModel[];
		}

		this.resetSearchResults();
	}

	search(query: string) {
		this.filteredItems = this.items;

		if (query) {
			query = query.toLowerCase().trim();
			const queryParts = query.split(' ');

			if (this.items) {
				for (const item of this.items) {
					const itemName = item.name.toLowerCase();
					const skills = this.dataService.getSkills(item.skills);

					let match = _.some(queryParts, queryPart => {
						const nameMatch = itemName.includes(queryPart);
						const skillMatch = _.some(skills, skill => skill.name.toLowerCase().includes(queryPart));
						const tagMatch = _.some(item.tags, tag => tag.toLowerCase().includes(queryPart));

						return nameMatch || skillMatch || tagMatch;
					});

					let hiddenMatch = true;
					if (_.some(queryParts, queryPart => queryPart === 'hidden')) {
						hiddenMatch = (item.elementHidden || item.ailmentHidden);

						if (queryParts.length < 2) {
							match = true;
						}
					}

					if (!match || !hiddenMatch) {
						this.filteredItems = _.reject(this.filteredItems, i => i.name === item.name);
					}
				}
			}

			this.applyWeaponFilter();
		} else {
			this.resetSearchResults();
		}
	}

	resetSearchResults() {
		this.searchBox.nativeElement.value = null;
		this.filteredItems = this.items;
		this.applyWeaponFilter();
	}

	applyWeaponFilter() {
		if (this.filteredItems && this.weaponTypeFilter && this.itemType == ItemType.Weapon) {
			this.filteredItems = _.reject(this.filteredItems, item => item.weaponType != this.weaponTypeFilter);
		}
	}

	selectItem(item: ItemModel) {
		const newItem = Object.assign({}, item);
		this.slotService.selectItem(newItem);
	}

	getSkillCount(item: ItemModel, skill: SkillModel): string {
		const itemSkill = _.find(item.skills, s => s.id == skill.id);
		const result = `${itemSkill.level}/${skill.levels.length}`;
		return result;
	}

	// setTooltipItem(event: PointerEvent, item: ItemModel) {
	// 	if (event.pointerType == PointerType.Mouse) {
	// 		this.tooltipService.setItem(item);
	// 	}
	// }

	// clearTooltipItem() {
	// 	this.tooltipService.setItem(null);
	// }

	getElementIcon(item: ItemModel): string {
		if (item.element) {
			return `assets/images/${item.element.toLowerCase()}${item.elementHidden ? '-gray' : ''}-icon.png`;
		} else {
			return null;
		}
	}

	getAilmentIcon(item: ItemModel): string {
		if (item.ailment) {
			return `assets/images/${item.ailment.toLowerCase()}${item.ailmentHidden ? '-gray' : ''}-icon.png`;
		} else {
			return null;
		}
	}

	weaponFilterClicked(weaponType: WeaponType) {
		if (!this.weaponTypeFilter || this.weaponTypeFilter != weaponType) {
			this.weaponTypeFilter = weaponType;
		} else if (this.weaponTypeFilter == weaponType) {
			this.weaponTypeFilter = null;
		}

		this.search(this.searchBox.nativeElement.value);
	}
}
