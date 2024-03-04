import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerBonusCreateInput, CustomerBonusTypeEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-bonus-create-form',
  templateUrl: './customer-bonus-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBonusCreateFormComponent extends DynamicForm<CustomerBonusCreateInput> {
  customerBonusTypes: string[] = Object.keys(CustomerBonusTypeEnum);

  defaultFormValue: Partial<CustomerBonusCreateInput> = {
    customerId: this.route.snapshot.params['id'],
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      customerBonusType: [null, [Validators.required]],
    });
  }
}
