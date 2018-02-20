import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemPickerComponent } from './components/item-picker/item-picker.component';
import { ItemsService } from './services/items.service';
import { AppDataProvider } from './providers/app-data.provider';
import { ItemListComponent } from './components/item-list/item-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemPickerComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ItemsService,
    AppDataProvider,
    { provide: APP_INITIALIZER, useFactory: appDataProviderFactory, deps: [AppDataProvider], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function appDataProviderFactory(provider: AppDataProvider) {
  return () => provider.load();
}
