import { Component, OnInit } from '@angular/core';
import { AugmentationModel } from '../../models/augmentation.model';
import { SlotService } from '../../services/slot.service';
import { TooltipService } from '../../services/tooltip.service';

@Component({
	selector: 'mhw-builder-augmentation-slot',
	templateUrl: './augmentation-slot.component.html',
	styleUrls: ['./augmentation-slot.component.scss']
})
export class AugmentationSlotComponent implements OnInit {

	augmentation: AugmentationModel;

	public selected: boolean;

	constructor(
		private slotService: SlotService,
		private tooltipService: TooltipService
	) { }

	ngOnInit(): void { }

	clicked() {
		this.slotService.selectAugmentationSlot(this);
	}

	clearClicked(event: Event) {
		event.stopPropagation();
		this.slotService.clearAugmentationSlot(this);
		this.clearTooltipAugmentation();
	}

	setTooltipAugmentation(augmentation: AugmentationModel) {
		this.tooltipService.setAugmentation(augmentation);
	}

	clearTooltipAugmentation() {
		this.tooltipService.setAugmentation(null);
	}
}
