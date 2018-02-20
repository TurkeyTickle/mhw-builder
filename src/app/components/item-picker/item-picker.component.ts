import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
    selector: 'mhw-builder-item-picker',
    templateUrl: './item-picker.component.html',
    styleUrls: ['./item-picker.component.scss']
})
export class ItemPickerComponent implements OnInit {
    @Input() slotName: string;

    constructor(
        private itemsService: ItemsService
    ) { }

    ngOnInit() {

    }
}
