import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
  PushNotificationCodeEnum,
  PushNotificationGroupEnum,
  PushNotificationTemplateUpdateInput,
  UserGroupEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-manager-roles-update-form',
  templateUrl: './notification-management-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationManagementUpdateFormComponent extends DynamicForm<PushNotificationTemplateUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  userGroupList: UserGroupEnum[] = Object.values(UserGroupEnum);
  notificationGroupList: PushNotificationGroupEnum[] = Object.values(PushNotificationGroupEnum);
  notificationCodeList: PushNotificationCodeEnum[] = Object.values(PushNotificationCodeEnum);

  buildForm(): void {
    this.form = this.fb.group({
      title_i18n: [null, [Validators.required]],
      body_i18n: [null, [Validators.required]],
      userGroup: [null, [Validators.required]],
      notificationGroup: [null, [Validators.required]],
      notificationCode: [null, [Validators.required]],
    });
  }
}
