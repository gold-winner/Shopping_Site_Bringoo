import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudPushNotificationSubscriptionService } from '../../../../shared/api/auth/crud-push-notification-subscription.service';
import { PushNotificationSubscriptionEntity } from '../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../shared/modules/crud/types/crud-select.type';
import { UserSubscriptionFilterComponent } from './user-subscription-filter/user-subscription-filter.component';

@Component({
  selector: 'app-user-subscription',
  templateUrl: './user-subscription.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSubscriptionComponent {
  filterForm: Type<DynamicFilterFormComponent> = UserSubscriptionFilterComponent;

  fields: CrudFields<PushNotificationSubscriptionEntity> = ['create_date', 'activeDate', 'deviceId', 'token'];

  config: CrudConfig = {
    title: 'Notification Subscription',
    plural: 'Notification Subscriptions',
    single: 'Notification Subscription',
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: true,
    isDeleteButtonVisible: true,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<PushNotificationSubscriptionEntity>[] = [
    {
      label: 'Active Date',
      isSortable: true,
      sortBy: 'activeDate',
      getField(item: PushNotificationSubscriptionEntity): EntityValue {
        return item.activeDate;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
      nzWidth: '150px',
    },
    {
      label: 'Device Id',
      isSortable: true,
      sortBy: 'deviceId',
      getField(item: PushNotificationSubscriptionEntity): EntityValue {
        return item.deviceId;
      },
      type: 'text',
    },
    {
      label: 'Token',
      isSortable: true,
      sortBy: 'token',
      getField(item: PushNotificationSubscriptionEntity): EntityValue {
        return item.token;
      },
      type: 'text',
    },
    {
      label: 'Create Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: PushNotificationSubscriptionEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
      nzWidth: '150px',
    },
  ];

  constructor(public readonly service: CrudPushNotificationSubscriptionService) {}
}
