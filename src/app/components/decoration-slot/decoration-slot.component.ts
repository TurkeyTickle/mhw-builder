import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DecorationModel } from '../../models/decoration.model';

@Component({
	selector: 'mhw-builder-decoration-slot',
	templateUrl: './decoration-slot.component.html',
	styleUrls: ['./decoration-slot.component.scss']
})
export class DecorationSlotComponent implements OnInit {
	@Output() decorationSlotSelected = new EventEmitter<DecorationSlotComponent>();

	public decoration: DecorationModel;

	constructor() { }

	ngOnInit() { }

	clicked(): void {
		this.decorationSlotSelected.emit(this);
	}
}
