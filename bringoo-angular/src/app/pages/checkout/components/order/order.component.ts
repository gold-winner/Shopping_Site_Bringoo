import { Component, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppCart } from 'src/shared/api/app-cart';
import { CheckoutAddressInput, CheckoutDto, CheckoutInput, DeliveryDestinationEnum } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-checkout-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class CheckoutOrderComponent {
  @Input() id: string = '';
  @Input() dAddress: CheckoutAddressInput | undefined;
  @Input() bAddress: CheckoutAddressInput | undefined;
  @Input() phoneCode: string = '';
  @Input() phoneNumber: string = '';
  @Input() destination: string = '';
  email: string = '';
  like: boolean | undefined;
  errorCode: number | undefined;
  location: string = '';
  checkOrder: CheckoutDto | undefined;
  storeUrl: any =
    `${JSON.parse(sessionStorage.getItem('store') ?? '')
      .name_public_short_i18n.toLowerCase()
      .split(' ')
      .join('_')}/` + `products`;

  constructor(public readonly appCart: AppCart, private ref: ChangeDetectorRef) {
    this.email = localStorage.getItem('customerEmail') || '';
    localStorage.setItem('longitude', '53.5511');
    localStorage.setItem('latitude', '9.9937');
    localStorage.setItem('postal', '22303');
    localStorage.setItem('countryCode', 'DE');
    localStorage.setItem('city', 'hamburg');
    localStorage.setItem('streets', 'hamburg');
    localStorage.setItem('countryName', 'Germany');
    this.location = 'Hamburg, Germany';
    this.errorCode = 200;
  }

  onTractOrder(): void {
    if (this.dAddress && this.bAddress) {
      const data: CheckoutInput = {
        deliveryAddress: this.dAddress,
        billingAddress: this.bAddress,
        phoneCountryCode: this.phoneCode,
        phoneNumber: this.phoneNumber,
        deliveryDestination: this.destination === 'HOME' ? DeliveryDestinationEnum.HOME : DeliveryDestinationEnum.NEIGHBOUR,
      };
      this.appCart.checkout(this.id, data).subscribe(
        (res: CheckoutDto) => {
          this.checkOrder = res;
          // window.location.href = this.checkOrder.checkoutUrl;
          this.ref.detectChanges();
        },
        (err: any) => {
          if (err.status === 401) window.location.href = '/';
        },
      );
    }
  }

  onLikeClick(t: boolean): void {
    if (this.like === t) {
      this.like = undefined;
    } else {
      this.like = t;
    }
  }
}
