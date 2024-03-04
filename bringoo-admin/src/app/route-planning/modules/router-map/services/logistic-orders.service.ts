import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { OrdersWithStaffInformationDto, OrdersWithStaffInformationFilterInput } from '../../../../../shared/api/auth/data-contracts';
import { OrderService } from '../../../../../shared/api/auth/order.service';
import { isNonNull } from '../../../../../shared/helpers/is-non-null.helper';
import { Pageable } from '../../../../../shared/interfaces/pageable';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class LogisticOrdersService {
  page: number = 1;
  limit: number = 1000;

  private searchSubject = new BehaviorSubject<OrdersWithStaffInformationFilterInput | null>(null);

  readonly search$: Observable<OrdersWithStaffInformationFilterInput> = this.searchSubject.asObservable().pipe(filter(isNonNull));

  private readonly ordersSubject: BehaviorSubject<OrdersWithStaffInformationDto[]> = new BehaviorSubject<OrdersWithStaffInformationDto[]>(
    [],
  );

  orders$: Observable<OrdersWithStaffInformationDto[]> = this.ordersSubject.asObservable();

  isLoadingOrdersSubject: Subject<boolean> = new Subject<boolean>();
  isLoadingOrders$: Observable<boolean> = this.isLoadingOrdersSubject.asObservable();

  constructor(private service: OrderService) {}

  subOnSearchChanges(): void {
    this.search$
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.isLoadingOrdersSubject.next(true);
        }),
        debounceTime(500),
        switchMap((findInput: OrdersWithStaffInformationFilterInput) => {
          return this.service.ordersWithStaffInformation({ ...findInput });
        }),
        map((page: Pageable & { items?: OrdersWithStaffInformationDto[] }) => page.items ?? []),
        tap((orders: OrdersWithStaffInformationDto[]) => {
          this.ordersSubject.next(orders);
          this.isLoadingOrdersSubject.next(false);
        }),
      )
      .subscribe();
  }

  get ordersIds(): string[] {
    return this.ordersSubject.getValue().map(({ orderId }: OrdersWithStaffInformationDto) => orderId);
  }

  get orders(): OrdersWithStaffInformationDto[] {
    return this.ordersSubject.getValue();
  }

  patchFilters(filters: Partial<OrdersWithStaffInformationFilterInput>): void {
    this.searchSubject.next({ limit: this.limit, page: this.page, ...filters });
  }

  reloadOrders(): void {
    this.searchSubject.next(this.searchSubject.getValue());
  }
}
