import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { FindInput, OrderStatusEnum } from '../../api/auth/data-contracts';
import { DATE_FORMAT } from '../../config/constants.config';
import { IGNORE_ORDER_STATUSES } from '../../config/orders-table.config';
import { UserSearchFilter } from '../../helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { defaultFilter, searchFilter } from '../../types/crud-filters.types';
import { ReplacementShowStatusesType } from '../../types/replacement-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-filter-form',
  templateUrl: './orders-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersFilterFormComponent extends DynamicFilterFormComponent {
  protected searchKeys: string[] = ['orderNumber', 'store.name_i18n'];
  today: string = format(new Date(), DATE_FORMAT);
  dateFormat: string = DATE_FORMAT;

  orderStatusItems: string[] = Object.keys(OrderStatusEnum).filter(
    (status: string) =>
      !Object.values(IGNORE_ORDER_STATUSES)
        .map((status: OrderStatusEnum) => status.toString())
        .includes(status),
  );

  hasReplacementStatuses: ReplacementShowStatusesType[] = [`Show All`, `Has Replacement`, `Hasn't Replacement`];

  form = new FormGroup({
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
    search: new FormControl<string | null>(null),
    storeId: new FormControl<string | null>(null),
    storeRegionCode: new FormControl<string[]>([]),
    orderStatus: new FormControl<string[]>([]),
    tags: new FormControl<string[]>([]),
    hasReplacement: new FormControl('Show All') as FormControl<ReplacementShowStatusesType>,
  });

  constructor(readonly fb: UntypedFormBuilder, public readonly route: ActivatedRoute) {
    super();
  }

  beforePatch(value: FindInput & any): FindInput {
    if (typeof value?.tags === 'string') {
      value.tags = [value.tags];
    }

    return value;
  }

  mapSearch({ search, ...filters }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, ...filters } as FindInput);
    const str: string = !search
      ? JSON.stringify({ $and: this.furtherFilters(filters) })
      : JSON.stringify({
          $and: [...this.furtherFilters(filters), { $or: this.filtersOnInputField(search, this.searchKeys) }],
        });
    return { s: str, sort: ['deliveryDateTimeFrom,DESC'], softDelete: true };
  }

  // eslint-disable-next-line complexity
  furtherFilters = ({
    storeId,
    storeRegionCode,
    orderStatus,
    dateStart,
    dateEnd,
    hasReplacement,
    tags,
  }: typeof this.form.value): defaultFilter[] => {
    const and: { [p: string]: any }[] = [];
    if (storeId) {
      and.push({ storeId: storeId });
    }

    for (const kk of [
      { values: storeRegionCode, key: 'store.storeRegionCode' },
      { values: orderStatus, key: 'orderStatus' },
    ]) {
      if (kk.values && kk.values?.length > 0) {
        and.push({ $or: (Array.isArray(kk.values) ? kk.values : [kk.values]).map((val: string) => ({ [kk.key]: val })) });
      }
    }

    if (this.route.snapshot.data.dashboard) {
      and.push({ deliveryDate: this.today });
    }

    and.push({ orderStatus: { [CondOperator.NOT_IN]: IGNORE_ORDER_STATUSES } });

    if (dateStart) {
      and.push({ deliveryDate: { $gte: `${dateStart} 00:00:00` } });
    }
    if (dateEnd) {
      and.push({ deliveryDate: { $lte: `${dateEnd} 23:59:59` } });
    }

    if (hasReplacement !== 'Show All') {
      and.push({ hasReplacement: { $eq: hasReplacement === 'Has Replacement' } });
    }

    if (tags && tags.length > 0) {
      and.push({ tags: { '$@>': tags } });
    }

    and.push({ deleted_date: null });

    return and;
  };

  filtersOnInputField = (search: string, searchKeys: string[]): searchFilter[] => {
    const searchObject: searchFilter[] = searchKeys.map((key: string) => ({ [key]: { $contL: search } }));

    searchObject.push(...UserSearchFilter(search, 'orderBillingAddress'));

    return searchObject;
  };
}
