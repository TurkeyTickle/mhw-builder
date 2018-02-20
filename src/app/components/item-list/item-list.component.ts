import { Component, OnInit, Input } from '@angular/core';
import { ItemType } from '../../types/item.type';
import { ItemModel } from '../../models/item.model';
import { ItemsService } from '../../services/items.service';

@Component({
    selector: 'mhw-builder-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    @Input() itemType: ItemType;

    items: ItemModel[];

    constructor(private itemsService: ItemsService) { }

    ngOnInit() {
        this.items = this.itemsService.getItems(this.itemType);
        console.log(this.items);
    }
}
