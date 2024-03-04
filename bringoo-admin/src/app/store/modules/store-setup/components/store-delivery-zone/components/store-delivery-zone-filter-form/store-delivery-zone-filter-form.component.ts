import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-delivery-zone-filter-form',
  templateUrl: './store-delivery-zone-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDeliveryZoneFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? '';
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return { s: `{"storeId" : "${this.id}"}` };
    }
    const str: string = JSON.stringify({
      $and: [
        { storeId: this.id },
        {
          $or: [
            {
              'country.name_i18n': { $contL: search },
            },
          ],
        },
      ],
    });
    return { s: str };
  }
}
