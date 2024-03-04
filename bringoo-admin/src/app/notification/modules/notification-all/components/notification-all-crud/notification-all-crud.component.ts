import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

import { CrudPushNotificationService } from '../../../../../../shared/api/auth/crud-push-notification.service';
import { PushNotificationEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { NotificationAllFilterFormComponent } from '../notification-all-filter-form/notification-all-filter-form.component';

@Component({
  selector: 'app-notification-all-crud',
  templateUrl: './notification-all-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationAllCrudComponent {
  @Input() reloadPage: symbol | undefined;
  filterForm: Type<DynamicFilterFormComponent> = NotificationAllFilterFormComponent;

  fields: CrudFields<PushNotificationEntity> = ['title', 'body', 'userGroup', 'userIds', 'isActiveOnly', 'status', 'sendDate'];

  config: CrudConfig;

  columns: CrudColumn<PushNotificationEntity>[] = [
    {
      label: 'Title',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.title;
      },
      type: 'text',
    },
    {
      label: 'Body',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.body;
      },
      type: 'text',
    },
    {
      label: 'User Group',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.userGroup;
      },
      type: 'text',
    },
    {
      label: 'For Online Users Only',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.isActiveOnly ? 'Yes' : 'No';
      },
      type: 'text',
    },
    {
      label: 'Users amount',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.userIds.length;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.status;
      },
      type: 'text',
    },
    {
      label: 'Send Date',
      isSortable: false,
      getField(item: PushNotificationEntity): EntityValue {
        return item.sendDate;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudPushNotificationService) {
    this.config = {
      title: 'All Push Notifications',
      plural: 'All Push Notifications',
      single: 'Push Notification',
      isEditButtonVisible: false,
      isCreateButtonVisible: false,
    };
  }
}
