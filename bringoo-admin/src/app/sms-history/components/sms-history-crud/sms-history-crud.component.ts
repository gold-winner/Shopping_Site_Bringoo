import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AppManagerSmsService } from '../../../../shared/api/auth/app-manager-sms.service';
import { SmsMessageInput } from '../../../../shared/api/auth/data-contracts';
import { CrudSmsHistoryService } from '../../../../shared/api/message/crud-sms-history.service';
import { SmsHistoryEntity } from '../../../../shared/api/message/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../shared/modules/crud/types/crud-select.type';
import { SmsHistoryCreateFormComponent } from '../sms-history-create-form/sms-history-create-form.component';
import { SmsHistoryFilterFormComponent } from '../sms-history-filter-form/sms-history-filter-form.component';

@Component({
  selector: 'app-sms-history-crud',
  templateUrl: './sms-history-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsHistoryCrudComponent {
  @Input() userType: 'customer' | 'staff' | undefined;

  createForm: Type<DynamicForm<SmsMessageInput>> = SmsHistoryCreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = SmsHistoryFilterFormComponent;
  join: string[] = [];

  fields: CrudFields<SmsHistoryEntity> = ['isActive', 'create_date', 'message', 'isSent', 'userId', 'managerId', 'data', 'smsType'];

  config: CrudConfig = {
    title: 'Sms',
    plural: 'Sms',
    single: 'Sms',
    isEditButtonVisible: false,
    isDeleteButtonVisible: false,
    isActionColumnVisible: false,
    useTableHeightCalculation: false,
    onCreate: (input: any): Observable<boolean> => {
      if (this.userType === 'customer') {
        return this.appManagerSmsService.sendMessageFromManagerToCustomer(input);
      } else if (this.userType === 'staff') {
        return this.appManagerSmsService.sendMessageFromManagerToStaff(input);
      }

      return of(true);
    },
  };

  columns: CrudColumn<SmsHistoryEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: SmsHistoryEntity): EntityValue {
        return item.isSent;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Sent',
        falseText: 'Not sent',
      },
    },
    {
      label: 'Type',
      isSortable: false,
      getField(item: SmsHistoryEntity): EntityValue {
        return item.smsType;
      },
      type: 'text',
      fixedLeft: true,
      nzWidth: '120px',
    },
    {
      label: 'Create Date',
      isSortable: false,
      sortBy: 'create_date',
      getField(item: SmsHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Message',
      isSortable: false,
      getField(item: SmsHistoryEntity): EntityValue {
        return item.message;
      },
      type: 'text',
    },
    {
      label: 'Meta Data',
      isSortable: false,
      getField(item: SmsHistoryEntity): EntityValue {
        return JSON.stringify(item.data);
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudSmsHistoryService, public readonly appManagerSmsService: AppManagerSmsService) {}
}
