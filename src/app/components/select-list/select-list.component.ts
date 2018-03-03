import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValuePair } from '../../models/key-value-pair.model';

@Component({
	selector: 'mhw-builder-select-list',
	templateUrl: './select-list.component.html',
	styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
	@Input() items: any[] = new Array<KeyValuePair>();
	@Input() itemNameProperty: string;
	@Input() placeholderText: string;
	@Output() itemSelected = new EventEmitter<any>();

	selectedItem: KeyValuePair;

	private listOpen: boolean;

	constructor() { }

	ngOnInit() { }

	selectItem(item: KeyValuePair, event: Event) {
		event.stopPropagation();
		this.selectedItem = item;
		this.listOpen = false;
	}

	selectionClicked() {
		this.listOpen = !this.listOpen;
	}

	focusLost() {
		console.log('lost focus');
	}
}
