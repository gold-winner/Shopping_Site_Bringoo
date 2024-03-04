import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCustomerBonusService } from '../../../../../../../../shared/api/auth/crud-customer-bonus.service';
import {
  CustomerBonusCreateInput,
  CustomerBonusEntity,
  CustomerBonusUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerBonusCreateFormComponent } from '../customer-bonus-create-form/customer-bonus-create-form.component';
import { CustomerBonusFilterFormComponent } from '../customer-bonus-filter-form/customer-bonus-filter-form.component';
import { CustomerBonusUpdateFormComponent } from '../customer-bonus-update-form/customer-bonus-update-form.component';

@Component({
  selector: 'app-customer-bonus-crud',
  templateUrl: './customer-bonus-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerBonusCrudComponent {
  createForm: Type<DynamicForm<CustomerBonusCreateInput>> = CustomerBonusCreateFormComponent;
  updateForm: Type<DynamicForm<CustomerBonusUpdateInput>> = CustomerBonusUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CustomerBonusFilterFormComponent;

  fields: CrudFields<CustomerBonusEntity> = ['isActive', 'create_date', 'bonusType', 'voucherCode'];

  config: CrudConfig = {
    title: 'Customer bonus',
    plural: 'Customer bonuses',
    single: 'Customer bonus',
  };

  columns: CrudColumn<CustomerBonusEntity>[] = [
    {
      label: 'Create Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: CustomerBonusEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Status',
      isSortable: true,
      getField(item: CustomerBonusEntity): EntityValue {
        return item.isActive ? 'Yes' : 'No';
      },
      type: 'text',
      nzWidth: '100px',
      fixedLeft: true,
    },
    {
      label: 'Bonus Type',
      isSortable: true,
      getField(item: CustomerBonusEntity): EntityValue {
        return item.bonusType;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudCustomerBonusService) {}
}
