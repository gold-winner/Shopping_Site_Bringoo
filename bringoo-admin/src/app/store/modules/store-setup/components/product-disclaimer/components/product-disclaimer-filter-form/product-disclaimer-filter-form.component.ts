import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-disclaimer-filter-form',
  templateUrl: './product-disclaimer-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block position-relative' },
})
export class ProductDisclaimerFilterFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;

  form = new FormGroup({
    dateStart: new FormControl<string | null>(null),
    disclaimerSearch: new FormControl<string | null>(null),
    storeId: new FormControl<string | null>(this.route?.parent?.parent?.snapshot.params['id']),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ disclaimerSearch, dateStart, storeId }: typeof this.form.value): FindInput {
    this.formSubmit.emit({
      disclaimerSearch,
    } as FindInput);

    const s: any = { $and: [] };

    if (storeId) {
      s.$and.push({ storeId });
    }

    if (disclaimerSearch) {
      s.$and.push({
        $or: [
          {
            name_i18n: { $contL: disclaimerSearch },
          },
          {
            code: { $contL: disclaimerSearch },
          },
        ],
      });
    }

    if (dateStart) {
      s.$and.push({ dateStart: { $gte: `${dateStart} 00:00:00` } });
    }

    return { s: JSON.stringify(s) };
  }
}
