import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

@UntilDestroy()
@Component({
  selector: 'app-store-staff-bound-filter',
  templateUrl: './store-staff-bound-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreStaffBoundFilterComponent extends DynamicFilterFormComponent {
  form: FormGroup<ToFormGroupType<{ search: string }>> = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const $and: any[] = [{ storeId: { [CondOperator.EQUALS]: this.route.parent?.parent?.snapshot.params['id'] } }];

    if (search) {
      const [firstName, lastName] = search.split(' ');
      $and.push({
        $or: [{ 'staff.settings.firstName': { $contL: firstName } }, { 'staff.settings.lastName': { $contL: lastName || firstName } }],
      });
    }

    return {
      s: JSON.stringify({ $and }),
    };
  }
}
