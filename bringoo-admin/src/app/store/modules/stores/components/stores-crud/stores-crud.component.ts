import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { StoreAddressEntity, StoreCreateInput, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { CrudStoreFields, CrudStoreJoin } from '../../../../../../shared/config/default-crud-tables-settings/crud-store-settings.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { StoresCreateFormComponent } from '../stores-create-form/stores-create-form.component';
import { StoresFilterFormComponent } from '../stores-filter-form/stores-filter-form.component';

@Component({
  selector: 'app-stores-crud',
  templateUrl: './stores-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresCrudComponent {
  createForm: Type<DynamicForm<StoreCreateInput>> = StoresCreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoresFilterFormComponent;

  fields: CrudFields<StoreEntity> = CrudStoreFields;
  join: string[] = CrudStoreJoin;

  config: CrudConfig;

  columns: CrudColumn<StoreEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return item.logoUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: StoreEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'link',
      link: (item: StoreEntity): string => {
        const page: string = this.route.snapshot.data.breadcrumb;
        if (page === 'Stores') {
          return `./${item.id}/basic-information`;
        }
        return `./${item.id}`;
      },
      fixedLeft: true,
    },
    {
      label: 'Store Region',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return item.region?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Vendor Type',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return item.vendorType?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Corporate',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return item.corporate?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: true,
      sortBy: 'storeBrandCode',
      getField(item: StoreEntity): EntityValue {
        return item.storeBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: StoreEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Address',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        const address: StoreAddressEntity | undefined = item.addresses?.find((v: StoreAddressEntity) => v.addressType === 'MAIN');
        return address ? `${address?.streetName} ${address?.streetNumber}` : '';
      },
      type: 'text',
    },
    {
      label: 'Deleted',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return !!item.deleted_date;
      },
      type: 'boolean',
      boolean: {
        trueText: 'yes',
        falseText: 'no',
      },
    },
  ];

  constructor(public readonly service: CrudStoreService, private route: ActivatedRoute) {
    const title: string = this.route.snapshot.data.breadcrumb ? 'Stores' : this.route.parent?.parent?.snapshot.data.breadcrumb;
    const hideCreateButton: boolean = this.route.snapshot.data['hideCreateButton'];
    this.config = {
      title: title,
      plural: 'Stores',
      single: 'Store',
      isEditButtonVisible: false,
      ...(hideCreateButton && { isCreateButtonVisible: false }),
    };
  }
}
