import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CustomerAddressEntity, OrderAddressEntity, StoreAddressEntity } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressCardComponent {
  @Input() isEdited: boolean = false;
  @Input() label: string = 'Delivery Address:';
  @Input() placeHolder: string = '';
  @Input() gMapRoute: OrderAddressEntity | undefined;
  @Output() edit: EventEmitter<CustomerAddressEntity | StoreAddressEntity> = new EventEmitter<CustomerAddressEntity | StoreAddressEntity>();

  _address: CustomerAddressEntity | StoreAddressEntity | OrderAddressEntity | undefined;

  get gMapRouteLink(): string {
    if (this._address?.location && this.gMapRoute?.location) {
      const { lat, lng } = this._address.location;
      const { lat: customerLat, lng: customerLng } = this.gMapRoute.location;
      return `https://www.google.com/maps/dir/${lat},${lng}/${customerLat},${customerLng}/@${lat},${lng}`;
    }
    return '';
  }

  @Input() set address(
    value:
      | (CustomerAddressEntity | CustomerAddressEntity[])
      | (StoreAddressEntity | StoreAddressEntity[])
      | (OrderAddressEntity | OrderAddressEntity[])
      | any,
  ) {
    if (Array.isArray(value)) {
      const mainAddress: StoreAddressEntity = value.find((v: any) => v.addressType === 'MAIN') as StoreAddressEntity;
      if (mainAddress) {
        this._address = mainAddress;
      }
    } else {
      this._address = value;
    }
  }

  onEdit(): void {
    this.edit.emit();
  }
}
