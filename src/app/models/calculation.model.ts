export class CalculationDetailModel {
	name: string;
	value: string | number;
	description?: string;
	detailTemplate?: string;
	detailVariables?: CalculationVariableModel[];
	iconColorClass?: string;
}

export class CalculationVariableModel {
	displayName: string;
	colorClass: string;
	name: string;
	value: string | number;
}
