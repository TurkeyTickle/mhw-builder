import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ItemModel } from '../../models/item.model';
import { ItemType } from '../../types/item.type';

@Component({
    selector: 'mhw-builder-item-slot',
    templateUrl: './item-slot.component.html',
    styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnInit {
    @Input() slotName: ItemType;
    @Output() slotSelected = new EventEmitter<ItemSlotComponent>();

    public item: ItemModel;

    constructor(
        private itemsService: ItemsService
    ) { }

    ngOnInit() {
    }

    clicked() {
        this.slotSelected.emit(this);
    }
}
