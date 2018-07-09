import { Component, OnInit, Input } from '@angular/core';
import { AmmoCapacitiesModel } from '../../models/ammo-capacities.model';
import * as _ from 'lodash';
import { DeviationType } from '../../types/deviation.type';

@Component({
	selector: 'mhw-builder-ammo-capacities',
	templateUrl: './ammo-capacities.component.html',
	styleUrls: ['./ammo-capacities.component.scss']
})
export class AmmoCapacitiesComponent implements OnInit {

	@Input() ammoCapacities: AmmoCapacitiesModel;

	deviationTypes = DeviationType;

	constructor() { }

	ngOnInit() {

	}

	allZero(arr: number[]) {
		return _.every(arr, v => !v);
	}
}
