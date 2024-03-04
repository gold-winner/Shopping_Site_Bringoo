import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductRecallService } from '../../../../../../shared/api/auth/crud-product-recall.service';
import {
  ProductRecallCreateInput,
  ProductRecallEntity,
  ProductRecallUpdateInput,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductRecallCreateFormComponent } from '../product-recall-create/product-recall-create-form.component';
import { ProductRecallFilterFormComponent } from '../product-recall-filter-form/product-recall-filter-form.component';
import { ProductRecallUpdateFormComponent } from '../product-recall-update/product-recall-update-form.component';

@Component({
  selector: 'app-product-recall-crud',
  templateUrl: './product-recall-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallCrudComponent {
  createForm: Type<DynamicForm<ProductRecallCreateInput>> = ProductRecallCreateFormComponent;
  updateForm: Type<DynamicForm<ProductRecallUpdateInput>> = ProductRecallUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductRecallFilterFormComponent;

  fields: CrudFields<ProductRecallEntity> = ['isActive', 'reason', 'startDateTime', 'endDateTime', 'stores'];
  join: string[] = ['stores', 'reason', 'product', 'product.category', 'product.subcategory', 'product.productBrand'];

  config: CrudConfig = {
    title: 'Product Recalls',
    plural: 'Product Recalls',
    single: 'Product Recall',
    formWidth: 700,
    formBundleWidth: '90%',
  };

  columns: CrudColumn<ProductRecallEntity>[] = [
    {
      label: 'Is Active',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductRecallEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Product Name',
      isSortable: true,
      sortBy: 'product.name_i18n',
      getField(item: ProductRecallEntity): EntityValue {
        return `${item.product?.name_i18n} (${item.product?.ean})`;
      },
      type: 'link',
      fixedLeft: true,
      link(item: ProductRecallEntity): string {
        return `./${item.id}`;
      },
    },
    {
      label: 'Product Code',
      isSortable: true,
      sortBy: 'product.code',
      getField(item: ProductRecallEntity): EntityValue {
        return item.product?.code;
      },
      type: 'text',
    },
    {
      label: 'Product Category',
      isSortable: false,
      getField(item: ProductRecallEntity): EntityValue {
        return item.product?.category?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Product Subcategory',
      isSortable: false,
      getField(item: ProductRecallEntity): EntityValue {
        return item.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Product Brand',
      isSortable: false,
      getField(item: ProductRecallEntity): EntityValue {
        return item.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Stores',
      isSortable: false,
      getField(item: ProductRecallEntity): EntityValue {
        return (item.stores || []).map(({ name_i18n }: StoreEntity) => name_i18n);
      },
      type: 'tags',
      fixedLeft: true,
    },
    {
      label: 'Reason',
      isSortable: true,
      sortBy: 'reason',
      getField(item: ProductRecallEntity): EntityValue {
        return `${item.reason?.name_i18n} ${item.reason?.code}`;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Start Date',
      isSortable: false,
      sortBy: 'startDateTime',
      getField(item: ProductRecallEntity): EntityValue {
        return item.startDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: false,
      sortBy: 'endDateTime',
      getField(item: ProductRecallEntity): EntityValue {
        return item.endDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudProductRecallService) {}
}
