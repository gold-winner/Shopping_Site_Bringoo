import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { DayOfWeekEnum, ProductTypeEnum, StoreConsultantCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<StoreConsultantCreateInput>;

@UntilDestroy()
@Component({
  selector: 'app-store-consultants-create-form',
  templateUrl: './store-consultants-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreConsultantsCreateFormComponent extends DynamicForm<StoreConsultantCreateInput> {
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;
  daysOfWeek: string[] = Object.keys(DayOfWeekEnum);

  defaultFormValue: Partial<StoreConsultantCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    daysOfWeek: [DayOfWeekEnum.MON, DayOfWeekEnum.TUE, DayOfWeekEnum.WED, DayOfWeekEnum.THU, DayOfWeekEnum.FRI],
  };

  constructor(private fb: FormBuilder, private readonly route: ActivatedRoute) {
    super();
  }

  productTypes: ProductTypeEnum[] = Object.values(ProductTypeEnum);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    storeId: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required]),
    phoneCountryCode: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    dateStart: new FormControl(null, [Validators.required]),
    dateEnd: new FormControl(null, [Validators.required]),
    timeStart: new FormControl(null, [Validators.required]),
    timeEnd: new FormControl(null, [Validators.required]),
    daysOfWeek: new FormControl(null, [Validators.required]),
    productTypes: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });
}
