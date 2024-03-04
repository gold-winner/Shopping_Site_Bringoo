import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format } from 'date-fns';

import { StoreClosingDayCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-closing-days-create-form',
  templateUrl: './store-closing-days-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreClosingDaysCreateFormComponent extends DynamicForm<StoreClosingDayCreateInput> {
  defaultFormValue: Partial<StoreClosingDayCreateInput> = {
    storeId: this.route.parent?.parent?.snapshot.params['id'],
    dateStart: format(new Date(), DATE_FORMAT),
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      note: [null],
    });
  }
}
