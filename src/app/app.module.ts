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
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AppDataProvider } from './providers/app-data.provider';
import { ItemsService } from './services/items.service';
import { SkillService } from './services/skill.service';
import { TooltipService } from './services/tooltip.service';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { DecorationDetailsComponent } from './components/decoration-details/decoration-details.component';
import { CalcDetailsComponent } from './components/calc-details/calc-details.component';

@NgModule({
	declarations: [
		AppComponent,
		TooltipComponent,
		ItemSlotComponent,
		ItemListComponent,
		EquippedStatsComponent,
		EquippedSkillsComponent,
		DecorationSlotComponent,
		ItemDetailsComponent,
		ItemDetailsComponent,
		DecorationDetailsComponent,
		SkillDetailsComponent,
		CalcDetailsComponent
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
