import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { DecorationModel } from '../../models/decoration.model';
import { ItemModel } from '../../models/item.model';
import { SearchDecorationModel } from '../../models/search-decoration.model';
import { SearchItemModel } from '../../models/search-item.model';
import { DataService } from '../../services/data.service';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { WeaponType } from '../../types/weapon.type';
import { SlotService } from '../../services/slot.service';

@Component({
	selector: 'mhw-builder-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
	private _itemType: ItemType;
	private _decorationLevel: number;

	@Input()
	set itemType(itemType: ItemType) {
		this._itemType = itemType;
		this.loadItems();
	}
	get itemType(): ItemType { return this._itemType; }

	@Input()
	set decorationLevel(decorationLevel: number) {
		this._decorationLevel = decorationLevel;
		this.loadItems();
	}
	get decorationLevel(): number { return this._decorationLevel; }

	@Output() itemSelected = new EventEmitter<ItemModel>();
	@Output() decorationSelected = new EventEmitter<DecorationModel>();

	@ViewChild('searchBox') searchBox: ElementRef;

	items: SearchItemModel[];
	decorations: SearchDecorationModel[];

	weaponTypeFilter?: WeaponType;

	constructor(
		private slotService: SlotService,
		private dataService: DataService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
	}

	loadItems() {
		if (this.itemType == ItemType.Decoration) {
			this.decorations = this.dataService.getDecorations(this.decorationLevel) as SearchDecorationModel[];
		} else if (this.itemType == ItemType.Weapon) {
			this.items = this.dataService.getWeapons() as SearchItemModel[];
		} else {
			this.items = this.dataService.getArmorByType(this.itemType) as SearchItemModel[];
		}

		this.resetSearchResults();
	}

	search(query: string) {
		if (query) {
			query = query.toLowerCase().trim();
			if (this.items) {
				for (const item of this.items) {
					item.visible = item.name.toLowerCase().includes(query);
					if (item.visible) { continue; }

					const skills = this.dataService.getSkills(item.skills);
					for (const skill of skills) {
						item.visible = skill.name.toLowerCase().includes(query);
						if (item.visible) { break; }
					}

					if (item.visible) { continue; }

					if (item.tags) {
						item.visible = item.tags.some(tag => tag.includes(query));
					}

					if (item.visible) { continue; }
				}
			}

			const itemSubset = _.filter(this.items, item => item.visible);
			this.applyWeaponFilter(itemSubset);

			if (this.decorations) {
				for (const decoration of this.decorations) {
					decoration.visible = decoration.name.toLowerCase().includes(query);
					if (decoration.visible) { continue; }

					const skills = this.dataService.getSkills(decoration.skills);
					for (const skill of skills) {
						decoration.visible = skill.name.toLowerCase().includes(query);
						if (decoration.visible) { break; }
					}

					if (decoration.visible) { continue; }
				}
			}
		} else {
			this.resetSearchResults();
		}
	}

	resetSearchResults() {
		this.searchBox.nativeElement.value = null;

		// IMPROVEMENT: find a way to initialize visible without looping
		if (this.items) {
			for (const item of this.items) {
				item.visible = true;
			}
		}

		if (this.decorations) {
			for (const decoration of this.decorations) {
				decoration.visible = true;
			}
		}

		this.applyWeaponFilter(this.items);
	}

	selectItem(item: ItemModel) {
		const newItem = Object.assign({}, item);
		this.slotService.selectItem(newItem);
	}

	selectDecoration(decoration: DecorationModel) {
		const newDecoration = Object.assign({}, decoration);
		this.slotService.selectDecoration(newDecoration);
	}

	setTooltipItem(event: MouseEvent, item: ItemModel) {
		event.preventDefault();
		this.tooltipService.setItem(item);
	}

	clearTooltipItem(event: MouseEvent) {
		event.preventDefault();
		this.tooltipService.setItem(null);
	}

	setTooltipDecoration(event: MouseEvent, decoration: DecorationModel) {
		event.preventDefault();
		this.tooltipService.setDecoration(decoration);
	}

	clearTooltipDecoration(event: MouseEvent) {
		event.preventDefault();
		this.tooltipService.setDecoration(null);
	}

	getElementIcon(item: ItemModel): string {
		return `assets/images/${item.element.toLowerCase()}${item.elementHidden ? '-gray' : ''}-icon.png`;
	}

	getAilmentIcon(item: ItemModel): string {
		return `assets/images/${item.ailment.toLowerCase()}${item.ailmentHidden ? '-gray' : ''}-icon.png`;
	}

	weaponFilterClicked(weaponType: WeaponType) {
		if (!this.weaponTypeFilter || this.weaponTypeFilter != weaponType) {
			this.weaponTypeFilter = weaponType;
		} else if (this.weaponTypeFilter == weaponType) {
			this.weaponTypeFilter = null;
		}

		this.search(this.searchBox.nativeElement.value);
		// this.applyWeaponFilter(this.items);
	}

	applyWeaponFilter(items: SearchItemModel[]) {
		if (items) {
			for (const item of items) {
				if (item.itemType == ItemType.Weapon) {
					item.visible = !this.weaponTypeFilter || item.weaponType == this.weaponTypeFilter;
				}
			}
		}
	}
}
