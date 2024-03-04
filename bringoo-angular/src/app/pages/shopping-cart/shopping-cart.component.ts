import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AppCart } from 'src/shared/api/app-cart';
import { CartDto, CartInfoDto, ProductInput } from 'src/shared/api/data-contracts';

// import { ProductsData } from '../../example/components/cards/cards.mock';

@Component({
  selector: 'ui-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  productsData = null;
  voucherModal: boolean = false;
  deleteModal: boolean = false;
  cartDetailInfo: CartDto | undefined;
  cartData: CartInfoDto | undefined;
  cartChangedData: ProductInput | undefined;
  deletedCartId: string | undefined;
  loading: boolean = false;
  storeUrl: string =
    `${JSON.parse(sessionStorage.getItem('store') ?? '')
      .name_public_short_i18n.toLowerCase()
      .split(' ')
      .join('_')}/` + `products`;

  private notifier: NotifierService;

  constructor(
    public readonly appCart: AppCart,
    private ref: ChangeDetectorRef,
    public route: ActivatedRoute,
    notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
    const store: any = JSON.parse(sessionStorage.store);
    this.appCart.cartDetails(store.id).subscribe(
      (res: CartDto) => {
        this.cartDetailInfo = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeCart(data: ProductInput): void {
    this.cartChangedData = data;
  }

  onChangeCartDetail(data: CartDto): void {
    this.cartDetailInfo = data;
    if (!this.cartDetailInfo) {
      this.loading = false;
      this.deleteModal = false;
    }
  }

  onAddVoucherClick(): void {
    this.voucherModal = true;
  }

  onVoucherModalClose(): void {
    this.voucherModal = false;
  }

  onDeleteItemsClick(): void {
    this.deleteModal = true;
  }

  onDeleteModalClose(): void {
    this.deleteModal = false;
  }

  onDeleteItem(): void {
    this.loading = true;
    this.deletedCartId = this.cartDetailInfo?.id;
    this.ref.detectChanges();
  }

  onCopyCode(code: string): void {
    navigator.clipboard.writeText(code);
  }

  onProcessCheckout(): void {
    if (localStorage.getItem('customerAccessToken')) window.location.href = './checkout';
    else this.notifier.notify('error', 'Please login or register !');
  }

  onSelectOption(): void {}

  ngOnInit(): void {}
}
