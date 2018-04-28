import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SearchDecorationModel } from '../../models/search-decoration.model';
import { SlotService } from '../../services/slot.service';
import { DataService } from '../../services/data.service';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { DecorationModel } from '../../models/decoration.model';
import { PointerType } from '../../types/pointer.type';
import * as _ from 'lodash';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

@Component({
	selector: 'mhw-builder-decoration-list',
	templateUrl: './decoration-list.component.html',
	styleUrls: ['./decoration-list.component.scss']
})
export class DecorationListComponent implements OnInit {
	private _decorationLevel: number;

	@Input()
	set decorationLevel(decorationLevel: number) {
		this._decorationLevel = decorationLevel;
		this.loadItems();
	}
	get decorationLevel(): number { return this._decorationLevel; }

	@Output() decorationSelected = new EventEmitter<DecorationModel>();

	@ViewChild('searchBox') searchBox: ElementRef;
	@ViewChild('decorationList') decorationList: VirtualScrollComponent;

	decorations: SearchDecorationModel[];
	filteredDecorations: SearchDecorationModel[];
	virtualDecorations: SearchDecorationModel[];

	@HostListener('window:resize')
	onResize() {
		this.refreshList();
	}

	constructor(
		private slotService: SlotService,
		private dataService: DataService,
		private tooltipService: TooltipService
	) { }

	ngOnInit(): void { }

	refreshList() {
		if (this.decorationList) {
			this.decorationList.refresh();
		}
	}

	onDecorationListUpdate(decorations: SearchDecorationModel[]) {
		this.virtualDecorations = decorations;
	}

	loadItems() {
		this.decorations = this.dataService.getDecorations(this.decorationLevel) as SearchDecorationModel[];
		this.resetSearchResults();
	}

	search(query: string) {
		this.filteredDecorations = this.decorations;

		if (query) {
			query = query.toLowerCase().trim();
			const queryParts = query.split(' ');

			if (this.decorations) {
				for (const decoration of this.decorations) {
					const itemName = decoration.name.toLowerCase();
					const skills = this.dataService.getSkills(decoration.skills);

					const nameMatch = itemName.includes(query);
					const skillMatch = _.some(skills, skill => skill.name.toLowerCase().includes(query));

					if (!nameMatch && !skillMatch) {
						this.filteredDecorations = _.reject(this.filteredDecorations, d => d.name === decoration.name);
					}
				}
			}
		} else {
			this.resetSearchResults();
		}
	}

	resetSearchResults() {
		this.searchBox.nativeElement.value = null;
		this.filteredDecorations = this.decorations;
	}

	selectDecoration(decoration: DecorationModel) {
		const newDecoration = Object.assign({}, decoration);
		this.slotService.selectDecoration(newDecoration);
	}

	setTooltipDecoration(event: PointerEvent, decoration: DecorationModel) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipService.setDecoration(decoration);
		}
	}

	clearTooltipDecoration() {
		this.tooltipService.setDecoration(null);
	}
}
