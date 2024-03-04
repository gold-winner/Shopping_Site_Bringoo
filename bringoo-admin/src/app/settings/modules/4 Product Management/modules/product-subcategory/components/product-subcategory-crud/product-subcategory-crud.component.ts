import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductSubcategoryService } from '../../../../../../../../shared/api/auth/crud-product-subcategory.service';
import {
  ProductSubcategoryCreateInput,
  ProductSubcategoryEntity,
  ProductSubcategoryUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductSubcategoryCreateFormComponent } from '../product-subcategory-create-form/product-subcategory-create-form.component';
import { ProductSubcategoryFilterFormComponent } from '../product-subcategory-filter-form/product-subcategory-filter-form.component';
import { ProductSubcategoryUpdateFormComponent } from '../product-subcategory-update-form/product-subcategory-update-form.component';

@Component({
  selector: 'app-product-subcategory-crud',
  templateUrl: './product-subcategory-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSubcategoryCrudComponent {
  createForm: Type<DynamicForm<ProductSubcategoryCreateInput>> = ProductSubcategoryCreateFormComponent;
  updateForm: Type<DynamicForm<ProductSubcategoryUpdateInput>> = ProductSubcategoryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductSubcategoryFilterFormComponent;

  fields: CrudFields<ProductSubcategoryEntity> = ['name_i18n', 'code', 'isActive', 'order', 'imageUrl'];

  reloadPage: symbol | undefined;

  config: CrudConfig = {
    title: 'Product Subcategory Setup',
    plural: 'Product Subcategories',
    single: 'Product Subcategory',
    isDragged: true,
  };

  columns: CrudColumn<ProductSubcategoryEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductSubcategoryEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductSubcategoryEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ProductSubcategoryEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Order',
      isSortable: true,
      sortBy: 'order',
      getField(item: ProductSubcategoryEntity): EntityValue {
        return item.order;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductSubcategoryEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  draggedEnd([sourceId, targetId]: [string, string]): void {
    this.service.changeOrder({ sourceId, targetId }).subscribe(() => (this.reloadPage = Symbol('reload')));
  }

  constructor(public readonly service: CrudProductSubcategoryService) {}
}
