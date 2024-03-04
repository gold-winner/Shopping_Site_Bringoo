import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../shared/types/active-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-filter-surveys',
  templateUrl: 'filter-surveys.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSurveysComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;
  statuses: ActiveShowStatusesType[] = ['Show ALL', 'Show Active', 'Show Inactive'];

  form = new FormGroup({
    search: new FormControl(null),
    dateStart: new FormControl(null),
    dateEnd: new FormControl(null),
    isActive: new FormControl<ActiveShowStatusesType>('Show Active'),
  });

  mapSearch({ search, dateEnd, dateStart, isActive }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, dateEnd, dateStart, isActive } as FindInput);
    const s: { $and: any[] } = { $and: [] };

    if (search) {
      s.$and.push({
        $or: [
          {
            name_i18n: { $contL: search },
          },
        ],
      });
    }

    if (isActive && isActive !== 'Show ALL') {
      s.$and.push({ isActive: isActive === 'Show Active' });
    }

    if (dateStart) {
      s.$and.push({ dateStart: { $gte: `${dateStart} 00:00:00` } });
    }

    if (dateEnd) {
      s.$and.push({ dateEnd: { $lte: `${dateEnd} 23:59:59` } });
    }
    return { s: JSON.stringify(s), sort: ['dateStart,DESC'] };
  }
}
