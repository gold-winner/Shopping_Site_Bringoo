import { Component } from '@angular/core';

import { CardAddressData, DeliveryStoreData, PaymentMethodData, StoreData } from './cards.mock';
@Component({
  selector: 'ui-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  deliveryStoreData = DeliveryStoreData;
  productsData = null;
  cardAddressData = CardAddressData;
  paymentMethodData = PaymentMethodData;
  storeData = StoreData;
  selectedAddress: string | undefined;

  onSelectAddress(id: string): void {
    this.selectedAddress = id;
  }
}
