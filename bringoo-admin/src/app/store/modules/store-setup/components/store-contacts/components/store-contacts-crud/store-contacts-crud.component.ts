import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreContactService } from '../../../../../../../../shared/api/auth/crud-store-contact.service';
import {
  StoreContactCreateInput,
  StoreContactEntity,
  StoreContactUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreContactsCreateFormComponent } from '../store-contacts-create-form/store-contacts-create-form.component';
import { StoreContactsFilterFormComponent } from '../store-contacts-filter-form/store-contacts-filter-form.component';
import { StoreContactsUpdateFormComponent } from '../store-contacts-update-form/store-contacts-update-form.component';

@Component({
  selector: 'app-store-contacts-crud',
  templateUrl: './store-contacts-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreContactsCrudComponent {
  createForm: Type<DynamicForm<StoreContactCreateInput>> = StoreContactsCreateFormComponent;
  updateForm: Type<DynamicForm<StoreContactUpdateInput>> = StoreContactsUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreContactsFilterFormComponent;

  fields: CrudFields<StoreContactEntity> = [
    'firstName',
    'lastName',
    'phoneCountryCode',
    'phoneNumber',
    'email',
    'contactType',
    'city',
    'streetName',
    'streetNumber',
    'zipCode',
  ];

  join: string[] = ['country||name_i18n'];

  config: CrudConfig = {
    title: 'Store contact',
    plural: 'Store contacts',
    single: 'Store contact',
  };

  columns: CrudColumn<StoreContactEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'firstName',
      getField(item: StoreContactEntity): EntityValue {
        return `${item.firstName} ${item.lastName}`;
      },
      type: 'text',
    },
    {
      label: 'Phone',
      isSortable: true,
      sortBy: 'phoneCountryCode',
      getField(item: StoreContactEntity): EntityValue {
        return `+${item.phoneCountryCode} ${item.phoneNumber}`;
      },
      type: 'text',
    },
    {
      label: 'E-mail',
      isSortable: true,
      sortBy: 'email',
      getField(item: StoreContactEntity): EntityValue {
        return item.email;
      },
      type: 'text',
    },
    {
      label: 'Address',
      isSortable: false,
      getField(item: StoreContactEntity): EntityValue {
        const address: string[] = [item.streetName, item.streetNumber, item.country?.name_i18n, item.city].filter(Boolean) as string[];
        return `${address.join(', ')} (${item.zipCode})`;
      },
      type: 'text',
    },
    {
      label: 'Post',
      isSortable: true,
      sortBy: 'contactType',
      getField(item: StoreContactEntity): EntityValue {
        return item.contactType;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreContactService, public readonly storeDetailsService: StoreDetailsService) {}
}
