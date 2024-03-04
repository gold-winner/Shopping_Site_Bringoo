import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudPushNotificationHistoryService } from '../../../../../../../../shared/api/auth/crud-push-notification-history.service';
import { PushNotificationHistoryEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { InitialNotificationsFilterFormComponent } from './initial-notifications-filter-form/initial-notifications-filter-form.component';

@Component({
  selector: 'app-initial-notifications',
  templateUrl: './initial-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialNotificationsComponent {
  filterForm: Type<DynamicFilterFormComponent> = InitialNotificationsFilterFormComponent;

  fields: CrudFields<PushNotificationHistoryEntity> & any = ['title', 'data', 'userGroup', 'userId', 'create_date'];

  join: string[] = [];

  config: CrudConfig = {
    title: 'Push Notification History',
    plural: 'Push Notification Histories',
    single: 'Push Notification History',
    formWidth: 1000,
    isActionColumnVisible: false,
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    isDeleteButtonVisible: false,
    patchUrlQueryFromFilterForm: false,
  };

  columns: CrudColumn<PushNotificationHistoryEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return `${item.data?.firstName} ${item.data?.lastName || ''}`;
      },
      type: 'link',
      link(item: PushNotificationHistoryEntity): string {
        return `/users/staff/details/${item.userId}`;
      },
    },
    {
      label: 'Notification Code',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.data?.code;
      },
      type: 'text',
    },
    {
      label: 'Message',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.title;
      },
      type: 'text',
    },
    {
      label: 'Date Send',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudPushNotificationHistoryService) {}
}
