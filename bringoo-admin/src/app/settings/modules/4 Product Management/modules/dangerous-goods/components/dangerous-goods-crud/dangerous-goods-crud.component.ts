import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductDangerousGoodsService } from '../../../../../../../../shared/api/auth/crud-product-dangerous-goods.service';
import {
  ProductCategoryEntity,
  ProductDangerousGoodsCreateInput,
  ProductDangerousGoodsEntity,
  ProductDangerousGoodsUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { DangerousGoodsCreateFormComponent } from '../dangerous-goods-create-form/dangerous-goods-create-form.component';
import { DangerousGoodsUpdateFormComponent } from '../dangerous-goods-update-form/dangerous-goods-update-form.component';
import { DangerousGoodsFilterFormComponent } from '../product-category-filter-form/dangerous-goods-filter-form.component';

@Component({
  selector: 'app-dangerous-goods-crud',
  templateUrl: './dangerous-goods-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DangerousGoodsCrudComponent {
  createForm: Type<DynamicForm<ProductDangerousGoodsCreateInput>> = DangerousGoodsCreateFormComponent;
  updateForm: Type<DynamicForm<ProductDangerousGoodsUpdateInput>> = DangerousGoodsUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = DangerousGoodsFilterFormComponent;

  fields: CrudFields<ProductDangerousGoodsEntity> = ['name_i18n', 'code', 'isActive', 'imageUrl'];

  reloadPage: symbol | undefined;

  config: CrudConfig = {
    title: 'Dangerous Goods',
    plural: 'Dangerous Goods',
    single: 'Dangerous Goods',
  };

  columns: CrudColumn<ProductDangerousGoodsEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: ProductDangerousGoodsEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductDangerousGoodsEntity): EntityValue {
        return item.name_i18n;
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

  constructor(public readonly service: CrudProductDangerousGoodsService) {}
}
