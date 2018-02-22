import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TooltipService {
	public subject = new Subject<ItemModel>();

	public item: ItemModel;

	setItem(item: ItemModel) {
		this.item = item;
		this.subject.next(item);
	}
}
