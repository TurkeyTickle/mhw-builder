import { Component, OnInit } from '@angular/core';
import { AugmentationModel } from '../../models/augmentation.model';
import { SlotService } from '../../services/slot.service';

@Component({
	selector: 'mhw-builder-augmentation-slot',
	templateUrl: './augmentation-slot.component.html',
	styleUrls: ['./augmentation-slot.component.scss']
})
export class AugmentationSlotComponent implements OnInit {

	augmentation: AugmentationModel;

	public selected: boolean;

	constructor(
		private slotService: SlotService
	) { }

	ngOnInit(): void { }

	clicked() {
		this.slotService.setAugmentationSlot(this);
	}

	clearClicked(event: Event) {
		event.stopPropagation();
		this.slotService.clearAugmentationSlot(this);
		// this.clearTooltipItem();
	}
}
