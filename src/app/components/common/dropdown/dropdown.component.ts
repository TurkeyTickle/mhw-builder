import { Component, OnInit, ViewChild, ContentChildren } from '@angular/core';
import { KeyValuePair } from '../../../models/common/key-value-pair.model';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { QueryList } from '@angular/core';

@Component({
	selector: 'mhw-builder-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
	isOpen = false;

	@ViewChild('container') container: ElementRef;
	@ContentChildren(ElementRef, { descendants: true }) items: QueryList<ElementRef>;

	constructor() { }

	ngOnInit() {
	}

	public toggle(event: Event) {
		event.stopPropagation();
		this.isOpen = !this.isOpen;
	}

	public open() {
		this.isOpen = true;
	}

	public close() {
		this.isOpen = false;
	}
}
