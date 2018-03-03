import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
	transform(value: any): any {
		const keys = [];
		for (const enumMember in value) {
			if (value[enumMember]) {
				keys.push({ key: enumMember, value: value[enumMember] });
			}
		}
		return keys;
	}
}
