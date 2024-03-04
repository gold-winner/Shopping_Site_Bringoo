import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDto } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-card-normal',
  templateUrl: './card-normal.component.html',
  styleUrls: ['./card-normal.component.scss'],
})
export class CardNormalComponent {
  @Input() store: StoreDto = {} as StoreDto;
  @Output() onDeliveryClick = new EventEmitter<Event>();
  @Output() onPickupClick = new EventEmitter<Event>();
  @Output() onStoreClick = new EventEmitter<string>();
  heart: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}

  onHeart(h: boolean | undefined): void {
    this.heart = !h;
  }

  onSelectStore(id: string): void {
    this.onStoreClick.emit(id);
  }
}
