import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataLoader } from './data.loader';
import { KinsectModel } from '../../models/kinsect.model';

@Injectable()
export class KinsectsLoader extends DataLoader<KinsectModel> {
	constructor(
		protected http: HttpClient
	) {
		super(http);
	}

	protected parse(content: string): KinsectModel[] {
		return this.parseTextContent(content);
	}
}
