import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-sms-history-filter-form',
  templateUrl: './sms-history-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsHistoryFilterFormComponent extends DynamicFilterFormComponent {
  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const str: any = {
      userId: this.route.snapshot.params['id'],
      ...(search && { $or: [{ message: { $cont: search } }] }),
    };

    const s: string = JSON.stringify(str);
    return { s, sort: ['create_date,DESC'] };
  }
}
