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
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { SetBonusDetailsComponent } from './components/set-bonus-details/set-bonus-details.component';
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
import { BuildService } from './services/build.service';
import { AugmentationDetailsComponent } from './components/augmentation-details/augmentation-details.component';
import { ModalComponent } from './components/modal/modal.component';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { DecorationListComponent } from './components/decoration-list/decoration-list.component';
import { ArmorListComponent } from './components/armor-list/armor-list.component';
import { WeaponListComponent } from './components/weapon-list/weapon-list.component';
import { CharmListComponent } from './components/charm-list/charm-list.component';
import { DataModule } from './data/data.module';
import { AmmoCapacitiesComponent } from './components/ammo-capacities/ammo-capacities.component';
import { KinsectSlotComponent } from './components/kinsect-slot/kinsect-slot.component';
import { KinsectListComponent } from './components/kinsect-list/kinsect-list.component';
import { KinsectDetailsComponent } from './components/kinsect-details/kinsect-details.component';

@NgModule({
	declarations: [
		AppComponent,
		TooltipComponent,
		ItemSlotComponent,
		WeaponListComponent,
		ArmorListComponent,
		CharmListComponent,
		DecorationListComponent,
		EquippedStatsComponent,
		EquippedSkillsComponent,
		DecorationSlotComponent,
		ItemDetailsComponent,
		DecorationDetailsComponent,
		SkillDetailsComponent,
		SetBonusDetailsComponent,
		CalcDetailsComponent,
		AugmentationSlotComponent,
		AugmentationsListComponent,
		AugmentationDetailsComponent,
		ModalComponent,
		AmmoCapacitiesComponent,
		KinsectSlotComponent,
		KinsectListComponent,
		KinsectDetailsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		VirtualScrollModule,
		DataModule
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
		BuildService,
		AppDataProvider,
		{ provide: APP_INITIALIZER, useFactory: appDataProviderFactory, deps: [AppDataProvider], multi: true}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function appDataProviderFactory(provider: AppDataProvider) {
	return () => provider.load().toPromise();
}
