import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-country-filter-form',
  templateUrl: './nationality-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NationalityFilterComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    const s: string = search
      ? JSON.stringify({
          $or: [
            { adjectiveNationality_i18n: { $contL: search } },
            { nounNationality_i18n: { $contL: search } },
            { code: { $contL: search } },
          ],
        })
      : '';

    return {
      s,
      sort: ['code,ASC'],
    };
  }
}
