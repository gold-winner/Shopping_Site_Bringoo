import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-ban-filter-form',
  templateUrl: './customer-ban-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBanFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const $and: any[] = [{ customerId: this.route.snapshot.params['id'] }];

    if (search) {
      $and.push({ $or: [{ managerComment: { $cont: search } }] });
    }

    const s: string = JSON.stringify({ $and });
    return { s, sort: ['create_date,DESC'] };
  }
}
