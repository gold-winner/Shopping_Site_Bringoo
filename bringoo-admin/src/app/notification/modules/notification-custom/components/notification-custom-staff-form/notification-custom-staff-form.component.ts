import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { PushNotificationCustomCreateInput, UserGroupEnum } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-notification-custom-staff-form',
  templateUrl: './notification-custom-staff-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCustomStaffFormComponent implements OnInit {
  readonly titleMaxLength: number = 65;
  readonly bodyMaxLength: number = 240;
  form: UntypedFormGroup = new UntypedFormGroup({});
  @Output() send: EventEmitter<PushNotificationCustomCreateInput> = new EventEmitter<PushNotificationCustomCreateInput>();

  constructor(private readonly formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(this.titleMaxLength)]],
      body: [null, [Validators.required, Validators.maxLength(this.bodyMaxLength)]],
      sendDate: [null],
      signDateMin: [null],
      signDateMax: [null],
    });
  }

  onSubmit(): void {
    const { title, body, sendDate, signDateMin, signDateMax } = this.form ? this.form.value : undefined;
    this.send.emit({ title, body, userGroup: UserGroupEnum.Staff, sendDate, signDateMin, signDateMax });
  }
}
