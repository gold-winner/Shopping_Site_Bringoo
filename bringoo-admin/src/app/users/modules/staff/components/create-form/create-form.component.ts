import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { LangCodeEnum, SalutationEnum, StaffCreateInput, StaffRoleEnum } from '../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-staff-create-form',
  templateUrl: './create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent extends DynamicForm<StaffCreateInput> implements OnInit {
  salutationList: string[] = Object.keys(SalutationEnum);
  rolesList: string[] = Object.keys(StaffRoleEnum);
  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;

  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;

  defaultFormValue: Partial<StaffCreateInput> = {
    role: StaffRoleEnum.UNASSIGNED,
    email: '',
    password: '',
    settings: {
      firstName: '',
      lastName: '',
      phoneCountryCode: '49',
      phoneNumber: '',
      staffLanguageCode: LangCodeEnum.EN,
    },
    isExternalEmployee: false,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      role: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(this.passwordMaxLength)]],
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
        photoUrl: [null],
      }),
      isExternalEmployee: [false, [Validators.required]],
    });
  }

  beforeSubmit(value: StaffCreateInput): StaffCreateInput {
    const formValue: StaffCreateInput & any = value;

    let key: keyof typeof value.settings;
    for (key in value.settings) {
      if (!value.settings[key] || value.settings[key] === null) delete value.settings[key];
    }
    if (!value.settings?.phoneNumber && formValue.settings?.phoneCountryCode) {
      formValue.settings['phoneCountryCode'] = null;
    }

    return formValue;
  }
}
