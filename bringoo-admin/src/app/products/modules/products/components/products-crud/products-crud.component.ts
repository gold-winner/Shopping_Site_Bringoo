import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import {
  ProductCreateInput,
  ProductEntity,
  ProductUpdateInput,
  ProductUpdateManyInput,
} from '../../../../../../shared/api/auth/data-contracts';
import { ProductUnitsEnum } from '../../../../../../shared/enums/product-units.enum';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductsCreateFormComponent } from '../products-create-form/products-create-form.component';
import { ProductsFilterFormComponent } from '../products-filter-form/products-filter-form.component';
import { ProductsUpdateFormComponent } from '../products-update-form/products-update-form.component';
import { ProductsUpdateManyFormComponent } from '../products-update-many-form/products-update-many-form.component';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCrudComponent {
  createForm: Type<DynamicForm<ProductCreateInput>> = ProductsCreateFormComponent;
  updateForm: Type<DynamicForm<ProductUpdateInput>> = ProductsUpdateFormComponent;
  updateManyForm: Type<DynamicForm<ProductUpdateManyInput>> = ProductsUpdateManyFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductsFilterFormComponent;
  fields: CrudFields<ProductEntity> = [
    'name_i18n',
    'isActive',
    'sku',
    'isPickAndDrive',
    'imageUrls',
    'productMeasurement',
    'productUnitCode',
    'productVatPercent',
    'ean',
    'defaultPrice',
    'productBrandCode',
    'productType',
  ];

  join: string[] = [
    'productBrand||name_i18n',
    'category||name_i18n',
    'category.vendorCategory||name_i18n',
    'deposit||itemDepositValueGross,boxDepositValueGross,boxVatCode,itemVatCode',
    'subcategory||name_i18n',
  ];

  joinForForms: string[] = ['deposit', 'productAttributes'];

  config: CrudConfig = {
    title: 'Products',
    plural: 'Products',
    single: 'Product',
    formWidth: 1000,
    formBundleWidth: 600,
  };

  columns: CrudColumn<ProductEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductEntity): EntityValue {
        return item.imageUrls ? item.imageUrls[0] : 'error';
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Default price',
      isSortable: true,
      sortBy: 'defaultPrice',
      getField(item: ProductEntity): EntityValue {
        return item.defaultPrice ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Deposit',
      isSortable: true,
      sortBy: 'deposit.itemDepositValueGross',
      getField(item: ProductEntity): EntityValue {
        return item?.deposit?.itemDepositValueGross ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Box deposit',
      isSortable: false,
      getField(item: ProductEntity): EntityValue {
        return item?.deposit?.boxDepositValueGross ?? 0;
      },
      type: 'price',
      align: 'right',
    },
    {
      label: 'Unit',
      isSortable: true,
      sortBy: 'productMeasurement',
      getField(item: ProductEntity): EntityValue {
        return `${item.productMeasurement} ${ProductUnitsEnum[item.productUnitCode]}`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'VAT',
      isSortable: true,
      sortBy: 'productVatPercent',
      getField(item: ProductEntity): EntityValue {
        return `${item.productVatPercent}%`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Brand',
      isSortable: true,
      sortBy: 'productBrandCode',
      getField(item: ProductEntity): EntityValue {
        return item.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: false,
      getField(item: ProductEntity): EntityValue {
        return `${item.category?.name_i18n} (${item.category?.vendorCategory?.name_i18n})`;
      },
      type: 'text',
    },
    {
      label: 'Subcategory',
      isSortable: false,
      getField(item: ProductEntity): EntityValue {
        return item.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'EAN',
      isSortable: false,
      getField(item: ProductEntity): EntityValue {
        return item.ean;
      },
      type: 'text',
    },
    {
      label: 'Product Type',
      sortBy: 'productType',
      isSortable: true,
      getField(item: ProductEntity): EntityValue {
        return item.productType;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudProductService) {}
}
