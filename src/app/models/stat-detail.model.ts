import { CalculationVariableModel } from './calculation-variable.model';

export class StatDetailModel {
	name: string;
	value: string | number;
	description?: string;
	calculationTemplate?: string;
	calculationVariables?: CalculationVariableModel[];
	iconColorClass?: string;
}

