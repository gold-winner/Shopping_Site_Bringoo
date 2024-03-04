import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NationalityCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormGroupType = ToFormGroupType<NationalityCreateInput>;

@Component({
  selector: 'app-country-create',
  templateUrl: './nationality-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NationalityCreateComponent extends DynamicForm<NationalityCreateInput> {
  defaultFormValue: Partial<NationalityCreateInput> = {
    isActive: true,
  };

  form: FormGroup<FormGroupType> = new FormGroup<FormGroupType>({
    adjectiveNationality_i18n: new FormControl(null) as any,
    nounNationality_i18n: new FormControl(null) as any,
    code: new FormControl(null, [Validators.required]),
    isActive: new FormControl(null),
    countryCode: new FormControl(null),
  });
}
