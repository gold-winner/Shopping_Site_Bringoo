import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreConsultantService } from '../../../../../../../../shared/api/auth/crud-store-consultant.service';
import {
  StoreConsultantCreateInput,
  StoreConsultantEntity,
  StoreConsultantUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreConsultantsCreateFormComponent } from '../store-consultants-create-form/store-consultants-create-form.component';
import { StoreConsultantsFilterFormComponent } from '../store-consultants-filter-form/store-consultants-filter-form.component';
import { StoreConsultantsUpdateFormComponent } from '../store-consultants-update-form/store-consultants-update-form.component';

@Component({
  selector: 'app-store-consultants-crud',
  templateUrl: './store-consultants-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreConsultantsCrudComponent {
  createForm: Type<DynamicForm<StoreConsultantCreateInput>> = StoreConsultantsCreateFormComponent;
  updateForm: Type<DynamicForm<StoreConsultantUpdateInput>> = StoreConsultantsUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreConsultantsFilterFormComponent;

  fields: CrudFields<StoreConsultantEntity> = ['firstName', 'lastName', 'email', 'phoneNumber', 'phoneCountryCode', 'productTypes'];

  config: CrudConfig = {
    title: 'Store Consultants',
    plural: 'Store Consultants',
    single: 'Store Consultant',
  };

  columns: CrudColumn<StoreConsultantEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'firstName',
      getField(item: StoreConsultantEntity): EntityValue {
        return `${item.firstName} ${item.lastName}`;
      },
      type: 'text',
    },
    {
      label: 'Phone',
      isSortable: true,
      sortBy: 'phoneCountryCode',
      getField(item: StoreConsultantEntity): EntityValue {
        return `+${item.phoneCountryCode} ${item.phoneNumber}`;
      },
      type: 'text',
    },
    {
      label: 'E-mail',
      isSortable: true,
      sortBy: 'email',
      getField(item: StoreConsultantEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Product Types',
      isSortable: true,
      sortBy: 'productTypes',
      getField(item: StoreConsultantEntity): EntityValue {
        return item.productTypes;
      },
      type: 'tags',
    },
  ];

  constructor(public readonly service: CrudStoreConsultantService) {}
}
