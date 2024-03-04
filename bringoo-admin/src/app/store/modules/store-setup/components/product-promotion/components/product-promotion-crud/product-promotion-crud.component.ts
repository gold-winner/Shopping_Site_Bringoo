import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductPromotionService } from '../../../../../../../../shared/api/auth/crud-product-promotion.service';
import { ProductPromotionEntity, StoreProductPromotionCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductPromotionCreateFormComponent } from '../product-promotion-create-form/product-promotion-create-form.component';
import { ProductPromotionDetailsComponent } from '../product-promotion-details/product-promotion-details.component';
import { ProductPromotionFormComponent } from '../product-promotion-filter-form/product-promotion-filter-form.component';

@Component({
  selector: 'app-product-promotion-crud',
  templateUrl: './product-promotion-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPromotionCrudComponent {
  createForm: Type<DynamicForm<StoreProductPromotionCreateInput>> = ProductPromotionCreateFormComponent;
  detailForm: Type<DynamicForm<ProductPromotionEntity>> = ProductPromotionDetailsComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductPromotionFormComponent;

  fields: CrudFields<ProductPromotionEntity> = ['isActive', 'name_i18n', 'dateStart', 'dateEnd', 'create_date'];
  join: string[] = ['store', 'items'];

  config: CrudConfig = {
    title: 'Product Promotions',
    plural: 'Product Promotions',
    single: 'Product Promotion',
    isDetailButtonVisible: true,
    isEditButtonVisible: false,
    useTableHeightCalculation: false,
    formWidth: 900,
    formBundleWidth: '90%',
  };

  columns: CrudColumn<ProductPromotionEntity>[] = [
    {
      label: 'Is Active',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductPromotionEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Name',
      isSortable: false,
      getField(item: ProductPromotionEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Products',
      isSortable: false,
      getField(item: ProductPromotionEntity): EntityValue {
        return item.items?.length;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Start Date',
      isSortable: false,
      sortBy: 'dateStart',
      getField(item: ProductPromotionEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: false,
      sortBy: 'dateEnd',
      getField(item: ProductPromotionEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudProductPromotionService) {}
}
