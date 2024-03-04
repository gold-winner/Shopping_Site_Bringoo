import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';

import { CrudCustomerBanService } from '../../../../../../../../shared/api/auth/crud-customer-ban.service';
import { CustomerBanCreateInput, CustomerBanEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerBanCreateFormComponent } from '../customer-ban-create-form/customer-ban-create-form.component';
import { CustomerBanFilterFormComponent } from '../customer-ban-filter-form/customer-ban-filter-form.component';

@Component({
  selector: 'app-customer-ban-crud',
  templateUrl: './customer-ban-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBanCrudComponent implements OnInit {
  @Output() banStateNeedUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() subTitle: string = '';

  createForm: Type<DynamicForm<CustomerBanCreateInput>> = CustomerBanCreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CustomerBanFilterFormComponent;

  fields: CrudFields<CustomerBanEntity> = ['isActive', 'create_date', 'startDateTime', 'endDateTime', 'managerComment'];
  join: string[] = ['manager||email', 'manager.settings||firstName,lastName'];

  config: CrudConfig = {
    title: 'Customer ban',
    plural: 'Customer bans',
    single: 'Customer ban',
    isEditButtonVisible: false,
    isDeleteButtonVisible: false,
    isActionColumnVisible: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<CustomerBanEntity>[] = [
    {
      label: 'Is Banned',
      isSortable: false,
      getField(item: CustomerBanEntity): EntityValue {
        return item.isActive ? 'Yes' : 'No';
      },
      type: 'text',
      nzWidth: '100px',
      fixedLeft: true,
    },
    {
      label: 'Start Date',
      isSortable: false,
      sortBy: 'startDateTime',
      getField(item: CustomerBanEntity): EntityValue {
        return item.startDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: false,
      sortBy: 'endDateTime',
      getField(item: CustomerBanEntity): EntityValue {
        return item.endDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Manager',
      isSortable: false,
      getField(item: CustomerBanEntity): EntityValue {
        return `${item.manager?.settings?.firstName} ${item.manager?.settings?.lastName}`;
      },
      type: 'text',
    },
    {
      label: 'Manager Comment',
      isSortable: false,
      getField(item: CustomerBanEntity): EntityValue {
        return item.managerComment;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudCustomerBanService) {}

  ngOnInit(): void {
    this.config = {
      ...this.config,
      subTitle: this.subTitle,
    };
  }

  totalCountUpdated(): void {
    this.banStateNeedUpdate.emit();
  }
}
