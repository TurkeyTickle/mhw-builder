import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

@Component({
	selector: 'mhw-builder-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	public title: string;

	@HostBinding('class.open') isOpen: boolean;

	@HostListener('document:keyup', ['$event'])
	onKeyUp(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	constructor() { }

	ngOnInit(): void {

	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}
}
