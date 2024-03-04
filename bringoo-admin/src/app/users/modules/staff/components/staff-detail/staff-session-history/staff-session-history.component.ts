import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStaffSessionHistoryService } from '../../../../../../../shared/api/auth/crud-staff-session-history.service';
import { StaffSessionHistoryEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { StaffSessionHistoryFilterComponent } from './staff-session-history-filter/staff-session-history-filter.component';

@Component({
  selector: 'app-staff-session-history',
  templateUrl: './staff-session-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffSessionHistoryComponent {
  filterForm: Type<DynamicFilterFormComponent> = StaffSessionHistoryFilterComponent;

  fields: CrudFields<StaffSessionHistoryEntity> = [
    'create_date',
    'deviceType',
    'deviceName',
    'deviceOs',
    'deviceBrand',
    'appVersion',
    'ipAddress',
    'allowedNotifications',
    'allowedLocationTracking',
  ];

  config: CrudConfig = {
    title: 'Device session history',
    plural: 'Devices session histories',
    single: 'Device session history',
    isDeleteButtonVisible: false,
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<StaffSessionHistoryEntity>[] = [
    {
      label: 'Last session',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Device Type',
      isSortable: true,
      sortBy: 'deviceType',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.deviceType;
      },
      type: 'text',
    },
    {
      label: 'Device Name',
      isSortable: true,
      sortBy: 'deviceName',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.deviceName;
      },
      type: 'text',
    },
    {
      label: 'Device OS',
      isSortable: true,
      sortBy: 'deviceOs',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.deviceOs;
      },
      type: 'text',
    },
    {
      label: 'Device Brand',
      isSortable: true,
      sortBy: 'deviceBrand',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.deviceBrand;
      },
      type: 'text',
    },
    {
      label: 'IP Address',
      isSortable: true,
      sortBy: 'ipAddress',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.ipAddress;
      },
      type: 'text',
    },
    {
      label: 'App Version',
      isSortable: true,
      sortBy: 'appVersion',
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.appVersion;
      },
      type: 'text',
    },
    {
      label: 'Notifications',
      isSortable: true,
      sortBy: 'allowedNotifications',
      getField(item: StaffSessionHistoryEntity): EntityValue {
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
      getField(item: StaffSessionHistoryEntity): EntityValue {
        return item.allowedLocationTracking;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Allowed',
        falseText: 'Not allowed',
      },
    },
  ];

  constructor(public readonly service: CrudStaffSessionHistoryService) {}
}
