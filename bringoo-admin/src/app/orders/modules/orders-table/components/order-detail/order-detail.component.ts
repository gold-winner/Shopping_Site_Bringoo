import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs/operators';

import { AppManagerReorderService } from '../../../../../../shared/api/auth/app-manager-reorder.service';
import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { CrudStaffService } from '../../../../../../shared/api/auth/crud-staff.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { CrudStoreAddressService } from '../../../../../../shared/api/auth/crud-store-address.service';
import {
  CartDto,
  CustomerEntity,
  CustomerRoleEnum,
  OrderDetailsDto,
  OrderEntity,
  OrderJobEntity,
  OrderJobTypeEnum,
  OrderPriorityEnum,
  OrderStatusEnum,
  Pageable,
  StaffEntity,
  StoreAddressEntity,
  StoreAddressTypeEnum,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { OrderUpdateService } from '../../../../../../shared/api/auth/order-update.service';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { ORDER_END_STATUSES } from '../../../../../../shared/config/order-end-statuses.config';
import { isNonNull } from '../../../../../../shared/helpers/is-non-null.helper';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailComponent implements OnInit {
  openPanel:
    | 'messageForShopper'
    | 'deliveryComment'
    | 'orderDeliveryAddress'
    | 'orderBillingAddress'
    | 'driver'
    | 'picker'
    | 'cancelOption'
    | 'updateTags'
    | 'updateReceiptsImages'
    | 'updateReceiptNumber'
    | 'updateVATReceiptsImages'
    | 'updateTotalShopAmount'
    | null = null;

  orderReload: BehaviorSubject<symbol> = new BehaviorSubject<symbol>(Symbol('reload'));
  linkId: Subject<string | null> = new Subject<string | null>();

  driverJobType: OrderJobTypeEnum = OrderJobTypeEnum.DRIVE;
  pickerJobType: OrderJobTypeEnum = OrderJobTypeEnum.PICK;
  orderCompleteStatuses: Set<OrderStatusEnum> = ORDER_END_STATUSES;
  orderId: string = this.route.snapshot.params['id'];
  storeId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  store$: Observable<StoreEntity> = this.storeId.asObservable().pipe(
    distinctUntilChanged(),
    filter(isNonNull),
    switchMap(
      (storeId: string): Observable<StoreEntity> =>
        this.crudStoreService.findOne(storeId, { softDelete: true, join: ['openingHours', 'vendorType', 'currency', 'addresses'] }),
    ),
  );

  orderDetails$!: Observable<OrderDetailsDto>;
  order$!: Observable<OrderEntity>;
  customer!: CustomerEntity & any;
  receiptUrls: string[] = [];
  storeAddress!: StoreAddressEntity;

  join: string[] = [
    'jobs',
    'jobs.staffId',
    'orderDeliveryAddress',
    'orderDeliveryAddress.country',
    'orderBillingAddress',
    'orderBillingAddress.country',
    'orderTransactions',
    'orderItems',
    'orderType',
    'ageVerification',
    'customer||isPhoneNumberVerified',
    'store||timeZone,orderCantBeCanceledWhilePick',
    'store.currency||symbol',
  ];

  fields: string = [
    'cancelDescription',
    'orderNumber',
    'initialOrderWeight',
    'actualOrderWeight',
    'orderStatus',
    'totalAmount',
    'totalShopAmount',
    'checkoutUrl',
    'orderPriority',
    'orderType',
    'deliveryPrice',
    'deliveryComment',
    'messageForShopper',
    'invoiceNumber',
    'receiptNumber',
    'receiptUrls',
    'receiptVatUrls',
    'orderTransactions',
    'phoneNumber',
    'phoneCountryCode',
    'create_date',
    'customerId',
    'storeId',
    'ignoredBy',
    'deliveryDate',
    'deliveryDateTimeFrom',
    'deliveryDateTimeTo',
    'payDate',
    'actualDeliveryTime',
    'tags',
    'deliveryVatRate',
    'deliveryVatAmount',
  ].join(',');

  disableCancelButtonStatuses: Set<OrderStatusEnum> = new Set(ORDER_END_STATUSES.values());

  dateTimeFormat: string = DATE_TIME_FORMAT;
  timeFormat: string = TIME_FORMAT;
  orderNumber: string = '';

  pickerId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  driverId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  picker$: Observable<StaffEntity> = this.pickerId.asObservable().pipe(
    untilDestroyed(this),
    filter<string>(Boolean),
    switchMap((id: string): Observable<StaffEntity> => this.staffService.findOne(id, { join: ['settings'], softDelete: true })),
  );

  driver$: Observable<StaffEntity> = this.driverId.asObservable().pipe(
    untilDestroyed(this),
    filter<string>(Boolean),
    switchMap((id: string): Observable<StaffEntity> => this.staffService.findOne(id, { join: ['settings'], softDelete: true })),
  );

  orderPriorityFC: FormControl<OrderPriorityEnum> = new FormControl<OrderPriorityEnum>(
    OrderPriorityEnum.LOW,
    Validators.required,
  ) as FormControl<OrderPriorityEnum>;

  orderPriorities: OrderPriorityEnum[] = Object.values(OrderPriorityEnum);

  isLoading$: Observable<boolean> = this.appManagerReorderService.isLoading$;

  constructor(
    private readonly service: CrudOrderService,
    private readonly orderService: OrderUpdateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly staffService: CrudStaffService,
    private readonly crudStoreAddressService: CrudStoreAddressService,
    private readonly crudStoreService: CrudStoreService,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly appManagerReorderService: AppManagerReorderService,
    private readonly ngZone: NgZone,
    private readonly nzNotification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  orderToCart(orderId: string | undefined, customerId: string | undefined): void {
    if (orderId && customerId) {
      this.appManagerReorderService.createCartFromOrder({ orderId, customerId }).subscribe((cart: CartDto) => {
        if (cart?.id) {
          this.goToCartPage(cart.id);
        }
      });
    }
  }

  goToCartPage(cartId: string): void {
    this.ngZone.run(() => this.router.navigate([`/orders/abandoned-shopping-cart/${cartId}`]));
  }

  getStoreAddress(id?: string): void {
    if (!id) {
      return;
    }
    this.crudStoreAddressService
      .find({ s: JSON.stringify({ storeId: id, addressType: StoreAddressTypeEnum.MAIN }), join: ['country'] })
      .subscribe((stores: Pageable & { items?: StoreAddressEntity[] }) => stores.items && (this.storeAddress = stores.items[0]));
  }

  getOrders(): void {
    this.orderDetails$ = this.orderReload.asObservable().pipe(
      switchMap(
        (): Observable<OrderDetailsDto> =>
          this.service.details(this.route.snapshot.params['id']).pipe(
            take(1),
            tap((order: OrderDetailsDto) => {
              this.setBreadCrumbs(order.orderNumber);
            }),
          ),
      ),
    );

    this.order$ = this.orderReload.asObservable().pipe(
      switchMap(
        (): Observable<OrderEntity> => this.service.findOne(this.route.snapshot.params['id'], { join: this.join, fields: this.fields }),
      ),
      tap(({ storeId }: OrderEntity) => storeId && this.storeId.next(storeId)),
      tap((order: OrderEntity) => {
        if (order?.store?.orderCantBeCanceledWhilePick) {
          this.disableCancelButtonStatuses.add(OrderStatusEnum.PICKING);
        }
        this.orderPriorityFC.setValue(order.orderPriority);
        this.customer = {
          id: order.customerId,
          role: CustomerRoleEnum.CUSTOMER,
          email: order.orderBillingAddress?.email,
          settings: {
            firstName: order.orderBillingAddress?.firstName,
            lastName: order.orderBillingAddress?.lastName,
            customerNumber: order.orderBillingAddress?.customerNumber,
          },
        };

        const pickerJob: OrderJobEntity | undefined = order.jobs?.find(
          (orderJob: OrderJobEntity) => orderJob.jobType === OrderJobTypeEnum.PICK,
        );
        if (pickerJob?.staffId) {
          this.pickerId.next(pickerJob.staffId);
        }

        const driverJob: OrderJobEntity | undefined = order.jobs?.find(
          (orderJob: OrderJobEntity) => orderJob.jobType === OrderJobTypeEnum.DRIVE,
        );

        if (driverJob?.staffId) {
          this.driverId.next(driverJob.staffId);
        }

        this.getStoreAddress(order.storeId);
      }),
    );
  }

  setBreadCrumbs(orderNumber?: string): void {
    if (!orderNumber) return;
    this.breadCrumbService.resetBreadCrumbs([
      { path: '/orders', title: 'Orders' },
      { path: '/orders/all', title: 'Orders' },
      { path: 'this', title: orderNumber },
    ]);
  }

  onClosePanel(status: boolean): void {
    if (status) {
      this.reloadPage();
    }
    this.openPanel = null;
  }

  reloadPage(): void {
    this.orderReload.next(Symbol('reload'));
  }

  onCloseProductsPanel(): void {
    this.linkId.next(null);
  }

  onSavePriorityChange(): void {
    this.orderService
      .managerUpdateOrderValues(this.orderId, {
        orderPriority: this.orderPriorityFC.value,
      })
      .subscribe(() => {
        this.nzNotification.success('Order Priority Changed', `Priority changed to ${this.orderPriorityFC.value}`);
        this.orderPriorityFC.reset();
        this.reloadPage();
      });
  }

  onCancelPriorityChange(value: OrderPriorityEnum): void {
    this.orderPriorityFC.reset(value);
  }
}
