import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import {
  OrderedEnum,
  OrdersWithStaffInformationDto,
  OrdersWithStaffInformationFilterInput,
  Pageable,
} from '../../../../../../shared/api/auth/data-contracts';
import { OrderService } from '../../../../../../shared/api/auth/order.service';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { BacklogContainersEnum } from '../../enums/backlog-containers.enum';
import { BacklogService } from '../../services/backlog.service';

@Component({
  selector: 'app-backlog-orders',
  templateUrl: 'backlog-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class BacklogOrdersComponent implements OnInit {
  connectTo: string[] = [];

  private routeCreateContainers: string[] = [];
  @Input() set createRouteContainers(values: string[]) {
    this.connectTo = [...values, ...this.routeContainers];
    this.routeCreateContainers = values;
  }

  private routeContainers: string[] = [];
  @Input() set routeIds(values: string[]) {
    this.connectTo = values;
    this.connectTo = [...values, ...this.routeCreateContainers];
    this.routeContainers = values;
  }

  list: OrdersWithStaffInformationDto[] = [];
  total: number = 0;
  canLoadMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  expand: boolean = true;
  isUpdate: boolean = false;

  sortForm = new FormGroup({
    timeStart: new FormControl<OrderedEnum | null>(null),
    timeEnd: new FormControl<OrderedEnum | null>(null),
  });

  searchSubject: BehaviorSubject<OrdersWithStaffInformationFilterInput> = new BehaviorSubject<OrdersWithStaffInformationFilterInput>({
    page: 1,
    limit: 10,
    hasRoute: false,
    deliveryDate: format(new Date(), DATE_FORMAT),
  });

  isLoading$: Observable<boolean> = this.orderService.isLoading$;

  containerId: BacklogContainersEnum = BacklogContainersEnum.orders;

  constructor(private readonly orderService: OrderService, private readonly backlogService: BacklogService) {}

  ngOnInit(): void {
    this.backlogService.updatedExcludedOrders$
      .pipe(
        tap(() => {
          const { excludeOrderIds, ...input } = this.searchSubject.getValue();
          this.isUpdate = true;

          this.searchSubject.next({
            ...input,
            ...(this.backlogService.excludedOrderIds.size > 0 && { excludeOrderIds: [...this.backlogService.excludedOrderIds.values()] }),
          });
        }),
      )
      .subscribe();

    this.backlogService.updateOrders$.subscribe(() => {
      this.reloadOrders();
    });

    this.searchSubject
      .pipe(
        filter(() => this.expand),
        switchMap(({ page, limit, ...input }: OrdersWithStaffInformationFilterInput) => {
          const pageLimit: Pick<OrdersWithStaffInformationFilterInput, 'page' | 'limit'> = { page, limit };

          if (this.isUpdate) {
            pageLimit.page = 1;
            pageLimit.limit = page * limit;
          }

          return this.orderService.ordersWithStaffInformation({
            ...input,
            ...pageLimit,
          });
        }),
      )
      .subscribe(({ items, page, pageCount, total }: Pageable & { items?: OrdersWithStaffInformationDto[] }) => {
        if (items) {
          if (this.isUpdate) {
            this.list = [...items];
            this.isUpdate = false;
          } else {
            this.list = [...this.list, ...items];
          }
        } else {
          this.list = [];
        }
        this.total = total;

        this.canLoadMore.next(pageCount > page);
      });
    this.onChangeSorting();
  }

  onLoadMore(): void {
    const { page, ...input } = this.searchSubject.getValue();

    this.searchSubject.next({
      ...input,
      page: page + 1,
    });
  }

  onReload(event: MouseEvent): void {
    event.stopPropagation();
    this.reloadOrders();
  }

  reloadOrders(): void {
    if (this.expand) {
      const { page, limit, ...filters } = this.searchSubject.getValue();

      this.expand = true;
      this.orderService
        .ordersWithStaffInformation({
          page: 1,
          limit: page === 1 ? limit : (page - 1) * limit,
          ...filters,
        })
        .subscribe(({ items, page, pageCount, total }: Pageable & { items?: OrdersWithStaffInformationDto[] }) => {
          if (items) {
            this.list = [...items];
          }
          this.total = total;
          this.canLoadMore.next(pageCount > page);
        });
    }
  }

  onCreateRoute(event: MouseEvent): void {
    event.stopPropagation();
    this.backlogService.createNewRoute();
  }

  onExpandChanged(status: boolean): void {
    this.expand = status;
    this.reloadOrders();
  }

  onChangeSorting(): void {
    this.sortForm.valueChanges.subscribe(({ timeStart, timeEnd }: typeof this.sortForm.value) => {
      const { timeStartSort, timeEndSort, ...filters } = this.searchSubject.getValue();

      this.isUpdate = true;
      this.searchSubject.next({
        ...filters,
        ...(timeStart && { timeStartSort: timeStart }),
        ...(timeEnd && { timeEndSort: timeEnd }),
      });
    });
  }

  onChangeOrder(type: 'timeStart' | 'timeEnd'): void {
    const control: FormControl<OrderedEnum | null> = this.sortForm.controls[type];
    switch (control.value) {
      case OrderedEnum.ASC: {
        control.patchValue(OrderedEnum.DESC);
        break;
      }
      case OrderedEnum.DESC: {
        control.patchValue(null);
        break;
      }
      default: {
        control.patchValue(OrderedEnum.ASC);
      }
    }
  }
}
