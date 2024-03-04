import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-weight-option-filter-form',
  templateUrl: './store-weight-option-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreWeightOptionFilterFormComponent extends DynamicFilterFormComponent {
  storeId: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.storeId = this.route.parent?.parent?.snapshot.params['id'];
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          storeId: this.storeId,
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { storeId: this.storeId },
        {
          $or: [
            {
              dateStart: { $cont: search },
            },
            {
              dateEnd: { $cont: search },
            },
            {
              weightValue: { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}
