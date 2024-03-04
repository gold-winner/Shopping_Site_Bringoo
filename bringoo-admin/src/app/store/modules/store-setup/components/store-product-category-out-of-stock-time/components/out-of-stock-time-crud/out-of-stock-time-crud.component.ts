import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreProductCategoryOutOfStockTimeService } from '../../../../../../../../shared/api/auth/crud-store-product-category-out-of-stock-time.service';
import {
  StoreProductCategoryOutOfStockTimeCreateInput,
  StoreProductCategoryOutOfStockTimeEntity,
  StoreProductCategoryOutOfStockTimeUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreProductCategoryOutOfStockTimeCreateFormComponent } from '../out-of-stock-time-create-form/out-of-stock-time-create-form.component';
import { StoreProductCategoryOutOfStockTimeFilterFormComponent } from '../out-of-stock-time-filter-form/out-of-stock-time-filter-form.component';
import { StoreProductCategoryOutOfStockTimeUpdateFormComponent } from '../out-of-stock-time-update-form/out-of-stock-time-update-form.component';

@Component({
  selector: 'app-store-product-category-out-of-stock-time-crud',
  templateUrl: './out-of-stock-time-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductCategoryOutOfStockTimeCrudComponent {
  createForm: Type<DynamicForm<StoreProductCategoryOutOfStockTimeCreateInput>> = StoreProductCategoryOutOfStockTimeCreateFormComponent;
  updateForm: Type<DynamicForm<StoreProductCategoryOutOfStockTimeUpdateInput>> = StoreProductCategoryOutOfStockTimeUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreProductCategoryOutOfStockTimeFilterFormComponent;
  join: string[] = ['productCategory'];
  fields: CrudFields<StoreProductCategoryOutOfStockTimeEntity> = ['productCategoryCode', 'productOutOfStockTime'];

  config: CrudConfig = {
    title: 'Store Product Category Out Of Stock time',
    plural: 'Store Product Category Out Of Stock times',
    single: 'Store Product Category Out Of Stock time',
  };

  columns: CrudColumn<StoreProductCategoryOutOfStockTimeEntity>[] = [
    {
      label: 'Product Category',
      isSortable: true,
      sortBy: 'roductCategory.name_i18n',
      getField(item: StoreProductCategoryOutOfStockTimeEntity): EntityValue {
        return item.productCategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Product out of stock time, hours',
      isSortable: true,
      sortBy: 'productOutOfStockTime',
      getField(item: StoreProductCategoryOutOfStockTimeEntity): EntityValue {
        return item.productOutOfStockTime;
      },
      type: 'text',
    },
  ];

  constructor(
    public readonly service: CrudStoreProductCategoryOutOfStockTimeService,
    public readonly storeDetailsService: StoreDetailsService,
  ) {}
}
