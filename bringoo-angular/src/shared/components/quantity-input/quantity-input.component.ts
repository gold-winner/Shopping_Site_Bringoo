import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppCart } from 'src/shared/api/app-cart';
import { CartInfoDto, Iso2Enum, ProductInput } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-quantity-input',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss'],
})
export class QuantityInputComponent implements OnChanges {
  @Input() border: boolean = false;
  @Input() productId: string = '';
  @Input() itemCount!: number;
  @Input() type: string = '';
  @Input() page: string = '';
  @Output() onChangeCart = new EventEmitter<ProductInput>();
  cartinfo: CartInfoDto | undefined;

  constructor(public readonly appCart: AppCart, private ref: ChangeDetectorRef) {}

  onClick(decrement: boolean): void {
    if (this.itemCount === 0 && decrement) {
      return;
    } else {
      let count: number = 0;
      count = decrement ? this.itemCount - 1 : this.itemCount + 1;
      this.changeCart(this.productId, count);
    }
  }

  changeCart(productId: string, count: number): void {
    const dataParams: ProductInput = {
      linkId: productId,
      count: count,
      customerNote: '',
      address: {
        streets: [localStorage.getItem('streets') ?? 'harburg'],
        countryCode: Iso2Enum.DE,
        city: localStorage.getItem('city') ?? 'Hamburg',
        zipCode: localStorage.getItem('postal') ?? '22305',
        location: {
          lat: Number.parseFloat(localStorage.getItem('latitude') ?? '48.4817'),
          lng: Number.parseFloat(localStorage.getItem('longitude') ?? '135.083'),
        },
      },
    };
    this.onChangeCart.emit(dataParams);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemCount) {
      if (this.itemCount >= 0) {
        this.ref.detectChanges();
      }
    }
  }
}
