import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudOutOfStockService } from '../../../../../../../../shared/api/auth/crud-out-of-stock.service';
import { OutOfStockCreateInput, OutOfStockEntity, OutOfStockUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreOutOfStockCreateFormComponent } from '../store-out-of-stock-create-form/store-out-of-stock-create-form.component';
import { StoreOutOfStockFilterFormComponent } from '../store-out-of-stock-filter-form/store-out-of-stock-filter-form.component';
import { StoreOutOfStockUpdateFormComponent } from '../store-out-of-stock-update-form/store-out-of-stock-update-form.component';

@Component({
  selector: 'app-store-out-of-stock-crud',
  templateUrl: './store-out-of-stock-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreOutOfStockCrudComponent {
  createForm: Type<DynamicForm<OutOfStockCreateInput>> = StoreOutOfStockCreateFormComponent;
  updateForm: Type<DynamicForm<OutOfStockUpdateInput>> = StoreOutOfStockUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreOutOfStockFilterFormComponent;

  fields: CrudFields<OutOfStockEntity> = ['startDateTime', 'endDateTime', 'comment', 'productLinkId'];
  join: string[] = [
    'productLink',
    'productLink.product',
    'productLink.product.productBrand',
    'productLink.product.category',
    'productLink.product.subcategory',
  ];

  config: CrudConfig = {
    title: 'Store Out Of Stock',
    subTitle: 'Below information shows the products which are currently out of stock.',
    plural: 'Store Out Of Stock',
    single: 'Store Out Of Stock',
  };

  columns: CrudColumn<OutOfStockEntity>[] = [
    {
      label: 'Product',
      isSortable: false,
      getField(item: OutOfStockEntity): EntityValue {
        return item.productLink?.product?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: true,
      sortBy: 'productLink.product.productBrandCode',
      getField(item: OutOfStockEntity): EntityValue {
        return item.productLink?.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: true,
      sortBy: 'productLink.product.productCategoryCode',
      getField(item: OutOfStockEntity): EntityValue {
        return item.productLink?.product?.category?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Subcategory',
      isSortable: true,
      sortBy: 'productLink.product.productSubcategoryCode',
      getField(item: OutOfStockEntity): EntityValue {
        return item.productLink?.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Start Date',
      isSortable: true,
      sortBy: 'startDateTime',
      getField(item: OutOfStockEntity): EntityValue {
        return item.startDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: true,
      sortBy: 'endDateTime',
      getField(item: OutOfStockEntity): EntityValue {
        return item.endDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Comment',
      isSortable: false,
      getField(item: OutOfStockEntity): EntityValue {
        return item.comment;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudOutOfStockService, public readonly storeDetailsService: StoreDetailsService) {}
}
