import { Component, Query, ViewChild } from '@angular/core';
import { ItemType } from './types/item.type';
import { ItemModel } from './models/item.model';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';

@Component({
  selector: 'mhw-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public itemTypes = ItemType;
  title = 'app';

  selectedSlot: ItemSlotComponent;

  selectItem(item: ItemModel) {
    if (this.selectedSlot) {
      this.selectedSlot.item = item;
    }
  }

  slotSelected(item) {
    this.selectedSlot = item;
  }
}
