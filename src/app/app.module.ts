import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AugmentationSlotComponent } from './components/augmentation-slot/augmentation-slot.component';
import { CalcDetailsComponent } from './components/calc-details/calc-details.component';
import { DecorationDetailsComponent } from './components/decoration-details/decoration-details.component';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { AppDataProvider } from './providers/app-data.provider';
import { DataService } from './services/data.service';
import { SkillService } from './services/skill.service';
import { TooltipService } from './services/tooltip.service';
import { AugmentationsListComponent } from './components/augmentations-list/augmentations-list.component';
import { EquipmentService } from './services/equipment.service';
import { SlotService } from './services/slot.service';
import { StatService } from './services/stat.service';
import { CalculationService } from './services/calculation.service';

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
		CalcDetailsComponent,
		AugmentationSlotComponent,
		AugmentationsListComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		Location,
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		DataService,
		SkillService,
		TooltipService,
		EquipmentService,
		SlotService,
		StatService,
		CalculationService,
		AppDataProvider,
		{ provide: APP_INITIALIZER, useFactory: appDataProviderFactory, deps: [AppDataProvider], multi: true}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function appDataProviderFactory(provider: AppDataProvider) {
	return () => provider.load();
}
