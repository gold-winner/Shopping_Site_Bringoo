import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { OrderTemperatureCheckCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-order-temperature-check-create-form',
  templateUrl: './order-temperature-check-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTemperatureCheckCreateFormComponent extends DynamicForm<OrderTemperatureCheckCreateInput> {
  defaultFormValue: Partial<OrderTemperatureCheckCreateInput> = {
    orderId: this.route.snapshot.params['id'],
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      orderId: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      imageUrl: [null],
      comment: [null],
    });
  }
}
