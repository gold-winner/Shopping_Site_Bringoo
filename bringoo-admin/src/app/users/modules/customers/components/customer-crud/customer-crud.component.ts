import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCustomerService } from '../../../../../../shared/api/auth/crud-customer.service';
import { CustomerCreateInput, CustomerEntity, CustomerUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerCreateFormComponent } from '../customer-create-form/customer-create-form.component';
import { CustomerFilterFormComponent } from '../customer-filter-form/customer-filter-form.component';
import { CustomerUpdateFormComponent } from '../customer-update-form/customer-update-form.component';

@Component({
  selector: 'app-customer-crud',
  templateUrl: './customer-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCrudComponent {
  createForm: Type<DynamicForm<CustomerCreateInput>> = CustomerCreateFormComponent;
  updateForm: Type<DynamicForm<CustomerUpdateInput>> = CustomerUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CustomerFilterFormComponent;

  fields: CrudFields<CustomerEntity> = [
    'email',
    'isActive',
    'role',
    'isOnline',
    'isEmailVerified',
    'create_date',
    'update_date',
    'customerTags',
  ];

  join: string[] = ['settings||firstName,lastName,customerNumber,customerLanguageCode,photoUrl', 'bans'];

  config: CrudConfig = {
    title: 'Customers',
    plural: 'Customers',
    single: 'Customer',
  };

  columns: CrudColumn<CustomerEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: CustomerEntity): EntityValue {
        return item.settings?.photoUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Email',
      isSortable: true,
      sortBy: 'email',
      getField(item: CustomerEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'settings.firstName,settings.lastName',
      getField(item: CustomerEntity): EntityValue {
        return `${item.settings?.firstName} ${item.role === 'GUEST' ? '' : item.settings?.lastName}`;
      },
      type: 'link',
      link(item: CustomerEntity): any {
        return `details/${item.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Customer number',
      isSortable: true,
      sortBy: 'settings.customerNumber',
      getField(item: CustomerEntity): EntityValue {
        return item.settings?.customerNumber;
      },
      type: 'text',
    },
    {
      label: 'Is online',
      isSortable: true,
      sortBy: 'isOnline',
      getField(item: CustomerEntity): EntityValue {
        return item.isOnline;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Online',
        falseText: 'Offline',
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CustomerEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Verified email',
      isSortable: true,
      sortBy: 'isEmailVerified',
      getField(item: CustomerEntity): EntityValue {
        return item.isEmailVerified;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Verified',
        falseText: 'Unverified',
      },
    },
    {
      label: 'Is Banned',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CustomerEntity): EntityValue {
        return !item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'No',
        falseText: 'Yes',
      },
    },
    {
      label: 'Tags',
      isSortable: true,
      sortBy: 'customerTags',
      getField(item: CustomerEntity): EntityValue {
        return item.customerTags || [];
      },
      type: 'tags',
    },
    {
      label: 'Language',
      isSortable: true,
      sortBy: 'settings.customerLanguageCode',
      getField(item: CustomerEntity): EntityValue {
        return item.settings?.customerLanguageCode;
      },
      type: 'text',
      align: 'center',
    },
    {
      label: 'Date create',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: CustomerEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Date update',
      isSortable: true,
      sortBy: 'update_date',
      getField(item: CustomerEntity): EntityValue {
        return item.update_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudCustomerService) {}
}
