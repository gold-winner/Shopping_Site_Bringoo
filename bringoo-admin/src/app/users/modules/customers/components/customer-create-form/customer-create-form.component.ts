import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import {
  CustomerCreateInput,
  CustomerRoleEnum,
  CustomerSettingsCreateInput,
  LangCodeEnum,
  SalutationEnum,
} from '../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

@Component({
  selector: 'app-customer-create-form',
  templateUrl: './customer-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCreateFormComponent extends DynamicForm<CustomerCreateInput> {
  salutationList: string[] = Object.keys(SalutationEnum);
  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;

  form = new FormGroup<ToFormGroupType<CustomerCreateInput>>({
    role: new FormControl(null, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(this.passwordMaxLength)]),
    settings: new FormGroup<ToFormGroupType<CustomerSettingsCreateInput>>({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(null),
      placeOfBirth: new FormControl(null),
      customerLanguageCode: new FormControl(null, [Validators.required]),
      nationalityCode: new FormControl(null),
      salutation: new FormControl(null),
      phoneCountryCode: new FormControl(null),
      phoneNumber: new FormControl(null),
      photoUrl: new FormControl(null),
    }),
  });

  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  defaultFormValue: Partial<CustomerCreateInput> = {
    role: CustomerRoleEnum.CUSTOMER,
    settings: {
      customerLanguageCode: LangCodeEnum.DE,
      firstName: '',
      lastName: '',
    },
  };

  beforeSubmit(value: typeof this.form.value): CustomerCreateInput {
    const formValues: typeof this.form.value & any = value;
    if (value?.settings?.dateOfBirth) {
      formValues.settings.dateOfBirth = format(new Date(value.settings.dateOfBirth), 'yyyy-MM-dd');
    }
    return formValues;
  }
}
