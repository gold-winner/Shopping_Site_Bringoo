import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductBrandService } from '../../../../../../shared/api/auth/crud-product-brand.service';
import { ProductBrandCreateInput, ProductBrandEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductBrandCreateFormComponent } from '../create-form/product-brand-create-form.component';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-products-brand-crud-list',
  templateUrl: './crud-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudListComponent {
  createForm: Type<DynamicForm<ProductBrandCreateInput>> = ProductBrandCreateFormComponent;
  updateForm: Type<DynamicForm<ProductBrandCreateInput>> = ProductBrandCreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<ProductBrandEntity> = ['name_i18n', 'code', 'isActive', 'imageUrl', 'watermarkImageUrl'];

  config: CrudConfig = {
    title: 'Product Brands',
    plural: 'Product Brands',
    single: 'Product Brand',
  };

  columns: CrudColumn<ProductBrandEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductBrandEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Watermark',
      isSortable: false,
      getField(item: ProductBrandEntity): EntityValue {
        return item.watermarkImageUrl;
      },
      type: 'image',
      nzWidth: '90px',
      fixedLeft: true,
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductBrandEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ProductBrandEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Is Active',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductBrandEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudProductBrandService) {}
}
