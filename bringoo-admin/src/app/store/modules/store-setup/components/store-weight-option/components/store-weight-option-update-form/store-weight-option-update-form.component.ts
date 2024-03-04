import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { StoreWeightOptionUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { validationTime } from '../../../../../../../../shared/helpers/validate-form';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-weight-option-update-form',
  templateUrl: './store-weight-option-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreWeightOptionUpdateFormComponent extends DynamicForm<StoreWeightOptionUpdateInput> {
  defaultFormValue: Partial<StoreWeightOptionUpdateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
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

  beforeSubmit(value: StoreWeightOptionUpdateInput): StoreWeightOptionUpdateInput {
    return super.beforeSubmit(value);
  }
}
