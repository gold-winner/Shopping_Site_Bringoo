import { Pipe, PipeTransform } from '@angular/core';

import { StoreAddressEntity, StoreAddressTypeEnum } from '../api/auth/data-contracts';

@Pipe({ name: 'storeAddress' })
export class StoreAddressPipe implements PipeTransform {
  transform(addresses?: StoreAddressEntity[]): string {
    if (!addresses || addresses.length === 0) {
      return '&#45;&#45;';
    }

    const mainAddress: StoreAddressEntity =
      addresses.find((address: StoreAddressEntity) => (address.addressType = StoreAddressTypeEnum.MAIN)) ?? addresses[0];

    return (
      `${mainAddress.country ?? ''} ${mainAddress.city ?? ''},` +
      ` ${mainAddress.streetName ?? ''} ${mainAddress.streetNumber ?? ''} ${mainAddress.floorNumber ?? ''}`
    );
  }
}
