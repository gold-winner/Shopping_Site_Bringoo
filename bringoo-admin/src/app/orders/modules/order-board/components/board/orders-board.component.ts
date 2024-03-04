import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parse } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity, OrderStatusEnum, Pageable } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';

@Component({
  selector: 'app-orders-board',
  templateUrl: 'orders-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersBoardComponent implements OnInit {
  dateFormat: string = DATE_FORMAT;
  statuses: { status: string; orderStatuses: OrderStatusEnum[] }[] = [
    { orderStatuses: [OrderStatusEnum.NEW], status: 'New' },
    { orderStatuses: [OrderStatusEnum.PAYMENT_EXPIRED], status: 'Payment expired' },
    {
      orderStatuses: [OrderStatusEnum.PAYMENT_ERROR, OrderStatusEnum.PAYMENT_PENDING],
      status: 'Payment',
    },
    { orderStatuses: [OrderStatusEnum.PAID], status: 'Paid' },
    { orderStatuses: [OrderStatusEnum.PENDING], status: 'Pending' },
    { orderStatuses: [OrderStatusEnum.READY], status: 'Ready' },
    { orderStatuses: [OrderStatusEnum.PICKING], status: 'Picking' },
    {
      orderStatuses: [OrderStatusEnum.DELIVERY_STARTED, OrderStatusEnum.DELIVERY, OrderStatusEnum.SHIPMENT],
      status: 'Delivery',
    },
    {
      orderStatuses: [OrderStatusEnum.CANCELED, OrderStatusEnum.CANCELED_BY_MANAGER, OrderStatusEnum.CANCELED_NO_PRODUCT],
      status: 'Canceled',
    },
    {
      orderStatuses: [
        OrderStatusEnum.COMPLETE,
        OrderStatusEnum.COMPLETE_TERMINATION_REFUND,
        OrderStatusEnum.COMPLETE_TERMINATION_NO_REFUND,
      ],
      status: 'Complete',
    },
  ];

  orderFields: CrudFields<OrderEntity> = [
    'orderStatus',
    'orderNumber',
    'deliveryComment',
    'deliveryDate',
    'create_date',
    'actualDeliveryTime',
    'deliveryDateTimeTo',
    'deliveryDateTimeFrom',
    'deliveryVatAmount',
    'deliveryVatRate',
  ];

  orderJoin: string[] = [
    'customer||id',
    'customer.settings||customerNumber',
    'store||name_i18n,storeRegionCode,logoUrl',
    'store.region||name_i18n',
  ];

  isLoading$: Observable<boolean> = this.service.isLoading$;

  filters: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  total: number = 0;
  page: number = 1;
  pageSize: number = 15;
  form!: UntypedFormGroup;

  ordersStatuses: { ordersObserver: Observable<Pageable & { items?: OrderEntity[] }>; status: string }[] = this.statuses.map(
    ({
      status,
      orderStatuses,
    }: {
      status: string;
      orderStatuses: OrderStatusEnum[];
      // eslint-disable-next-line unicorn/consistent-function-scoping
    }): { ordersObserver: Observable<Pageable & { items?: OrderEntity[] }>; status: string } => ({
      ordersObserver: this.getObserver(orderStatuses),
      status,
    }),
  );

  constructor(
    private readonly service: CrudOrderService,
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [null],
      storeRegion: [null],
      date: [new Date()],
    });
    this.form.patchValue({
      ...this.route.snapshot.queryParams,
      ...(this.route.snapshot.queryParams.date && { date: parse(this.route.snapshot.queryParams.date, DATE_FORMAT, new Date()) }),
    });
    this.pushFilters(this.form.value);
    this.form.valueChanges.subscribe((filters: { search: string; storeRegion: string; date: Date }) => this.pushFilters(filters));
  }

  pushFilters(filters: { search: string; storeRegion: string; date: Date }): void {
    const formatDate: string = format(filters.date, DATE_FORMAT);
    this.router.navigate([], { queryParams: { ...filters, date: formatDate }, replaceUrl: true });

    const s: any = { $and: [{ deliveryDate: formatDate }] };
    if (filters.search) {
      s.$and.push({ $or: [{ orderNumber: { $contL: filters.search } }, { 'store.name_i18n': { $contL: filters.search } }] });
    }
    if (filters.storeRegion) {
      s.$and.push({ 'store.storeRegionCode': filters.storeRegion });
    }
    this.filters.next(s);
  }

  getObserver(statuses: OrderStatusEnum[]): Observable<Pageable & { items?: OrderEntity[] }> {
    return this.filters.asObservable().pipe(
      tap(() => (this.total = 0)),
      switchMap(
        (filters: any | null): Observable<Pageable & { items?: OrderEntity[] }> =>
          this.service.find({
            limit: this.pageSize,
            fields: this.orderFields.join(','),
            join: this.orderJoin,
            s: JSON.stringify({
              $and: [...filters.$and, { orderStatus: { $in: statuses } }],
            }),
            sort: ['deliveryDateTimeTo,ASC'],
            page: this.page,
          }),
      ),
      tap(({ total }: Pageable & { items?: OrderEntity[] }) => {
        if (total > this.total) {
          this.total = total;
        }
      }),
    );
  }

  onChangePageIndex(newPageIndex: number): void {
    this.page = newPageIndex;
    this.filters.next(this.filters.value);
  }

  onChangePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.filters.next(this.filters.value);
  }
}
