import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { add, format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { CrudCartService } from '../../../../../../shared/api/auth/crud-cart.service';
import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { CartEntity, OrderEntity, OrderStatusEnum, Pageable } from '../../../../../../shared/api/auth/data-contracts';
import { analyticsGMapStyle } from '../../../../../../shared/config/analytics-g-map-style.config';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { ORDER_CANCEL_STATUSES } from '../../../../../../shared/config/order-cancel-statuses.config';
import { ORDER_COMPLETE_STATUSES } from '../../../../../../shared/config/order-complete-statuses.config';
import { GoogleMapLoaderService } from '../../../../../../shared/services/google-map-loader.service';
import { defaultFilter } from '../../../../../../shared/types/crud-filters.types';
import { OrdersFiltersType } from '../../../../../../shared/types/orders.filters.type';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

@UntilDestroy()
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block h-100p d-flex flex-column' },
})
export class HomeDashboardComponent implements OnInit {
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  markerClustererImagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  mapOptions: google.maps.MapOptions = {
    center: { lat: 53.5586941, lng: 9.78774 },
    zoom: 10,
    disableDefaultUI: true,
    styles: analyticsGMapStyle,
  };

  orderCanceledStatuses: Set<OrderStatusEnum> = ORDER_CANCEL_STATUSES;
  orderCompleteStatuses: Set<OrderStatusEnum> = ORDER_COMPLETE_STATUSES;
  ordersPayment: Set<OrderStatusEnum> = new Set<OrderStatusEnum>([
    OrderStatusEnum.PAYMENT_PENDING,
    OrderStatusEnum.PENDING,
    OrderStatusEnum.READY,
  ]);

  cart$!: Observable<CartEntity[]>;
  orders$!: Observable<OrderEntity[]>;

  filters: BehaviorSubject<OrdersFiltersType<string>> = new BehaviorSubject<OrdersFiltersType<string>>({
    dateStart: '',
    dateEnd: '',
    storeRegionCode: '',
    storeId: '',
  });

  form = new FormGroup<ToFormGroupType<OrdersFiltersType<string>>>({
    storeId: new FormControl(null),
    storeRegionCode: new FormControl(null),
    dateStart: new FormControl(null),
    dateEnd: new FormControl(null),
  });

  constructor(
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly cartService: CrudCartService,
    private readonly orderService: CrudOrderService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.createCartObserver();
    this.createOrderObserver();
  }

  buildForm(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((filters: typeof this.form.value) => this.filters.next(filters as any));

    this.form.patchValue({
      dateStart: format(add(new Date(), { days: -7 }), DATE_FORMAT),
      dateEnd: format(new Date(), DATE_FORMAT),
    });
  }

  createCartObserver(): void {
    this.cart$ = this.filters.asObservable().pipe(
      switchMap(
        (filters: OrdersFiltersType<string>): Observable<Pageable & { items?: CartEntity[] }> => {
          const $and: defaultFilter[] = this.getFiltersArray(filters, 'create_date');

          $and.push({ 'customer.addresses.location': { $notnull: true } });

          const search: string = JSON.stringify({ $and });
          return this.cartService.find({
            fields: 'id,customerId,cartCode,create_date',
            join: ['customer||role', 'customer.settings||firstName,lastName', 'customer.addresses', 'store||name_i18n'],
            s: search,
          });
        },
      ),
      map(({ items }: Pageable & { items?: CartEntity[] }): CartEntity[] => items ?? []),
    );
  }

  createOrderObserver(): void {
    this.orders$ = this.filters.asObservable().pipe(
      switchMap(
        (filters: OrdersFiltersType<string>): Observable<Pageable & { items?: OrderEntity[] }> => {
          const $and: defaultFilter[] = this.getFiltersArray(filters, 'deliveryDate');

          $and.push({ 'orderBillingAddress.location': { $notnull: true } });

          return this.orderService.find({
            fields: 'id,orderStatus,orderNumber,deliveryDate,storeId',
            join: ['orderBillingAddress||location', 'store||logoUrl,name_i18n'],
            s: JSON.stringify({ $and }),
          });
        },
      ),
      filter(({ items }: Pageable & { items?: OrderEntity[] }) => !!items),
      map(({ items }: Pageable & { items?: OrderEntity[] }): OrderEntity[] => items ?? []),
    );
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow): void {
    infoWindow.open(marker);
  }

  getFiltersArray({ storeId, storeRegionCode, dateStart, dateEnd }: OrdersFiltersType<string>, dateFilterField: string): defaultFilter[] {
    const filters: defaultFilter[] = [];

    if (dateStart) {
      filters.push({ [dateFilterField]: { $gte: `${dateStart} 00:00:00` } });
    }

    if (dateEnd) {
      filters.push({ [dateFilterField]: { $lte: `${dateEnd} 23:59:59` } });
    }

    if (storeId) {
      filters.push({ storeId });
    }

    if (storeRegionCode) {
      filters.push({ 'store.storeRegionCode': storeRegionCode });
    }
    return filters;
  }
}
