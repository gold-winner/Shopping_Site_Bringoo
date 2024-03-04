import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

import { CrudPushNotificationCustomService } from '../../../../../../shared/api/auth/crud-push-notification-custom.service';
import { PushNotificationCustomEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { NotificationCustomFilterFormComponent } from '../notification-custom-filter-form/notification-custom-filter-form.component';

@Component({
  selector: 'app-notification-custom-crud',
  templateUrl: './notification-custom-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCustomCrudComponent {
  @Input() reloadPage: symbol | undefined;
  filterForm: Type<DynamicFilterFormComponent> = NotificationCustomFilterFormComponent;

  join: string[] = ['managerCreator', 'managerCreator.settings'];
  fields: CrudFields<PushNotificationCustomEntity> = [
    'title',
    'body',
    'userGroup',
    'tags',
    'status',
    'recepientsAmount',
    'sendDate',
    'managerCreatorId',
    'create_date',
  ];

  config: CrudConfig;

  columns: CrudColumn<PushNotificationCustomEntity>[] = [
    {
      label: 'Title',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.title;
      },
      type: 'text',
    },
    {
      label: 'Body',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.body;
      },
      type: 'text',
    },
    {
      label: 'Creator',
      isSortable: true,
      sortBy: 'managerCreator.settings.firstName,managerCreator.settings.lastName',
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.managerCreator?.settings?.firstName
          ? `${item.managerCreator?.settings?.firstName} ${item.managerCreator?.settings?.lastName}`
          : '';
      },
      type: 'text',
    },
    {
      label: 'User Group',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.userGroup;
      },
      type: 'text',
    },
    {
      label: 'Tags',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.tags?.length && item.tags?.length > 0 ? item.tags?.join(',') : '';
      },
      type: 'text',
    },
    {
      label: 'Users amount',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.recepientsAmount;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.status;
      },
      type: 'text',
    },
    {
      label: 'Send Date',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.sendDate;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Create Date',
      isSortable: false,
      getField(item: PushNotificationCustomEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudPushNotificationCustomService) {
    this.config = {
      title: 'Custom Push Notifications',
      plural: 'Custom Push Notifications',
      single: 'Custom Push Notification',
      isEditButtonVisible: false,
      isCreateButtonVisible: false,
    };
  }
}
