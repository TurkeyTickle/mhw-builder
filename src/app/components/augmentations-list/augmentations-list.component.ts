import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AugmentationModel } from '../../models/augmentation.model';
import { DataService } from '../../services/data.service';
import { SlotService } from '../../services/slot.service';
// import { TooltipService } from '../../services/tooltip.service';

@Component({
	selector: 'mhw-builder-augmentations-list',
	templateUrl: './augmentations-list.component.html',
	styleUrls: ['./augmentations-list.component.scss']
})
export class AugmentationsListComponent implements OnInit {
	@Output() augmentationSelected = new EventEmitter<AugmentationModel>();

	augmentations: AugmentationModel[];

	constructor(
		private itemsService: DataService,
		private slotService: SlotService
		// private tooltipService: TooltipService
	) { }

	ngOnInit(): void {
		this.loadItems();
	}

	loadItems() {
		this.augmentations = this.itemsService.getAugmentations();
	}

	selectAugmentation(augmentation: AugmentationModel) {
		const newAugmentation = Object.assign({}, augmentation);
		this.slotService.selectAugmentation(newAugmentation);
		// this.augmentationSelected.emit(newAugmentation);
	}

	setTooltipAugmentation(augmentation: AugmentationModel) {
		console.log(augmentation);
	}

	clearTooltipAugmentation() {

	}
}
