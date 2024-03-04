import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCustomerSessionHistoryService } from '../../../../../../../shared/api/auth/crud-customer-session-history.service';
import { CustomerSessionHistoryEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerSessionHistoryFilterComponent } from './customer-session-history-filter/customer-session-history-filter.component';

@Component({
  selector: 'app-customer-session-history',
  templateUrl: './customer-session-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSessionHistoryComponent {
  filterForm: Type<DynamicFilterFormComponent> = CustomerSessionHistoryFilterComponent;

  fields: CrudFields<CustomerSessionHistoryEntity> = [
    'create_date',
    'deviceType',
    'deviceName',
    'deviceOs',
    'deviceBrand',
    'ipAddress',
    'appVersion',
    'allowedNotifications',
    'allowedLocationTracking',
  ];

  config: CrudConfig = {
    title: 'Device session history',
    plural: 'Device session histories',
    single: 'Device session history',
    isDeleteButtonVisible: false,
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<CustomerSessionHistoryEntity>[] = [
    {
      label: 'Last session',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
      fixedLeft: true,
      nzWidth: '150px',
    },
    {
      label: 'Device Type',
      isSortable: true,
      sortBy: 'deviceType',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.deviceType;
      },
      type: 'text',
    },
    {
      label: 'Device Name',
      isSortable: true,
      sortBy: 'deviceName',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.deviceName;
      },
      type: 'text',
    },
    {
      label: 'Device OS',
      isSortable: true,
      sortBy: 'deviceOs',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.deviceOs;
      },
      type: 'text',
    },
    {
      label: 'Device Brand',
      isSortable: true,
      sortBy: 'deviceBrand',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.deviceBrand;
      },
      type: 'text',
    },
    {
      label: 'App Version',
      isSortable: true,
      sortBy: 'appVersion',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.appVersion ?? '---';
      },
      type: 'text',
    },
    {
      label: 'IP Address',
      isSortable: true,
      sortBy: 'ipAddress',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.ipAddress;
      },
      type: 'text',
    },
    {
      label: 'Notifications',
      isSortable: true,
      sortBy: 'allowedNotifications',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.allowedNotifications;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Allowed',
        falseText: 'Not allowed',
      },
    },
    {
      label: 'Location Tracking',
      isSortable: true,
      sortBy: 'allowedLocationTracking',
      getField(item: CustomerSessionHistoryEntity): EntityValue {
        return item.allowedLocationTracking;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Allowed',
        falseText: 'Not allowed',
      },
    },
  ];

  constructor(public readonly service: CrudCustomerSessionHistoryService) {}
}
