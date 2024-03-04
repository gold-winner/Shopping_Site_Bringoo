import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { DayOfWeekEnum, ProductTypeEnum, StoreConsultantUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../../shared/config/country-hpone-codes.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<StoreConsultantUpdateInput>;

@UntilDestroy()
@Component({
  selector: 'app-store-consultants-update-form',
  templateUrl: './store-consultants-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreConsultantsUpdateFormComponent extends DynamicForm<StoreConsultantUpdateInput> {
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;
  daysOfWeek: string[] = Object.values(DayOfWeekEnum);
  productTypes: ProductTypeEnum[] = Object.values(ProductTypeEnum);

  constructor(private fb: FormBuilder, private readonly route: ActivatedRoute) {
    super();
  }

  form: FormGroup<FormType> = new FormGroup<FormType>({
    storeId: new FormControl(this.route.parent?.parent?.snapshot.params['id'], [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    phoneCountryCode: new FormControl(null, [Validators.required]),
    productTypes: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    dateStart: new FormControl(null, [Validators.required]),
    dateEnd: new FormControl(null, [Validators.required]),
    timeStart: new FormControl(null, [Validators.required]),
    timeEnd: new FormControl(null, [Validators.required]),
    daysOfWeek: new FormControl([], [Validators.required]),
    description: new FormControl(null),
  });
}
