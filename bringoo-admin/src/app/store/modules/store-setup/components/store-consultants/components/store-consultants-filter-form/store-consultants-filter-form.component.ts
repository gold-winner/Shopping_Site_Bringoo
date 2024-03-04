import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@Component({
  selector: 'app-store-consultants-filter-form',
  templateUrl: './store-consultants-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreConsultantsFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search)
      return {
        s: JSON.stringify({
          storeId: this.route.parent?.parent?.snapshot.params['id'],
        }),
      };

    const [firstName, lastName] = search.split(' ');

    return {
      s: JSON.stringify({
        $and: [
          { storeId: this.route.parent?.parent?.snapshot.params['id'] },
          {
            $or: [{ firstName: { $contL: firstName } }, { lastName: { $contL: lastName || firstName } }, { email: { $contL: search } }],
          },
        ],
      }),
    };
  }
}
