import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCustomerAddressService } from '../../../../../../../../shared/api/auth/crud-customer-address.service';
import {
  CustomerAddressCreateInput,
  CustomerAddressEntity,
  CustomerAddressUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerAddressCrudSettings } from '../../../../configs/customer-address-crud.settings';
import { CustomerAddressCreateFormComponent } from '../customer-address-create-form/customer-address-create-form.component';
import { CustomerAddressFilterFormComponent } from '../customer-address-filter-form/customer-address-filter-form.component';
import { CustomerAddressUpdateFormComponent } from '../customer-address-update-form/customer-address-update-form.component';

@Component({
  selector: 'app-customer-address-crud',
  templateUrl: './customer-address-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressCrudComponent {
  createForm: Type<DynamicForm<CustomerAddressCreateInput>> = CustomerAddressCreateFormComponent;
  updateForm: Type<DynamicForm<CustomerAddressUpdateInput>> = CustomerAddressUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CustomerAddressFilterFormComponent;

  fields: CrudFields<CustomerAddressEntity> = CustomerAddressCrudSettings.fields;
  join: string[] = CustomerAddressCrudSettings.join;
  config: CrudConfig = { ...CustomerAddressCrudSettings.config, useTableHeightCalculation: false };
  columns: CrudColumn<CustomerAddressEntity>[] = CustomerAddressCrudSettings.columns;

  constructor(public readonly service: CrudCustomerAddressService) {}
}
