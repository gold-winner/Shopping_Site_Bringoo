import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCustomerLoyaltyProgramService } from '../../../../../../../../shared/api/auth/crud-customer-loyalty-program.service';
import {
  CustomerLoyaltyProgramCreateInput,
  CustomerLoyaltyProgramEntity,
  CustomerLoyaltyProgramUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerLoyaltyProgramCreateFormComponent } from '../customer-loyalty-program-create-form/customer-loyalty-program-create-form.component';
import { CustomerLoyaltyProgramFilterFormComponent } from '../customer-loyalty-program-filter-form/customer-loyalty-program-filter-form.component';
import { CustomerLoyaltyProgramUpdateFormComponent } from '../customer-loyalty-program-update-form/customer-loyalty-program-update-form.component';

@Component({
  selector: 'app-customer-loyalty-program-crud',
  templateUrl: './customer-loyalty-program-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerLoyaltyProgramCrudComponent {
  createForm: Type<DynamicForm<CustomerLoyaltyProgramCreateInput>> = CustomerLoyaltyProgramCreateFormComponent;
  updateForm: Type<DynamicForm<CustomerLoyaltyProgramUpdateInput>> = CustomerLoyaltyProgramUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CustomerLoyaltyProgramFilterFormComponent;

  fields: CrudFields<CustomerLoyaltyProgramEntity> = ['loyaltyProgramId', 'cardNumber'];
  join: string[] = ['loyaltyProgram'];

  config: CrudConfig = {
    title: 'Loyalty Programs',
    plural: 'Loyalty Programs',
    single: 'Loyalty Program',
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<CustomerLoyaltyProgramEntity>[] = [
    {
      label: 'Loyalty Program Name',
      isSortable: true,
      sortBy: 'loyaltyProgram.name_i18n',
      getField(item: CustomerLoyaltyProgramEntity): EntityValue {
        return item.loyaltyProgram?.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
      nzWidth: '150px',
    },
    {
      label: 'Loyalty Program Code',
      isSortable: true,
      sortBy: 'loyaltyProgram.code',
      getField(item: CustomerLoyaltyProgramEntity): EntityValue {
        return item.loyaltyProgram?.code;
      },
      type: 'text',
    },
    {
      label: 'Card Number',
      isSortable: false,
      getField(item: CustomerLoyaltyProgramEntity): EntityValue {
        return item.cardNumber;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudCustomerLoyaltyProgramService) {}
}
