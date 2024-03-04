import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreAddressService } from '../../../../../../../../shared/api/auth/crud-store-address.service';
import {
  StoreAddressCreateInput,
  StoreAddressEntity,
  StoreAddressUpdateInput,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreAddressCreateFormComponent } from '../store-address-create-form/store-address-create-form.component';
import { StoreAddressFilterFormComponent } from '../store-address-filter-form/store-address-filter-form.component';
import { StoreAddressUpdateFormComponent } from '../store-address-update-form/store-address-update-form.component';

@Component({
  selector: 'app-store-address-crud',
  templateUrl: './store-address-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreAddressCrudComponent {
  createForm: Type<DynamicForm<StoreAddressCreateInput>> = StoreAddressCreateFormComponent;
  updateForm: Type<DynamicForm<StoreAddressUpdateInput>> = StoreAddressUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreAddressFilterFormComponent;

  fields: CrudFields<StoreAddressEntity> = ['addressType', 'state', 'city', 'streetName', 'streetNumber', 'storeId', 'zipCode', 'location'];

  join: string[] = ['country||name_i18n'];

  store!: StoreEntity;

  config: CrudConfig = {
    title: 'Store Address',
    plural: 'Store Addresses',
    single: 'Store Address',
    formWidth: 1200,
  };

  columns: CrudColumn<StoreAddressEntity>[] = [
    {
      label: 'Type',
      isSortable: true,
      sortBy: 'addressType',
      getField(item: StoreAddressEntity): EntityValue {
        return item.addressType;
      },
      type: 'text',
    },
    {
      label: 'Street Name',
      isSortable: true,
      sortBy: 'streetName',
      getField(item: StoreAddressEntity): EntityValue {
        return item.streetName;
      },
      type: 'text',
    },
    {
      label: 'Street Number',
      isSortable: true,
      sortBy: 'streetNumber',
      getField(item: StoreAddressEntity): EntityValue {
        return item.streetNumber;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Zip',
      isSortable: true,
      sortBy: 'zipCode',
      getField(item: StoreAddressEntity): EntityValue {
        return [item.zipCode];
      },
      type: 'tags',
    },
    {
      label: 'City',
      isSortable: true,
      sortBy: 'city',
      getField(item: StoreAddressEntity): EntityValue {
        return item.city;
      },
      type: 'text',
    },
    {
      label: 'Country',
      isSortable: true,
      sortBy: 'city',
      getField(item: StoreAddressEntity): EntityValue {
        return item.country?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Location',
      isSortable: false,
      getField(item: StoreAddressEntity): EntityValue {
        return item.location;
      },
      type: 'location',
    },
  ];

  constructor(public readonly service: CrudStoreAddressService, public readonly storeDetailsService: StoreDetailsService) {}
}
