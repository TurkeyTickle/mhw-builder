import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DecorationModel } from '../../models/decoration.model';
import { TooltipService } from '../../services/tooltip.service';

@Component({
	selector: 'mhw-builder-decoration-slot',
	templateUrl: './decoration-slot.component.html',
	styleUrls: ['./decoration-slot.component.scss'],
})
export class DecorationSlotComponent implements OnInit {
	@Input() level: number;
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();
	@Output() cleared = new EventEmitter();

	public decoration: DecorationModel;

	constructor(
		private tooltipService: TooltipService
	) { }

	ngOnInit() { }

	clearClicked(event: Event) {
		event.preventDefault();
		this.cleared.emit(this.decoration);
		this.tooltipService.setItem(null);
		this.decoration = null;
	}

	clicked() {
		this.decorationSlotSelected.emit(this);
	}

	setTooltipItem() {
		this.tooltipService.setItem(this.decoration);
	}

	clearTooltipItem() {
		this.tooltipService.setItem(null);
	}
}
