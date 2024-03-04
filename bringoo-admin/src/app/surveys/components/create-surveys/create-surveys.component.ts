import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

import { SurveyCreateInput } from '../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<SurveyCreateInput>;

@Component({
  selector: 'app-create-surveys',
  templateUrl: 'create-surveys.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSurveysComponent extends DynamicForm<SurveyCreateInput> implements AfterViewInit {
  height: BehaviorSubject<number> = new BehaviorSubject<number>(500);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    name_i18n: (new FormControl(null) as unknown) as any,
    model: new FormControl<object | null>(null, [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    dateStart: new FormControl<SurveyCreateInput['dateStart'] | null>(null, [Validators.required]),
    dateEnd: new FormControl<SurveyCreateInput['dateStart'] | null>(null, [Validators.required]),
    isForCustomer: new FormControl(true, [Validators.required]),
    isForStaff: new FormControl(false, [Validators.required]),
  });

  defaultFormValue: Partial<SurveyCreateInput> = {
    isForStaff: false,
    isForCustomer: true,
    dateStart: format(new Date(), DATE_FORMAT),
    isActive: true,
  };

  ngAfterViewInit(): void {
    const driverBody: HTMLDivElement | null = document.querySelector('.ant-drawer-body');
    if (driverBody) {
      this.height.next(driverBody.clientHeight - 16);
    }
  }
}
