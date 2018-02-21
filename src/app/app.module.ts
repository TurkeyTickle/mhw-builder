import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { ItemsService } from './services/items.service';
import { AppDataProvider } from './providers/app-data.provider';
import { ItemListComponent } from './components/item-list/item-list.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';


@NgModule({
	declarations: [
		AppComponent,
		ItemSlotComponent,
		ItemListComponent,
		EquippedStatsComponent,
		EquippedSkillsComponent
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
