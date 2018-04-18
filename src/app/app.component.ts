import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { DecorationSlotComponent } from './components/decoration-slot/decoration-slot.component';
import { EquippedSkillsComponent } from './components/equipped-skills/equipped-skills.component';
import { EquippedStatsComponent } from './components/equipped-stats/equipped-stats.component';
import { ItemSlotComponent } from './components/item-slot/item-slot.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ItemType } from './types/item.type';
import { AugmentationSlotComponent } from './components/augmentation-slot/augmentation-slot.component';
import { SlotService } from './services/slot.service';
import { BuildService } from './services/build.service';
import { ModalComponent } from './components/modal/modal.component';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
	public itemTypes = ItemType;

	@ViewChild(EquippedStatsComponent) equippedStatsComponent: EquippedStatsComponent;
	@ViewChild(EquippedSkillsComponent) equippedSkillsComponent: EquippedSkillsComponent;
	@ViewChild(TooltipComponent) tooltipComponent: TooltipComponent;
	@ViewChild('weaponSlot') weaponSlot: ItemSlotComponent;
	@ViewChild('headSlot') headSlot: ItemSlotComponent;
	@ViewChild('chestSlot') chestSlot: ItemSlotComponent;
	@ViewChild('handsSlot') handsSlot: ItemSlotComponent;
	@ViewChild('legsSlot') legsSlot: ItemSlotComponent;
	@ViewChild('feetSlot') feetSlot: ItemSlotComponent;
	@ViewChild('charmSlot') charmSlot: ItemSlotComponent;

	@ViewChild('modal') modal: ModalComponent;

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	selectedAugmentationSlot: AugmentationSlotComponent;

	constructor(
		public slotService: SlotService,
		private buildService: BuildService,
		private changeDetector: ChangeDetectorRef,
		private location: Location
	) { }

	ngOnInit(): void {
		this.slotService.initialize(
			this.weaponSlot,
			this.headSlot,
			this.chestSlot,
			this.handsSlot,
			this.legsSlot,
			this.feetSlot,
			this.charmSlot,
			this.changeDetector
		);

		this.buildService.initialize(this.changeDetector);

		this.buildService.buildIdUpdated$.subscribe(buildId => {
			this.location.replaceState(this.location.path(false), '#' + buildId);
		});

		this.slotService.anySlotSelected$.subscribe(slot => {
			if (this.modal) {
				this.modal.title = 'Items';
				this.modal.isOpen = slot != null;
			}
		});

		this.slotService.itemSelected$.subscribe(item => {
			if (this.modal) { this.modal.isOpen = !item; }
		});

		this.slotService.decorationSelected$.subscribe(decoration => {
			if (this.modal) { this.modal.isOpen = !decoration; }
		});

		this.slotService.augmentationSelected$.subscribe(augmentation => {
			if (this.modal) { this.modal.isOpen = !augmentation; }
		});
	}

	ngAfterViewInit() {
		setTimeout(() => this.buildService.loadBuild(location.hash), 100);
	}

	moveTooltip(event: MouseEvent) {
		event.preventDefault();
		this.tooltipComponent.move(event.clientX, event.clientY);
	}

	openModal() {
		if (this.modal.isOpen) {
			this.modal.close();
		} else {
			this.modal.open();
		}
	}
}
