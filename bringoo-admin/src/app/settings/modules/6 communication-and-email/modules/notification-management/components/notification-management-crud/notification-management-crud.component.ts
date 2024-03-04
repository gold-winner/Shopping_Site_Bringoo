import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudPushNotificationTemplateService } from '../../../../../../../../shared/api/auth/crud-push-notification-template.service';
import {
  PushNotificationTemplateCreateInput,
  PushNotificationTemplateEntity,
  PushNotificationTemplateUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { NotificationManagmentCreateFormComponent } from '../notification-management-create-form/notification-management-create-form.component';
import { NotificationManagementFilterFormComponent } from '../notification-management-filter-form/notification-management-filter-form.component';
import { NotificationManagementUpdateFormComponent } from '../notification-management-update-form/notification-management-update-form.component';

@Component({
  selector: 'app-manager-roles-crud',
  templateUrl: './notification-management-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationManagementCrudComponent {
  createForm: Type<DynamicForm<PushNotificationTemplateCreateInput>> = NotificationManagmentCreateFormComponent;
  updateForm: Type<DynamicForm<PushNotificationTemplateUpdateInput>> = NotificationManagementUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = NotificationManagementFilterFormComponent;

  fields: CrudFields<PushNotificationTemplateEntity> = ['title_i18n', 'body_i18n', 'userGroup', 'notificationGroup', 'notificationCode'];

  config: CrudConfig = {
    title: 'Push Notification Templates',
    plural: 'Push Notification Templates',
    single: 'Push Notification Template',
    formWidth: 600,
  };

  columns: CrudColumn<PushNotificationTemplateEntity>[] = [
    {
      label: 'Title',
      isSortable: true,
      sortBy: 'title_i18n',
      getField(item: PushNotificationTemplateEntity): EntityValue {
        return item.title_i18n;
      },
      type: 'text',
    },
    {
      label: 'Body',
      isSortable: true,
      sortBy: 'body_i18n',
      getField(item: PushNotificationTemplateEntity): EntityValue {
        return item.body_i18n;
      },
      type: 'text',
    },
    {
      label: 'User Group',
      isSortable: true,
      sortBy: 'userGroup',
      getField(item: PushNotificationTemplateEntity): EntityValue {
        return `${item.userGroup}`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Notification Group',
      isSortable: true,
      sortBy: 'notificationGroup',
      getField(item: PushNotificationTemplateEntity): EntityValue {
        return `${item.notificationGroup}`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Notification Code',
      isSortable: true,
      sortBy: 'notificationCode',
      getField(item: PushNotificationTemplateEntity): EntityValue {
        return `${item.notificationCode}`;
      },
      type: 'text',
      align: 'right',
    },
  ];

  constructor(public readonly service: CrudPushNotificationTemplateService) {}
}
