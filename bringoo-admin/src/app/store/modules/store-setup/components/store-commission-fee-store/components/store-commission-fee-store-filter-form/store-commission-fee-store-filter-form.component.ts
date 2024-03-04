import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CommissionFeeScaleEnum, FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-commission-fee-store-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeStoreFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(): FindInput {
    return {
      s: JSON.stringify({
        storeId: this.id,
        commissionFeeScale: CommissionFeeScaleEnum.STORE,
      }),
    };
  }
}
