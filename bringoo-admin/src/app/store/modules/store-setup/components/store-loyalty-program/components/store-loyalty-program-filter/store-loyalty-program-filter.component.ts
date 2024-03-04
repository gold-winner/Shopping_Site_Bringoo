import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-product-management-filter',
  templateUrl: './store-loyalty-program-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreLoyaltyProgramFilterComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const s: any = { $and: [] };

    s.$and.push({ storeId: this.route.parent?.parent?.snapshot.params['id'] });

    if (search) {
      s.$and.push({
        $or: [
          {
            'loyaltyProgram.code': { $contL: search },
          },
          {
            'loyaltyProgram.name_i18n': { $contL: search },
          },
        ],
      });
    }

    return { s: JSON.stringify(s) };
  }
}
