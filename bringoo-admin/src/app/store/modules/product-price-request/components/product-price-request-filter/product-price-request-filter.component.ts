import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, ProductPriceRequestStatusEnum } from '../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-price-request-filter',
  templateUrl: './product-price-request-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPriceRequestFilterComponent extends DynamicFilterFormComponent {
  statuses: string[] = Object.values(ProductPriceRequestStatusEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    status: new FormControl<ProductPriceRequestStatusEnum | null>(null),
    store: new FormControl<string | null>(null),
    create_date: new FormControl<string | null>(null),
    staffId: new FormControl<string | null>(null),
  });

  mapSearch({ search, store, create_date, staffId, status }: typeof this.form.value): FindInput {
    const $and: any[] = [];

    if (store) {
      $and.push({ 'productLink.storeId': { $eq: store } });
    }

    if (create_date) {
      $and.push({ create_date: { $gte: `${create_date} 00:00:00` } }, { create_date: { $lte: `${create_date} 23:59:59` } });
    }

    if (staffId) {
      $and.push({ staffId: { $eq: staffId } });
    }

    if (status) {
      $and.push({ status });
    }

    if (search) {
      $and.push({
        $or: [
          {
            'productLink.product.name_i18n': { $contL: search },
          },
          {
            'store.name_i18n': { $contL: search },
          },
          ...UserSearchFilter(search, 'staff.settings'),
        ],
      });
    }

    return {
      ...($and.length > 0 && { s: JSON.stringify({ $and }) }),
      softDelete: true,
      sort: ['create_date,DESC'],
    };
  }
}
