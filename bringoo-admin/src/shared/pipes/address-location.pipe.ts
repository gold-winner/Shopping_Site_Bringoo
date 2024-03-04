import { Pipe, PipeTransform } from '@angular/core';

import { LocationDto, StoreAddressEntity, StoreAddressTypeEnum } from '../api/auth/data-contracts';

@Pipe({ name: 'addressLocation' })
export class AddressLocationPipe implements PipeTransform {
  transform(addresses?: StoreAddressEntity[]): LocationDto | null {
    if (!addresses || addresses.length === 0) {
      return null;
    }

    const mainAddress: StoreAddressEntity =
      addresses.find((address: StoreAddressEntity) => (address.addressType = StoreAddressTypeEnum.MAIN)) ?? addresses[0];

    return mainAddress.location ?? null;
  }
}
