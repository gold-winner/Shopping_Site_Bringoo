import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AppCart } from 'src/shared/api/app-cart';
import { CartDto, CartInfoDto, ProductInput } from 'src/shared/api/data-contracts';

// import { ProductsData } from '../../../app/example/components/cards/cards.mock';
@Component({
  selector: 'ui-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent {
  @Input() cartDetailInfo: CartDto | undefined;
  @Output() onCloseSidebar = new EventEmitter<Event>();
  @Output() onCartDetail = new EventEmitter<ProductInput>();
  productsData = null;
  voucherModal: boolean = false;
  cartData: CartInfoDto | undefined;
  private notifier: NotifierService;

  constructor(public readonly appCart: AppCart, private ref: ChangeDetectorRef, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onChangeCart(data: ProductInput): void {
    this.onCartDetail.emit(data);
  }

  onAddVoucherClick(): void {
    this.voucherModal = true;
  }

  onVoucherModalClose(): void {
    this.voucherModal = false;
  }

  onProcessCheckout(): void {
    if (localStorage.getItem('customerAccessToken')) window.location.href = './checkout';
    else this.notifier.notify('error', 'Please login or register !');
  }

  onSelectOption(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartDetailInfo) {
      if (this.cartDetailInfo) {
        this.ref.detectChanges();
      } else {
        const store: any = JSON.parse(sessionStorage.store);
        this.appCart.cartDetails(store.id).subscribe(
          (res: CartDto) => {
            this.cartDetailInfo = res;
            this.ref.detectChanges();
          },
          (err: any) => {
            if (err.error.message === 'Cart not found') this.cartDetailInfo = undefined;
            this.ref.detectChanges();
          },
        );
      }
    }
  }
}
