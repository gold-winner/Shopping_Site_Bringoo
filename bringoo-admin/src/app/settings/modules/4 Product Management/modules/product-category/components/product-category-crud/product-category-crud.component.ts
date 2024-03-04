import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { take } from 'rxjs/operators';

import { CrudProductCategoryService } from '../../../../../../../../shared/api/auth/crud-product-category.service';
import {
  ProductCategoryCreateInput,
  ProductCategoryEntity,
  ProductCategoryUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductCategoryCreateFormComponent } from '../product-category-create-form/product-category-create-form.component';
import { ProductCategoryFilterFormComponent } from '../product-category-filter-form/product-category-filter-form.component';
import { ProductCategoryUpdateFormComponent } from '../product-category-update-form/product-category-update-form.component';

@Component({
  selector: 'app-product-category-crud',
  templateUrl: './product-category-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryCrudComponent {
  createForm: Type<DynamicForm<ProductCategoryCreateInput>> = ProductCategoryCreateFormComponent;
  updateForm: Type<DynamicForm<ProductCategoryUpdateInput>> = ProductCategoryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductCategoryFilterFormComponent;

  fields: CrudFields<ProductCategoryEntity> = ['name_i18n', 'code', 'isActive', 'order', 'imageUrl', 'vendorCategoryCode'];

  reloadPage: symbol | undefined;

  config: CrudConfig = {
    title: 'Product Category Setup',
    plural: 'Product Categories',
    single: 'Product Category',
    isDragged: true,
  };

  columns: CrudColumn<ProductCategoryEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductCategoryEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductCategoryEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'link',
      link(item: ProductCategoryEntity): string {
        return item.code ?? '';
      },
    },
    {
      label: 'Vendor Category',
      isSortable: true,
      sortBy: 'vendorCategoryCode',
      getField(item: ProductCategoryEntity): EntityValue {
        return item.vendorCategoryCode;
      },
      type: 'text',
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ProductCategoryEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Order',
      isSortable: true,
      sortBy: 'order',
      getField(item: ProductCategoryEntity): EntityValue {
        return item.order;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductCategoryEntity): EntityValue {
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
    if (sourceId && targetId && sourceId !== targetId) {
      this.service
        .changeOrder({ sourceId, targetId })
        .pipe(take(1))
        .subscribe(() => (this.reloadPage = Symbol('reload')));
    }
  }

  constructor(public readonly service: CrudProductCategoryService) {}
}
