import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { StoreWeightOptionCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-weight-option-create-form',
  templateUrl: './store-weight-option-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreWeightOptionCreateFormComponent extends DynamicForm<StoreWeightOptionCreateInput> {
  defaultFormValue: Partial<StoreWeightOptionCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    dateStart: format(new Date(), DATE_FORMAT),
    weightValue: 20,
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      timeEnd: [null, [Validators.required, validationTime(() => this.form.get('timeStart')?.value)]],
      weightValue: [null, [Validators.required]],
    });
  }
}
