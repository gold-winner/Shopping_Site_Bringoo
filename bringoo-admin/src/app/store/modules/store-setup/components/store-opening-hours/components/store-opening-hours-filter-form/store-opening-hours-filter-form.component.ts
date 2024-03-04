import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-opening-hours-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOpeningHoursFilterFormComponent extends DynamicFilterFormComponent {
  storeId!: string;

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.storeId = this.route.parent?.parent?.snapshot.params['id'];
  }

  mapSearch(): FindInput {
    return {
      s: JSON.stringify({
        $and: [{ storeId: this.storeId }],
      }),
    };
  }
}
