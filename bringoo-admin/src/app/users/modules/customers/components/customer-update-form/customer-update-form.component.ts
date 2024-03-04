import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CustomerRoleEnum, CustomerUpdateInput, SalutationEnum } from '../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-customer-update-form',
  templateUrl: './customer-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerUpdateFormComponent extends DynamicForm<CustomerUpdateInput> {
  salutationList: string[] = Object.keys(SalutationEnum);
  rolesList: string[] = Object.keys(CustomerRoleEnum);
  passwordVisible: boolean = false;

  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: [null, []],
      settings: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneCountryCode: [null, []],
        phoneNumber: [null, []],
        dateOfBirth: [null, []],
        placeOfBirth: [null, []],
        customerLanguageCode: [null, [Validators.required]],
        nationalityCode: [null, []],
        salutation: [null, []],
        photoUrl: [null, []],
      }),
    });
  }

  beforeSubmit(value: CustomerUpdateInput): CustomerUpdateInput {
    const formValues: CustomerUpdateInput = value;
    let ind: keyof typeof formValues;
    for (ind in formValues) {
      if (value[ind] === null || !value[ind]) delete formValues[ind];
    }
    return formValues;
  }
}
