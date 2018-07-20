import { Component, OnInit } from '@angular/core';
import { KinsectModel } from '../../models/kinsect.model';
import { SlotService } from '../../services/slot.service';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { PointerType } from '../../types/pointer.type';
import { DropdownComponent } from '../common/dropdown/dropdown.component';
import { ViewChild } from '@angular/core';
import { ElementType } from '../../types/element.type';
import { KeyValuePair } from '../../models/common/key-value-pair.model';

@Component({
	selector: 'mhw-builder-kinsect-slot',
	templateUrl: './kinsect-slot.component.html',
	styleUrls: ['./kinsect-slot.component.scss']
})
export class KinsectSlotComponent implements OnInit {
	slotName = ItemType.Kinsect;
	kinsect: KinsectModel;
	elements: KeyValuePair<string, string>[];
	selectedElement: ElementType = ElementType.Dragon;

	public selected: boolean;

	@ViewChild(DropdownComponent) elementDropdown: DropdownComponent;

	constructor(
		private slotService: SlotService,
		private tooltipService: TooltipService
	) { }

	ngOnInit(): void {
		this.elements = [];
		for (const item in ElementType) {
			this.elements.push({ key: item, value: item });
		}
	}

	clicked() {
		this.slotService.selectKinsectSlot(this);
	}

	clearClicked(event: Event) {
		event.stopPropagation();
		this.slotService.clearKinsectSlot(this);
		this.clearTooltipKinsect();
	}

	setTooltipKinsect(event: PointerEvent, kinsect: KinsectModel) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipService.setKinsect(kinsect);
		}
	}

	clearTooltipKinsect() {
		this.tooltipService.setKinsect(null);
	}

	selectElement(selectedElement: ElementType) {
		this.selectedElement = selectedElement;
	}

	getElementIcon(element: ElementType): string {
		let assetPath;
		if (element == ElementType.None) {
			assetPath = ``;
		} else {
			assetPath = `${element.toLowerCase()}-icon`;
		}

		return `assets/images/${assetPath}.png`;
	}
}
