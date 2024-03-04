import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-promotion-filter-form',
  templateUrl: './product-promotion-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPromotionFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    storeId: new FormControl<string>(this.route?.parent?.parent?.snapshot.params['id']),
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
  });

  constructor(public readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search, dateStart, dateEnd, storeId }: typeof this.form.value): FindInput {
    this.formSubmit.emit({
      search,
    } as FindInput);

    const s: any = { $and: [] };

    if (storeId) {
      s.$and.push({ storeId });
    }

    if (search) {
      s.$and.push({
        $or: [
          {
            name_i18n: { $contL: search },
          },
          {
            description_i18n: { $contL: search },
          },
          {
            intro_i18n: { $contL: search },
          },
        ],
      });
    }

    if (dateStart) {
      s.$and.push({ dateStart: { $gte: `${dateStart} 00:00:00` } });
    }
    if (dateEnd) {
      s.$and.push({ dateEnd: { $lte: `${dateEnd} 23:59:59` } });
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}
