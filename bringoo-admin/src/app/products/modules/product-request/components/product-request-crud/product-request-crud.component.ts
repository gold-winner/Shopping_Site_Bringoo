import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductRequestService } from '../../../../../../shared/api/auth/crud-product-request.service';
import { ProductRequestEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductRequestFilterFormComponent } from '../product-request-filter-form/product-request-filter-form.component';

@Component({
  selector: 'app-product-request-crud',
  templateUrl: './product-request-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRequestCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = ProductRequestFilterFormComponent;
  fields: CrudFields<ProductRequestEntity> = [
    'requestCode',
    'name_i18n',
    'isActive',
    'status',
    'sku',
    'isAlcohol',
    'isPickAndDrive',
    'imageUrls',
    'productMeasurement',
    'productUnitCode',
    'ean',
    'defaultPrice',
    'productBrandCode',
  ];

  join: string[] = [
    'productBrand||name_i18n',
    'category||name_i18n',
    'deposit||itemDepositValueGross,boxDepositValueGross',
    'subcategory||name_i18n',
    'manager',
    'manager.settings||firstName,lastName',
    'staff',
    'staff.settings||firstName,lastName',
  ];

  config: CrudConfig = {
    title: 'Products',
    plural: 'Products',
    single: 'Product',
    formWidth: 1000,
    formBundleWidth: 600,
    isActionColumnVisible: false,
    isDeleteButtonVisible: false,
    isDetailButtonVisible: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isCreateButtonVisible: false,
  };

  columns: CrudColumn<ProductRequestEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductRequestEntity): EntityValue {
        return item.imageUrls ? item.imageUrls[0] : 'error';
      },
      type: 'image',
    },
    {
      label: 'Link',
      isSortable: true,
      sortBy: 'staff.settings.firstName,staff.settings.lastName',
      getField(): EntityValue {
        return `Request`;
      },
      type: 'link',
      link(item: ProductRequestEntity): any {
        return `details/${item.id}`;
      },
    },
    {
      label: 'Request Code',
      isSortable: true,
      sortBy: 'requestCode',
      getField(item: ProductRequestEntity): EntityValue {
        return item.requestCode;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductRequestEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Default price',
      isSortable: true,
      sortBy: 'defaultPrice',
      getField(item: ProductRequestEntity): EntityValue {
        return item.defaultPrice ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Unit',
      isSortable: true,
      sortBy: 'productMeasurement',
      getField(item: ProductRequestEntity): EntityValue {
        return `${item.productMeasurement}`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'isActive',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductRequestEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'status',
      getField(item: ProductRequestEntity): EntityValue {
        return item.status;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: true,
      sortBy: 'productBrandCode',
      getField(item: ProductRequestEntity): EntityValue {
        return item.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: false,
      getField(item: ProductRequestEntity): EntityValue {
        return item.category?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Subcategory',
      isSortable: false,
      getField(item: ProductRequestEntity): EntityValue {
        return item.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'EAN',
      isSortable: false,
      getField(item: ProductRequestEntity): EntityValue {
        return item.ean;
      },
      type: 'text',
    },
    {
      label: 'Creator',
      isSortable: true,
      sortBy: 'staff.settings.firstName,staff.settings.lastName',
      getField(item: ProductRequestEntity): EntityValue {
        return `${item.staff?.settings?.firstName} ${item.staff?.settings?.lastName}`;
      },
      type: 'link',
      link(item: ProductRequestEntity): any {
        return `../../users/staff/details/${item.staff?.id}`;
      },
    },
    {
      label: 'Approver',
      isSortable: true,
      sortBy: 'manager.settings.firstName,manager.settings.lastName',
      getField(item: ProductRequestEntity): EntityValue {
        return item.manager?.settings?.firstName ? `${item.manager?.settings?.firstName} ${item.manager?.settings?.lastName}` : '';
      },
      type: 'link',
      link(item: ProductRequestEntity): any {
        return `../../users/managers/details/${item.manager?.id}`;
      },
    },
  ];

  constructor(public readonly service: CrudProductRequestService) {}
}
