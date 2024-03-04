import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { SmsMessageInput } from '../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-sms-history-create-form',
  templateUrl: './sms-history-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsHistoryCreateFormComponent extends DynamicForm<SmsMessageInput> {
  defaultFormValue: Partial<SmsMessageInput> = {
    userId: this.route.snapshot.params['id'],
    isVoice: false,
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      userId: [null, [Validators.required]],
      message: [null, [Validators.required]],
      isVoice: [null, [Validators.required]],
    });
  }
}
