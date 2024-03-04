import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-vendor-category-filter-form',
  templateUrl: './vendor-category-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCategoryFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return { filter: [] };
    }
    return {
      filter: [['name_i18n', CondOperator.CONTAINS_LOW, search.toLowerCase()].join('||')],
      or: [['code', CondOperator.CONTAINS_LOW, search.toLowerCase()].join('||')],
    };
  }
}
