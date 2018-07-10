import { Component, OnInit } from '@angular/core';
import { KinsectModel } from '../../models/kinsect.model';
import { SlotService } from '../../services/slot.service';
import { TooltipService } from '../../services/tooltip.service';
import { ItemType } from '../../types/item.type';
import { PointerType } from '../../types/pointer.type';

@Component({
	selector: 'mhw-builder-kinsect-slot',
	templateUrl: './kinsect-slot.component.html',
	styleUrls: ['./kinsect-slot.component.scss']
})
export class KinsectSlotComponent implements OnInit {
	slotName = ItemType.Kinsect;

	kinsect: KinsectModel;

	public selected: boolean;

	constructor(
		private slotService: SlotService,
		private tooltipService: TooltipService
	) { }

	ngOnInit(): void { }

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
			// this.tooltipService.setAugmentation(augmentation);
		}
	}

	clearTooltipKinsect() {
		// this.tooltipService.setAugmentation(null);
	}
}
