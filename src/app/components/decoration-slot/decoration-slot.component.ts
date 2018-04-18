import { Component, Input, OnInit, } from '@angular/core';
import { DecorationModel } from '../../models/decoration.model';
import { TooltipService } from '../../services/tooltip.service';
import { SlotService } from '../../services/slot.service';
import { PointerType } from '../../types/pointer.type';

@Component({
	selector: 'mhw-builder-decoration-slot',
	templateUrl: './decoration-slot.component.html',
	styleUrls: ['./decoration-slot.component.scss'],
})
export class DecorationSlotComponent implements OnInit {

	@Input() level: number;
	@Input() itemId: number;

	decoration: DecorationModel;

	public selected: boolean;

	constructor(
		private slotService: SlotService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() { }

	clearClicked(event: Event) {
		event.stopPropagation();
		this.clearTooltipItem();
		this.slotService.clearDecorationSlot(this);
	}

	clicked() {
		this.slotService.selectDecorationSlot(this);
	}

	setTooltipItem(event: PointerEvent) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipService.setDecoration(this.decoration);
		}
	}

	clearTooltipItem() {
		this.tooltipService.setDecoration(null);
	}
}
