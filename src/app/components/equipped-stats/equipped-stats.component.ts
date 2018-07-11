import { Component, OnInit } from '@angular/core';
import { StatDetailModel } from '../../models/stat-detail.model';
import { CalculationService } from '../../services/calculation.service';
import { TooltipService } from '../../services/tooltip.service';
import { PointerType } from '../../types/pointer.type';
import { AmmoCapacitiesModel } from '../../models/ammo-capacities.model';
import { KinsectModel } from '../../models/kinsect.model';

@Component({
	selector: 'mhw-builder-equipped-stats',
	templateUrl: './equipped-stats.component.html',
	styleUrls: ['./equipped-stats.component.scss']
})

export class EquippedStatsComponent implements OnInit {

	attackCalcs = new Array<StatDetailModel>();
	defenseCalcs = new Array<StatDetailModel>();
	ammoCapacities: AmmoCapacitiesModel;
	kinsect: KinsectModel;

	constructor(
		private calculationService: CalculationService,
		private tooltipService: TooltipService
	) { }

	ngOnInit() {
		this.calculationService.attackCalcsUpdated$.subscribe(calcs => {
			this.attackCalcs = calcs;
		});

		this.calculationService.ammoUpdated$.subscribe(ammo => {
			this.ammoCapacities = ammo;
		});

		this.calculationService.kinsectUpdated$.subscribe(kinsect => {
			this.kinsect = kinsect;
		});

		this.calculationService.defenseCalcsUpdated$.subscribe(calcs => {
			this.defenseCalcs = calcs;
		});
	}

	showCalcDetails(event: PointerEvent, calc: StatDetailModel) {
		if (event.pointerType == PointerType.Mouse) {
			if (calc.calculationTemplate || (calc.info && calc.info.length)) {
				this.tooltipService.setCalc(calc);
			}
		}
	}

	clearCalcDetails() {
		this.tooltipService.setCalc(null);
	}

	showOnClickCalcDetails(calc: StatDetailModel) {
		if (calc.calculationTemplate || (calc.info && calc.info.length)) {
			this.tooltipService.setCalc(calc);
		} else {
			this.clearCalcDetails();
		}
	}
}
