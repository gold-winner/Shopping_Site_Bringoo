import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss'],
})
export class CardShopComponent {
  @Input() store: StoreDto | undefined;
  @Output() onStoreClick = new EventEmitter<string>();
  @Output() onFavClick = new EventEmitter<string>();
  @Output() onTypeClick = new EventEmitter<string>();
  @Output() onShipmentClick = new EventEmitter<string>();
  @Output() onMinClick = new EventEmitter<string>();
  @Output() onFeatureClick = new EventEmitter<string>();
  bgColor: string = '#014171';
  heart: boolean = false;

  onHeart(h: boolean | undefined): void {
    this.heart = !h;
  }

  onClickType(id: string): void {
    this.onTypeClick.emit(id);
  }

  onClickShipment(id: string): void {
    this.onShipmentClick.emit(id);
  }

  onClickMin(id: string): void {
    this.onMinClick.emit(id);
  }

  onClickFeature(id: string): void {
    this.onFeatureClick.emit(id);
  }

  onSelectStore(id: string): void {
    this.onStoreClick.emit(id);
  }
}
