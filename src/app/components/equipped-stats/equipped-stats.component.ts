import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { WeaponModel } from '../../models/weapon.model';

@Component({
	selector: 'mhw-builder-equipped-stats',
	templateUrl: './equipped-stats.component.html',
	styleUrls: ['./equipped-stats.component.scss']
})

export class EquippedStatsComponent implements OnInit, OnChanges {
	attack: number;
	defense: number;

	// private _items: ItemModel[];

	// @Input()
	// get items() { return this._items; }
	// set items(items: ItemModel[]) {
	//     this._items = items;
	//     this.updateStats();
	// }

	constructor() { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	updateStats(items: ItemModel[]) {
		for (const item of items) {
			if (item instanceof WeaponModel) {
				console.log('got weapon stats');
			}
		}
	}
}
