import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-order-temperature-check-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTemperatureCheckFilterFormComponent extends DynamicFilterFormComponent {
  orderId: string = '';
  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.orderId = this.route.snapshot.params['id'];
  }

  mapSearch(): FindInput {
    const and: { [p: string]: any }[] = [];
    and.push({ orderId: this.orderId });
    return { s: JSON.stringify({ $and: and }) };
  }
}
