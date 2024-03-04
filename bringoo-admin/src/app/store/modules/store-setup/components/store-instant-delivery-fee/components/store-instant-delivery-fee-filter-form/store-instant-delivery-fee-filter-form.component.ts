import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@Component({
  selector: 'app-store-delivery-fee-filter-form',
  templateUrl: './store-instant-delivery-fee-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreInstantDeliveryFeeFilterFormComponent extends DynamicFilterFormComponent {
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
              fee: search,
            },
          ],
        },
      ],
    });

    return { s: str };
  }
}
