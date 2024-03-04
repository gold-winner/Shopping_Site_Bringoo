import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomerLoyaltyProgramUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FromType = ToFormGroupType<CustomerLoyaltyProgramUpdateInput>;

@Component({
  selector: 'app-customer-product-management-update-form',
  templateUrl: './customer-loyalty-program-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLoyaltyProgramUpdateFormComponent extends DynamicForm<CustomerLoyaltyProgramUpdateInput> {
  defaultFormValue: Partial<CustomerLoyaltyProgramUpdateInput> = {
    customerId: this.route.snapshot.params['id'],
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
  }

  form: FormGroup<FromType> = new FormGroup<FromType>({
    customerId: new FormControl(this.route.snapshot.params['id'], [Validators.required]),
    loyaltyProgramId: new FormControl(null, [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required]),
  });
}
