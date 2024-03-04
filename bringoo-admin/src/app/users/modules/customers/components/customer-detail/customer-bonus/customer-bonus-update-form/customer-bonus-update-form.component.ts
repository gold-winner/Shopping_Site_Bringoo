import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerBonusUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-bonus-update-form',
  templateUrl: './customer-bonus-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBonusUpdateFormComponent extends DynamicForm<CustomerBonusUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      isActive: [null, [Validators.required]],
    });
  }
}
