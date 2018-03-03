import { KeyValuePair } from '../models/key-value-pair.model';

export class EnumHelpers {
	public static toArray(enumType: any): KeyValuePair[] {
		const result = new Array<KeyValuePair>();

		for (const item in enumType) {
			const kvp = new KeyValuePair();
			kvp.key = item;
			kvp.value = enumType[item];
			result.push(kvp);
		}

		return result;
	}
}
