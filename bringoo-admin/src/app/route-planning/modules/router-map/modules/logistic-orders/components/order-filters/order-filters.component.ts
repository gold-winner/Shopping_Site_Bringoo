import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { distinctUntilChanged } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../../../../shared/api/auth/crud-route.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  OrderStatusEnum,
  OrdersWithStaffInformationFilterInput,
  RouteEntity,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { EXCLUDE_ORDER_STATUSES } from '../../../../../const/exclude-order-statuses.cont';

@UntilDestroy()
@Component({
  selector: 'app-order-filters',
  templateUrl: 'order-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFiltersComponent extends DynamicForm<Omit<OrdersWithStaffInformationFilterInput, 'page' | 'limit'>> implements OnInit {
  orderStatusItems: string[] = Object.keys(OrderStatusEnum).filter(
    (status: string) => !EXCLUDE_ORDER_STATUSES.includes((status as unknown) as OrderStatusEnum),
  );

  defaultFormValue: Omit<OrdersWithStaffInformationFilterInput, 'page' | 'limit'> = {
    deliveryDate: format(new Date(), DATE_FORMAT),
  };

  storeSelect: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['name_i18n', 'id'],
    sort: ['name_i18n,ASC'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  routeSelect: SelectOptions<RouteEntity> = {
    service: this.crudRouteService,
    fields: ['name', 'id'],
    sort: ['name,ASC'],
    valueKey: 'id',
    getLabel(item: RouteEntity): string {
      return item.name || '---';
    },
    search(term: string): string[] {
      return [['name', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  constructor(
    private crudStoreService: CrudStoreService,
    private crudRouteService: CrudRouteService,
    private readonly fb: UntypedFormBuilder,
  ) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null],
      routeId: [null],
      deliveryDate: [null],
      orderStatuses: [null],
      hasPicker: [null],
      hasDriver: [null],
      hasRoute: [null],
    });

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((v: typeof this.form.value) => {
      this.formValueChanges.emit(this.mapSearch(v));
    });
  }

  ngOnInit(): void {
    this.formValueChanges.emit(this.mapSearch(this.form.value));
  }

  private mapSearch({
    storeId,
    routeId,
    deliveryDate,
    orderStatuses,
    hasPicker,
    hasDriver,
    hasRoute,
  }: OrdersWithStaffInformationFilterInput & {
    hasPicker: 'showAll' | null;
    hasDriver: 'showAll' | null;
    hasRoute: 'showAll' | null;
  }): Omit<OrdersWithStaffInformationFilterInput, 'page' | 'limit'> {
    return {
      storeId,
      routeId,
      deliveryDate,
      orderStatuses,
      ...(hasPicker !== 'showAll' && hasPicker !== null && { hasPicker }),
      ...(hasDriver !== 'showAll' && hasDriver !== null && { hasDriver }),
      ...(hasRoute !== 'showAll' && hasRoute !== null && { hasRoute }),
    };
  }
}
