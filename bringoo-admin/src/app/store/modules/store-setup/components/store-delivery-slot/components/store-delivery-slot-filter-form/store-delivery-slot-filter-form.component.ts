import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-slot-filter-form',
  templateUrl: './store-delivery-slot-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliverySlotFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  storeId: string = '';

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
              slotDuration: { $cont: search },
            },
            {
              slotCapacity: { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}
