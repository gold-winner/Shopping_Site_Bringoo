import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AppManagerCartService } from '../../../../../../../shared/api/auth/app-manager-cart.service';
import { AppManagerStoreService } from '../../../../../../../shared/api/auth/app-manager-store.service';
import { CrudCartService } from '../../../../../../../shared/api/auth/crud-cart.service';
import {
  CartDto,
  CartEntity,
  CartItemDto,
  CheckoutDto,
  CheckoutInput,
  ProductsInput,
} from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormOutputs } from '../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { BreadCrumbService } from '../../../../../../../shared/services/bread-crumb.service';
import { AbandonShoppingCartAddProductFormComponent } from '../abandoned-shopping-cart-add-new-product-form/abandoned-shopping-cart-add-product-form.component';
import { AbandonShoppingCartCheckoutFormComponent } from '../abandoned-shopping-cart-checkout-form/abandoned-shopping-cart-checkout-form.component';

@UntilDestroy()
@Component({
  selector: 'app-abandoned-shopping-cart-detail',
  templateUrl: './abandoned-shopping-cart-detail.component.html',
  styleUrls: ['abandoned-shopping-cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbandonedShoppingCartDetailComponent implements OnInit {
  form!: UntypedFormGroup;
  checkoutForm: Type<DynamicForm<CheckoutInput>> = AbandonShoppingCartCheckoutFormComponent;
  addProductForm = AbandonShoppingCartAddProductFormComponent;
  dateFormat: string = DATE_TIME_FORMAT;
  isLoading$: Observable<boolean> = this.service.isLoading$;
  cart$: BehaviorSubject<CartEntity | null> = new BehaviorSubject<CartEntity | null>(null);
  cartDetails$: BehaviorSubject<CartDto | null> = new BehaviorSubject<CartDto | null>(null);
  openPanel: string | null = null;
  customerId: string = '';
  storeId: string = '';
  cartId: string = '';
  isProductDeleteModalVisible: boolean = false;
  isProductChangeCountModalVisible: boolean = false;
  deleteId: string | undefined;
  deleteName: string | undefined;
  changeCountId: string | undefined;
  changeCountValue: number | undefined;
  changeCountName: string | undefined;
  isOverWeight: boolean = false;

  addProductSubmit: symbol | undefined;

  checkoutFormInputs: any = { value: null };

  productDetailId: string | null = null;

  checkoutFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: any): void => this.cartCheckout(value),
  };

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly service: CrudCartService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly appManagerStoreService: AppManagerStoreService,
    private readonly appManagerCartService: AppManagerCartService,
  ) {
    this.cartId = this.route.snapshot.params['id'];
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      create_date: [null],
      storeId: [null],
      isActive: [null],
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCartDetails();
    this.setBreadCrumbs();
  }

  openCheckoutForm(cart: CartEntity): void {
    this.customerId = cart.customerId || '';
    this.storeId = cart.storeId || '';
    this.openPanel = 'checkout';
    this.checkoutFormInputs = { submit: Symbol('checkout'), cartDetails: cart };
  }

  openAddProductForm(): void {
    this.openPanel = 'addProduct';
    this.cartDetails$.next({ ...(this.cartDetails$.getValue() as CartDto) });
  }

  onCloseDrawer(): void {
    this.openPanel = null;
  }

  onCheckoutSubmit(): void {
    this.checkoutFormInputs = { submit: Symbol('checkout') };
  }

  onAddProductSubmit(): void {
    this.addProductSubmit = Symbol('addProduct');
    this.onCloseDrawer();
  }

  onProductDelete(item: CartItemDto): void {
    this.deleteId = item.cartItemId;
    this.deleteName = item.name_i18n;
    this.isProductDeleteModalVisible = true;
  }

  onProductChangeCount(item: CartItemDto): void {
    this.changeCountId = item.cartItemId;
    this.changeCountName = item.name_i18n;
    this.changeCountValue = item.inCart;
    this.isProductChangeCountModalVisible = true;
  }

  onProductCancelDelete(): void {
    this.isProductDeleteModalVisible = false;
    this.deleteId = undefined;
    this.deleteName = undefined;
  }

  onProductCancelChangeCount(): void {
    this.isProductChangeCountModalVisible = false;
    this.changeCountId = undefined;
    this.changeCountName = undefined;
    this.changeCountValue = undefined;
  }

  deleteProduct(): void {
    if (this.deleteId) {
      this.appManagerCartService.deleteProduct(this.deleteId).subscribe(() => {
        this.isProductDeleteModalVisible = false;
        this.deleteId = undefined;
        this.deleteName = undefined;
        this.loadCartDetails();
      });
    }
  }

  changeCountProduct(): void {
    if (this.changeCountId && this.changeCountValue) {
      this.appManagerCartService.changeProductCount(this.changeCountId, { count: this.changeCountValue }).subscribe(() => {
        this.isProductChangeCountModalVisible = false;
        this.changeCountId = undefined;
        this.changeCountName = undefined;
        this.changeCountValue = undefined;
        this.loadCartDetails();
      });
    }
  }

  addProducts(productInputs: ProductsInput): void {
    this.openPanel = null;

    this.appManagerCartService.setProducts(productInputs).subscribe(() => {
      this.loadCartDetails();
    });
  }

  acceptCart(): void {
    this.appManagerCartService.accept(this.cartId).subscribe(() => {
      this.loadCartDetails();
    });
  }

  cartCheckout(value: any): void {
    of([])
      .pipe(
        untilDestroyed(this),
        switchMap(() => {
          if (value?.deliveryDate) {
            return this.appManagerStoreService.createReservationForCustomer(this.storeId, {
              customerId: this.customerId,
              deliveryDate: Math.floor(new Date(value.deliveryDate).getTime() / 1000),
            });
          }

          return of([]);
        }),
        switchMap(() =>
          this.appManagerCartService.checkout(this.cartId, {
            ...value,
          }),
        ),
      )
      .subscribe((checkoutDto: CheckoutDto) => {
        if (checkoutDto?.orderId) {
          this.openPanel = null;
          this.goToOrderPage(checkoutDto.orderId);
        }
      });
  }

  loadCartItems(): void {
    this.service
      .findOne(this.cartId, {
        join: ['items', 'customer', 'customer.settings', 'store', 'store.openingHours'],
        softDelete: true,
      })
      .pipe(
        catchError((error: any) => {
          this.goToCartsListPage();
          return throwError(error);
        }),
      )
      .subscribe((cart: CartEntity) => {
        this.form.patchValue(cart);
        this.cart$.next(cart);
      });
  }

  goToCartsListPage(): void {
    this.router.navigate(['/orders/abandoned-shopping-cart']);
  }

  goToOrderPage(orderId: string): void {
    this.router.navigate([`/orders/all/detail/${orderId}`]);
  }

  loadCartDetails(): void {
    this.service.cartDetails(this.cartId).subscribe((cartDto: CartDto) => {
      this.isOverWeight = Number.parseFloat(cartDto.maxWeight.replace(',', '.')) < Number.parseFloat(cartDto.weight.replace(',', '.'));
      this.cartDetails$.next(cartDto);
    });
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([{ path: '', title: 'Detail' }]);
  }

  onClickProductDetails(linkId: string): void {
    this.productDetailId = linkId;
  }

  closeProductDetail(): void {
    this.productDetailId = null;
  }
}
