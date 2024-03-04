import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-pick-duration-filter-form',
  templateUrl: './store-pick-duration-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePickDurationFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          storeId: this.route.parent?.parent?.snapshot.params['id'],
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { storeId: this.route.parent?.parent?.snapshot.params['id'] },
        {
          $or: [
            {
              dateStart: { $cont: search },
            },
            {
              dateEnd: { $cont: search },
            },
            {
              fee: { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}
