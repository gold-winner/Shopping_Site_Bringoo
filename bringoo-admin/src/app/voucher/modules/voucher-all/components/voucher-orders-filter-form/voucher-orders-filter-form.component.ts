import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-voucher-orders-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherOrdersFilterFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  mapSearch(): FindInput {
    const s: any = {
      $and: [
        {
          voucherId: this.route.snapshot.params['id'],
        },
      ],
    };

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}
