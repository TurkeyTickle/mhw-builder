import * as _ from 'lodash';
import { ItemModel } from '../models/item.model';
import { SlotModel } from '../models/slot.model';
import { SharpnessLevelModel } from '../models/sharpness-level.model';
import { SharpnessType } from '../types/sharpness.type';
import { SkillReferenceModel } from '../models/skill-reference.model';
import { DecorationModel } from '../models/decoration.model';

export class ColumnParser {
	columnName: string;
	predicate: (value: string) => any;
}

export class TSVParser {
	static delimeter = '\t';

	static parseWeapons(data: string): ItemModel[] {
		return this.parse<ItemModel>(data, [
			{
				columnName: 'slots',
				predicate: this.parseSlots
			},
			{
				columnName: 'tags',
				predicate: this.parseTags
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
			{
				columnName: 'skills',
				predicate: this.parseSkillsReferences
			}
		]);
	}

	static parseArmor(data: string): ItemModel[] {
		return this.parse<ItemModel>(data, [
			{
				columnName: 'slots',
				predicate: this.parseSlots
			},
			{
				columnName: 'tags',
				predicate: this.parseTags
			},
			{
				columnName: 'skills',
				predicate: this.parseSkillsReferences
			},
		]);
	}

	static parseCharms(data: string): ItemModel[] {
		return this.parse<ItemModel>(data, [
			{
				columnName: 'slots',
				predicate: this.parseSlots
			},
			{
				columnName: 'tags',
				predicate: this.parseTags
			},
			{
				columnName: 'skills',
				predicate: this.parseSkillsReferences
			},
		]);
	}

	static parseDecorations(data: string): DecorationModel[] {
		return this.parse<DecorationModel>(data, [
			{
				columnName: 'skills',
				predicate: this.parseSkillsReferences
			},
		]);
	}

	private static parse<T>(content: string, columnParsers: ColumnParser[]): Array<T> {
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

	private static parseSlots(data: string): SlotModel[] {
		const values = data.split(';');
		const slots: SlotModel[] = [];
		for (const item of _.filter(values, v => v)) {
			slots.push({
				level: Number(item),
			});
		}
		return slots;
	}

	private static parseTags(data: string): string[] {
		return data.split(';');
	}

	private static parseSkillsReferences(data: string): SkillReferenceModel[] {
		const values = data.split(';');
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
}
