import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductRecommendationService } from '../../../../../../../../shared/api/auth/crud-product-recommendation.service';
import { ProductRecommendationEntity, StoreProductRecommendationCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductRecommendationCreateFormComponent } from '../product-recommendation-create-form/product-recommendation-create-form.component';
import { ProductRecommendationDetailsComponent } from '../product-recommendation-details/product-recommendation-details.component';
import { ProductRecommendationFormComponent } from '../product-recommendation-filter-form/product-recommendation-filter-form.component';

@Component({
  selector: 'app-product-recommendation-crud',
  templateUrl: './product-recommendation-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecommendationCrudComponent {
  createForm: Type<DynamicForm<StoreProductRecommendationCreateInput>> = ProductRecommendationCreateFormComponent;
  detailForm: Type<DynamicForm<ProductRecommendationEntity>> = ProductRecommendationDetailsComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductRecommendationFormComponent;

  fields: CrudFields<ProductRecommendationEntity> = ['isActive', 'name_i18n', 'dateStart', 'dateEnd', 'create_date'];
  join: string[] = ['store', 'items'];

  config: CrudConfig = {
    title: 'Product Recommendations',
    plural: 'Product Recommendations',
    single: 'Product Recommendation',
    isDetailButtonVisible: true,
    isEditButtonVisible: false,
    useTableHeightCalculation: false,
    formWidth: 900,
    formBundleWidth: '90%',
  };

  columns: CrudColumn<ProductRecommendationEntity>[] = [
    {
      label: 'Is Active',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductRecommendationEntity): EntityValue {
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
      getField(item: ProductRecommendationEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Products',
      isSortable: false,
      getField(item: ProductRecommendationEntity): EntityValue {
        return item.items?.length;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Start Date',
      isSortable: false,
      sortBy: 'dateStart',
      getField(item: ProductRecommendationEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: false,
      sortBy: 'dateEnd',
      getField(item: ProductRecommendationEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudProductRecommendationService) {}
}
