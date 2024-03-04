import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-slot-filter-form',
  templateUrl: './load-template-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadTemplateFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    const str: string = search
      ? JSON.stringify({
          $or: [
            {
              name_i18n: { $contL: search },
            },
            {
              description_i18n: { $contL: search },
            },
          ],
        })
      : '';
    return { s: str };
  }
}
