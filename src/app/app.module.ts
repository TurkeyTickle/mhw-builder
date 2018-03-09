import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { ItemStatsComponent } from './components/item-stats/item-stats.component';
import { AppDataProvider } from './providers/app-data.provider';
import { ItemsService } from './services/items.service';
import { SkillService } from './services/skill.service';
import { TooltipService } from './services/tooltip.service';

@NgModule({
	declarations: [
		AppComponent,
		ItemSlotComponent,
		ItemListComponent,
		EquippedStatsComponent,
		EquippedSkillsComponent,
		DecorationSlotComponent,
		ItemStatsComponent
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
