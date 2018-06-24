import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ColumnParser } from '../models/column-parser.model';
import * as ld from 'lodash';

@Injectable()
export abstract class DataLoader<T> {
	delimeter = '\t';

	constructor(
		protected http: HttpClient
	) { }

	protected parse(_: string): T[] {
		throw new Error('not implemented');
	}

	public load(resourceName: string, withLocale: boolean = true): Observable<T[]> {
		let result: Observable<T[]>;

		const ext = resourceName.split('.').pop();
		if (ext.toLowerCase() === 'json') {
			result = Observable.create((observer: Observer<T[]>) => {
				forkJoin(
					this.loadJsonResource(resourceName, false),
					withLocale ? this.loadJsonResource(resourceName, true) : of(null)
				).subscribe(results => {
					const items = ld.map(results[0], r => {
						const txVal = ld.find(results[1], { id: (r as any).id });
						const newVal = ld.assignIn(r, txVal);
						return newVal;
					});
					observer.next(items);
					observer.complete();
				});
			});
		} else {
			result = Observable.create((observer: Observer<T[]>) => {
				forkJoin(
					this.loadTextResource(resourceName, false),
					withLocale ? this.loadTextResource(resourceName, true) : of(null)
				).subscribe(results => {
					const data = this.parse(results[0]);
					const localeData = results[1] ? this.parse(results[1]) : null;
					const items = ld.map(data, r => ld.assignIn(r, ld.find(localeData, { id: (r as any).id })));
					observer.next(items);
					observer.complete();
				});
			});
		}

		return result;
	}

	private loadJsonResource(resourceName: string, fromLocale: boolean): Observable<T[]> {
		return this.http.get<T[]>(this.getPath(resourceName, fromLocale)).pipe(
			catchError(() => {
				return of(null);
			})
		);
	}

	private loadTextResource(resourceName: string, fromLocale: boolean): Observable<string> {
		return this.http.get(this.getPath(resourceName, fromLocale), { responseType: 'text' }).pipe(
			catchError(() => {
				return of(null);
			})
		);
	}

	private getPath(resourceName: string, fromLocale: boolean): string {
		let path: string;
		if (fromLocale) {
			const locale = this.getLocale();
			path = `./assets/${locale}/${resourceName}`;
		} else {
			path = `./assets/${resourceName}`;
		}
		return path;
	}

	private getLocale(): string {
		let locale = localStorage.getItem('locale');
		if (!locale) {
			locale = navigator.languages[0];
			localStorage.setItem('locale', locale);
		}

		return locale;
	}

	protected parseTextContent(content: string, columnParsers: ColumnParser[]): T[] {
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

				const columnParser = ld.find(columnParsers, p => p.columnName == columnHeader);
				if (columnParser) {
					item[columnHeader] = columnParser.parser.parse(rowValue);
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
}
