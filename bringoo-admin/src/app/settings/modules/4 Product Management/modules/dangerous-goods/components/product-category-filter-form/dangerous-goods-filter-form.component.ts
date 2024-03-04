import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../../../../../shared/types/active-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-category-filter-form',
  templateUrl: './dangerous-goods-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DangerousGoodsFilterFormComponent extends DynamicFilterFormComponent {
  statuses: ActiveShowStatusesType[] = ['Show ALL', 'Show Active', 'Show Inactive'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    isActive: new FormControl<ActiveShowStatusesType>('Show ALL') as FormControl<ActiveShowStatusesType>,
  });

  mapSearch({ search, isActive }: typeof this.form.value): FindInput {
    const s: { $and: any[] } = { $and: [] };

    if (search) {
      s.$and.push({
        $or: [
          {
            name_i18n: { $contL: search },
          },
          {
            code: { $contL: search },
          },
        ],
      });
    }

    if (isActive && isActive !== 'Show ALL') {
      s.$and.push({ isActive: isActive === 'Show Active' });
    }

    return { s: JSON.stringify(s) };
  }
}
