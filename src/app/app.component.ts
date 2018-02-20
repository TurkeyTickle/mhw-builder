import { Component } from '@angular/core';
import { ItemType } from './types/item.type';

@Component({
  selector: 'mhw-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public itemTypes = ItemType;
  title = 'app';
}
