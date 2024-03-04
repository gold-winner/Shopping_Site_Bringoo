import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CrudCustomerService } from '../../../../../../shared/api/auth/crud-customer.service';
import { CustomerTagDto, PushNotificationCustomCreateInput, UserGroupEnum } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-notification-custom-customer-form',
  templateUrl: './notification-custom-customer-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCustomCustomerFormComponent implements OnInit {
  readonly titleMaxLength: number = 65;
  readonly bodyMaxLength: number = 240;
  form: UntypedFormGroup = new UntypedFormGroup({});
  tags$: Observable<CustomerTagDto[]> = this.crudCustomerService.tags();
  @Output() send: EventEmitter<PushNotificationCustomCreateInput> = new EventEmitter<PushNotificationCustomCreateInput>();

  constructor(private readonly formBuilder: UntypedFormBuilder, private readonly crudCustomerService: CrudCustomerService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(this.titleMaxLength)]],
      body: [null, [Validators.required, Validators.maxLength(this.bodyMaxLength)]],
      tags: [null],
      sendDate: [null],
      signDateMin: [null],
      signDateMax: [null],
    });
  }

  onSubmit(): void {
    const { title, body, sendDate, signDateMin, signDateMax, tags } = this.form ? this.form.value : undefined;

    this.send.emit({ title, body, userGroup: UserGroupEnum.Customer, sendDate, tags, signDateMin, signDateMax });
  }
}
