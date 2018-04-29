import * as _ from 'lodash';
import { ItemModel } from '../models/item.model';
import { SlotModel } from '../models/slot.model';
import { SharpnessLevelModel } from '../models/sharpness-level.model';
import { SharpnessType } from '../types/sharpness.type';
import { SkillReferenceModel } from '../models/skill-reference.model';

export class ColumnParser {
	columnName: string;
	predicate: (value: string) => any;
}

export class CSVParser {
	static delimeter = '\t';

	static parse<T>(content: string, columnParsers: ColumnParser[]): Array<T> {
		const result: Array<T> = [];
		const rows = content.split('\n');
		const headerColumns = rows[0].split(this.delimeter);

		for (let i = 1; i < rows.length; i++) {
			const row = rows[i];
			const rowValues = row.split(this.delimeter);
			const item: any = {};

			for (let j = 0; j < rowValues.length; j++) {
				const columnHeader = headerColumns[j];
				const rowValue = rowValues[j];

				const parser = _.find(columnParsers, p => p.columnName == columnHeader);
				if (parser) {
					item[columnHeader] = parser.predicate(rowValue);
				} else if (rowValue) {
					if (!Number.isNaN(Number(rowValue)) && rowValue != '') {
						item[columnHeader] = Number(rowValue);
					} else if (rowValue.toLowerCase() === 'true' || rowValue.toLowerCase() === 'false') {
						item[columnHeader] = rowValue === 'true';
					} else {
						item[columnHeader] = rowValue;
					}
				}
			}

			result.push(item);
		}

		return result;
	}

	static parseWeapons(data: string) {
		return this.parse<ItemModel>(data, [
			{
				columnName: 'slots',
				predicate: (value: string) => {
					const values = value.split(';');
					const slots: SlotModel[] = [];
					for (const item of _.filter(values, v => v)) {
						slots.push({
							level: Number(item),
						});
					}
					return slots;
				}
			},
			{
				columnName: 'tags',
				predicate: (value: string) => {
					return value.split(';');
				}
			},
			{
				columnName: 'sharpnessLevels',
				predicate: (value: string) => {
					const values = value.split(';');
					const sharpnessLevels: SharpnessLevelModel[] = [];
					const items = _.filter(values, v => v != null && v != '');
					for (const item of items) {
						const parts = item.split('-');
						sharpnessLevels.push({
							color: parts[0] as SharpnessType,
							value: parseInt(parts[1], 10)
						});
					}
					return sharpnessLevels;
				}
			},
		]);
	}

	static parseArmor(data: string) {
		return this.parse<ItemModel>(data, [
			{
				columnName: 'slots',
				predicate: (value: string) => {
					const values = value.split(';');
					const slots: SlotModel[] = [];
					for (const item of _.filter(values, v => v)) {
						slots.push({
							level: Number(item),
						});
					}
					return slots;
				}
			},
			{
				columnName: 'skills',
				predicate: (value: string) => {
					const values = value.split(';');
					const skillRefs: SkillReferenceModel[] = [];
					for (const skill of values) {
						const parts = skill.split('-');
						skillRefs.push({
							id: parts[0],
							level: parts.length > 1 ? Number(parts[1]) : null
						});
					}
					return skillRefs;
				}
			},
		]);
	}
}
