import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../../../../../shared/types/active-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-terms-condition-form-filter',
  templateUrl: './terms-condition-form-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditionFormFilterComponent extends DynamicFilterFormComponent {
  statuses: ActiveShowStatusesType[] = ['Show ALL', 'Show Active', 'Show Inactive'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    status: new FormControl('Show ALL') as FormControl<ActiveShowStatusesType>,
  });

  mapSearch({ search, status }: typeof this.form.value): FindInput {
    const s: { $and: any[] } = { $and: [] };

    s.$and.push({ parentId: { $isnull: true } });

    if (status !== 'Show ALL') {
      s.$and.push({ isActive: status === 'Show Active' });
    }

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

    return {
      s: JSON.stringify(s),
      sort: ['order,ASC'],
    };
  }
}
