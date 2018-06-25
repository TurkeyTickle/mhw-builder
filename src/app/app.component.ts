import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, OnInit, HostListener } from '@angular/core';
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
import { PointerType } from './types/pointer.type';
import { DataService } from './services/data.service';
import { EquipmentCategoryType } from './types/equipment-category.type';

@Component({
	selector: 'mhw-builder-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
	public equipmentCategoryTypes = EquipmentCategoryType;
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

	@ViewChild('itemListModal') itemListModal: ModalComponent;
	@ViewChild('changeLogModal') changeLogModal: ModalComponent;
	@ViewChild('contributorsModal') contributorsModal: ModalComponent;

	equipmentVisible = true;
	statsVisible = true;

	modalTitle: string;

	selectedEquipmentSlot: ItemSlotComponent;
	selectedDecorationSlot: DecorationSlotComponent;
	selectedAugmentationSlot: AugmentationSlotComponent;

	@HostListener('window:resize')
	onResize() {
		this.respondToResize();
	}

	constructor(
		public slotService: SlotService,
		public dataService: DataService,
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

		this.respondToResize();

		this.buildService.initialize(this.changeDetector);

		this.buildService.buildIdUpdated$.subscribe(buildId => {
			this.location.replaceState(this.location.path(false), '#' + buildId);
		});

		this.slotService.anySlotSelected$.subscribe(slot => {
			if (this.itemListModal) {
				this.itemListModal.title = `Select ${slot.slotName}`;
				this.itemListModal.isOpen = slot != null;
			}
		});

		this.slotService.itemSelected$.subscribe(item => {
			if (this.itemListModal) {
				this.itemListModal.isOpen = !item;
			}
		});

		this.slotService.decorationSelected$.subscribe(decoration => {
			if (this.itemListModal) {
				this.itemListModal.isOpen = !decoration;
			}
		});

		this.slotService.augmentationSelected$.subscribe(augmentation => {
			if (this.itemListModal) {
				this.itemListModal.isOpen = !augmentation;
			}
		});
	}

	ngAfterViewInit() {
		setTimeout(() => this.buildService.loadBuild(location.hash), 300);
	}

	respondToResize() {
		if (window.innerWidth <= 768) {
			if (!this.equipmentVisible && this.statsVisible) {
				this.equipmentVisible = false;
				this.statsVisible = true;
			} else {
				this.equipmentVisible = true;
				this.statsVisible = false;
			}
		} else {
			this.equipmentVisible = true;
			this.statsVisible = true;
		}
	}

	equipmentSelected() {
		this.equipmentVisible = true;
		this.statsVisible = false;
	}

	statsSelected() {
		this.equipmentVisible = false;
		this.statsVisible = true;
	}

	moveTooltip(event: PointerEvent) {
		if (event.pointerType == PointerType.Mouse) {
			this.tooltipComponent.move(event.clientX, event.clientY);
		}
	}

	openItemListModal() {
		if (this.itemListModal.isOpen) {
			this.itemListModal.close();
		} else {
			this.itemListModal.open();
		}
	}

	openChangeLog() {
		this.changeLogModal.open();
	}

	openContributors() {
		this.contributorsModal.open();
	}
}
