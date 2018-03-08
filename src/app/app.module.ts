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
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';
import { TooltipService } from './services/tooltip.service';
import { SkillService } from './services/skill.service';
import { KeysPipe } from './core/pipes/keys.pipe';
import { SelectListComponent } from './components/select-list/select-list.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
	declarations: [
		KeysPipe,
		AppComponent,
		ItemSlotComponent,
		ItemListComponent,
		EquippedStatsComponent,
		EquippedSkillsComponent,
		DecorationSlotComponent,
		ItemStatsComponent,
		SelectListComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		Location,
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		ItemsService,
		SkillService,
		TooltipService,
		AppDataProvider,
		{ provide: APP_INITIALIZER, useFactory: appDataProviderFactory, deps: [AppDataProvider], multi: true}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function appDataProviderFactory(provider: AppDataProvider) {
	return () => provider.load();
}
