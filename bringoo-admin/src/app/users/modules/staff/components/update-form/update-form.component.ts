import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { SalutationEnum, StaffRoleEnum, StaffUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-staff-create-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent extends DynamicForm<StaffUpdateInput> {
  salutationList: string[] = Object.keys(SalutationEnum);
  rolesList: string[] = Object.keys(StaffRoleEnum);
  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;

  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      role: [null, [Validators.required]],
      email: ['', [Validators.required]],
      password: [null, [Validators.maxLength(this.passwordMaxLength)]],
      settings: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        dateOfBirth: [null],
        placeOfBirth: [null],
        staffLanguageCode: [null, [Validators.required]],
        nationalityCode: [null],
        salutation: [null],
        phoneCountryCode: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required]],
        photoUrl: [null, []],
      }),
      isExternalEmployee: [null, [Validators.required]],
    });
  }

  beforeSubmit(value: StaffUpdateInput): StaffUpdateInput {
    const formValue: StaffUpdateInput & any = value;

    let ind: keyof typeof formValue;
    for (ind in formValue) {
      if (formValue[ind] === null || !formValue[ind]) delete formValue[ind];
    }
    if (!value.settings?.phoneNumber && formValue.settings?.phoneCountryCode) {
      formValue.settings['phoneCountryCode'] = null;
    }
    return formValue;
  }
}
