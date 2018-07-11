import { Component, OnInit } from '@angular/core';
import { KinsectModel } from '../../models/kinsect.model';
import { Input } from '@angular/core';
import { StatDetailModel } from '../../models/stat-detail.model';

@Component({
	selector: 'mhw-builder-kinsect-details',
	templateUrl: './kinsect-details.component.html',
	styleUrls: ['./kinsect-details.component.scss']
})
export class KinsectDetailsComponent implements OnInit {

	private _kinsect: KinsectModel;

	@Input()
	set kinsect(kinsect: KinsectModel) {
		this._kinsect = kinsect;
		if (kinsect) {
			this.setupStats();
		} else {

		}
	}
	get kinsect(): KinsectModel {
		return this._kinsect;
	}

	stats: StatDetailModel[] = [];

	constructor() { }

	ngOnInit() {
	}

	setupStats() {
		this.stats = [];

		this.stats.push({
			name: 'Attack Type',
			value: this.kinsect.attackType
		});

		this.stats.push({
			name: 'Dust Effect',
			value: this.kinsect.dustEffect
		});

		// this.stats.push({
		// 	name: 'Element Damage Type',
		// 	value: this.kinsect.element
		// });

		this.stats.push({
			name: 'Power',
			value: `Lv ${this.kinsect.power}`
		});

		this.stats.push({
			name: 'Speed',
			value: `Lv ${this.kinsect.speed}`
		});

		this.stats.push({
			name: 'Heal',
			value: `Lv ${this.kinsect.heal}`
		});
	}
}
