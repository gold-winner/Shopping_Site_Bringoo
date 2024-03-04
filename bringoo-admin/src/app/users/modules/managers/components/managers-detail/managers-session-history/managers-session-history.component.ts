import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudManagerSessionHistoryService } from '../../../../../../../shared/api/auth/crud-manager-session-history.service';
import { ManagerSessionHistoryEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { ManagersSessionHistoryFilterComponent } from './managers-session-history-filter/managers-session-history-filter.component';

@Component({
  selector: 'app-managers-session-history',
  templateUrl: './managers-session-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersSessionHistoryComponent {
  filterForm: Type<DynamicFilterFormComponent> = ManagersSessionHistoryFilterComponent;

  fields: CrudFields<ManagerSessionHistoryEntity> = ['create_date', 'deviceType', 'deviceName', 'deviceOs', 'deviceBrand', 'ipAddress'];

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

  columns: CrudColumn<ManagerSessionHistoryEntity>[] = [
    {
      label: 'Last session',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Device Type',
      isSortable: true,
      sortBy: 'deviceType',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.deviceType;
      },
      type: 'text',
    },
    {
      label: 'Device Name',
      isSortable: true,
      sortBy: 'deviceName',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.deviceName;
      },
      type: 'text',
    },
    {
      label: 'Device OS',
      isSortable: true,
      sortBy: 'deviceOs',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.deviceOs;
      },
      type: 'text',
    },
    {
      label: 'Device Brand',
      isSortable: true,
      sortBy: 'deviceBrand',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.deviceBrand;
      },
      type: 'text',
    },
    {
      label: 'IP Address',
      isSortable: true,
      sortBy: 'ipAddress',
      getField(item: ManagerSessionHistoryEntity): EntityValue {
        return item.ipAddress;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudManagerSessionHistoryService) {}
}
