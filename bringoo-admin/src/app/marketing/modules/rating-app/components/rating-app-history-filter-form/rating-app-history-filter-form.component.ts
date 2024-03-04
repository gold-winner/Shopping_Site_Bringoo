import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, OsEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { UserSearchFilter } from '../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-rating-app-history-filter-form',
  templateUrl: './rating-app-history-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingAppHistoryFilterFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;
  osFilter: string[] = Object.values(OsEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
    deviceOs: new FormControl<OsEnum | null>(null),
  });

  mapSearch({ search, deviceOs, dateStart, dateEnd }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, deviceOs } as FindInput);

    const s: any = { $and: [] };

    if (search) {
      s.$and.push({
        $or: [...UserSearchFilter(search, 'customer.settings')],
      });
    }

    if (dateStart) {
      s.$and.push({ create_date: { $gte: `${dateStart} 00:00:00` } });
    }

    if (dateEnd) {
      s.$and.push({ create_date: { $lte: `${dateEnd} 23:59:59` } });
    }

    if (deviceOs) {
      s.$and.push({ deviceOs });
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}
