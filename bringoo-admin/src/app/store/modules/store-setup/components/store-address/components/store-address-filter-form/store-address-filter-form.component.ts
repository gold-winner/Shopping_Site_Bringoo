import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@Component({
  selector: 'app-store-address-filter-form',
  templateUrl: './store-address-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreAddressFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? '';
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return { s: `{"storeId" : "${this.id}"}` };
    }

    return {
      s: JSON.stringify({
        $and: [
          { storeId: this.id },
          {
            $or: [
              {
                'country.name_i18n': { $contL: search },
              },
              {
                streetName: { $contL: search },
              },
              {
                city: { $contL: search },
              },
              {
                zipCode: { $contL: search },
              },
            ],
          },
        ],
      }),
    };
  }
}
