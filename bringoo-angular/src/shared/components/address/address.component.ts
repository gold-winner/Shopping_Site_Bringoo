import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreSchedulerDayDto } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() store!: any;
  @Input() selectedStore: string | undefined;
  @Input() deliverySlots: StoreSchedulerDayDto[] = [];
  @Output() onSelectStore: EventEmitter<string> = new EventEmitter();
  @Output() onSelectSlot: EventEmitter<string> = new EventEmitter();
  expanded: boolean = false;

  onExpandStore(id: string | undefined): void {
    this.onSelectStore.emit(id);
    this.expanded = !this.expanded;
  }

  onSelect(): void {
    this.onSelectSlot.emit();
  }

  ngOnInit(): void {}
}
