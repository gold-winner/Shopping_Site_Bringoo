import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerLoyaltyProgramCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-product-management-create-form',
  templateUrl: './customer-loyalty-program-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLoyaltyProgramCreateFormComponent extends DynamicForm<CustomerLoyaltyProgramCreateInput> {
  defaultFormValue: Partial<CustomerLoyaltyProgramCreateInput> = {
    customerId: this.route.snapshot.params['id'],
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      customerId: [this.route.snapshot.params['id'], [Validators.required]],
      loyaltyProgramId: [null, [Validators.required]],
      cardNumber: [null],
    });
  }
}
