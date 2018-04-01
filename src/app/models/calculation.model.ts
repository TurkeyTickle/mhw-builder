export class CalculationDetailModel {
	name: string;
	value: string | number;
	detailTemplate: string;
	detailVariables: CalculationVariableModel[];
}

export class CalculationVariableModel {
	name: string;
	value: number;
}
