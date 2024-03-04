import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-faq-item-filter-form',
  templateUrl: './faq-item-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqItemFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  mapSearch({ search }: typeof this.form.value): FindInput {
    return {
      s: !search
        ? ''
        : JSON.stringify({
            $or: [
              {
                name_i18n: { $contL: search },
              },
              {
                code: { $contL: search },
              },
              {
                topicCode: { $contL: search },
              },
            ],
          }),
      sort: ['order,ASC'],
    };
  }
}
