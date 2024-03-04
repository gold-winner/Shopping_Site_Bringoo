import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../shared/config/constants.config';
import { UserSearchFilter } from '../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-abandoned-shopping-cart-filter-form',
  templateUrl: 'abandoned-shopping-cart-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbandonedShoppingCartFilterFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    storeId: new FormControl<string | null>(null),
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
  });

  mapSearch({ search, storeId, dateStart, dateEnd }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, storeId, dateStart, dateEnd } as FindInput);

    const and: { [p: string]: any }[] = [];
    if (storeId) {
      and.push({ storeId: storeId });
    }

    if (dateStart) {
      and.push({ create_date: { $gte: `${dateStart} 00:00:00` } });
    }
    if (dateEnd) {
      and.push({ create_date: { $lte: `${dateEnd} 23:59:59` } });
    }

    if (storeId) {
      and.push({ storeId });
    }

    if (search) {
      and.push({
        $or: [
          {
            'store.name_i18n': { $contL: search },
          },
          ...UserSearchFilter(search, 'customer.settings'),
        ],
      });
    }

    return { s: JSON.stringify({ $and: and }) };
  }
}
