import { Component, OnInit, Input } from '@angular/core';
import { CalculationDetailModel } from '../../models/calculation.model';

@Component({
	selector: 'mhw-builder-calc-details',
	templateUrl: './calc-details.component.html',
	styleUrls: ['./calc-details.component.scss'],
})
export class CalcDetailsComponent implements OnInit {

	private _calc: CalculationDetailModel;
	@Input()
	public set calc(calc: CalculationDetailModel) {
		this._calc = calc;
		this.generateTemplate();
	}
	public get calc() { return this._calc; }

	detailTemplate: string;

	constructor(
	) { }

	ngOnInit(): void {
	}

	generateTemplate() {
		this.detailTemplate = null;

		if (this.calc.detailTemplate) {
			let template = this.calc.detailTemplate;

			for (const item of this.calc.detailVariables) {
				template = template.replace(`{${item.name}}`, `<span class="${item.colorClass}">${item.value}</span>`);
			}

			this.detailTemplate = template;
		}
	}
}
