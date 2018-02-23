import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { Subject } from 'rxjs/Subject';
import { DecorationModel } from '../models/decoration.model';

@Injectable()
export class TooltipService {
	public subject = new Subject<ItemModel | DecorationModel>();

	public item: ItemModel | DecorationModel;

	setItem(item: ItemModel | DecorationModel) {
		this.item = item;
		this.subject.next(item);
	}
}
