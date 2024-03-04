import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerBanCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-ban-create-form',
  templateUrl: './customer-ban-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBanCreateFormComponent extends DynamicForm<CustomerBanCreateInput> {
  defaultFormValue: Partial<CustomerBanCreateInput> = {
    customerId: this.route.snapshot.params['id'],
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, []],
      managerComment: [null, []],
    });
  }
}
