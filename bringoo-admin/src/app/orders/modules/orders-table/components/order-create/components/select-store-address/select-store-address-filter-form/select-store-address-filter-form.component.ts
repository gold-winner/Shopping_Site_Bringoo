import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { StoreService } from '../../services/store-service';

@UntilDestroy()
@Component({
  selector: 'app-select-store-address-filter-form',
  templateUrl: './select-store-address-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStoreAddressFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private storeIdService: StoreService) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return {
        s: JSON.stringify({
          storeId: this.storeIdService.storeId,
        }),
      };
    }
    const str: string = JSON.stringify({
      $and: [
        { storeId: this.storeIdService.storeId },
        {
          $or: [
            {
              street: { $cont: search },
            },
            {
              country: { $cont: search },
            },
            {
              city: { $cont: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}
