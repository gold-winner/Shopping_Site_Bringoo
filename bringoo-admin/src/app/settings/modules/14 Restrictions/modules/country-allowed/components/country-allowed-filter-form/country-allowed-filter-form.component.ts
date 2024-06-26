import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-country-allowed-filter-form',
  templateUrl: './country-allowed-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAllowedFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    const str: any = {
      ...(search && { $or: [{ phoneCountryCode: { $cont: search } }] }),
    };

    const s: string = JSON.stringify(str);
    return { s, sort: ['create_date,DESC'] };
  }
}
