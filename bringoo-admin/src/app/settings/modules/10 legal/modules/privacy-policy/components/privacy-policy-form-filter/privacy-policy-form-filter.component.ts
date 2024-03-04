import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../../../../../shared/types/active-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-privacy-policy-form-filter',
  templateUrl: 'privacy-policy-form-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyFormFilterComponent extends DynamicFilterFormComponent {
  statuses: ActiveShowStatusesType[] = ['Show ALL', 'Show Active', 'Show Inactive'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
    isActive: new FormControl('Show ALL') as FormControl<ActiveShowStatusesType>,
    softDelete: new FormControl(false) as FormControl<boolean>,
  });

  mapSearch({ search, isActive, dateStart, dateEnd, softDelete }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, isActive, dateStart, dateEnd, softDelete } as FindInput);

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

    if (dateStart) {
      s.$and.push({ deliveryDate: { $gte: `${dateStart} 00:00:00` } });
    }

    if (dateEnd) {
      s.$and.push({ deliveryDate: { $lte: `${dateEnd} 23:59:59` } });
    }

    return { s: JSON.stringify(s), sort: ['dateStart,DESC'], ...(softDelete && { softDelete }) };
  }
}
