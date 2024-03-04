import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductLinkCartLimitService } from '../../../../../../../../shared/api/auth/crud-product-link-cart-limit.service';
import {
  ProductLinkCartLimitCreateInput,
  ProductLinkCartLimitEntity,
  ProductLinkCartLimitUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreDetailsService } from '../../../../../../services/store-details.service';
import { StoreProductLinkCartLimitCreateFormComponent } from '../store-product-link-cart-limit-create-form/store-product-link-cart-limit-create-form.component';
import { StoreProductLinkCartLimitFilterFormComponent } from '../store-product-link-cart-limit-filter-form/store-product-link-cart-limit-filter-form.component';
import { StoreProductLinkCartLimitUpdateFormComponent } from '../store-product-link-cart-limit-update-form/store-product-link-cart-limit-update-form.component';

@Component({
  selector: 'app-store-product-link-cart-limit-crud',
  templateUrl: './store-product-link-cart-limit-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCartLimitCrudComponent {
  createForm: Type<DynamicForm<ProductLinkCartLimitCreateInput>> = StoreProductLinkCartLimitCreateFormComponent;
  updateForm: Type<DynamicForm<ProductLinkCartLimitUpdateInput>> = StoreProductLinkCartLimitUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreProductLinkCartLimitFilterFormComponent;

  fields: CrudFields<ProductLinkCartLimitEntity> = ['startDateTime', 'endDateTime', 'cartMaxAmount', 'productLinkId'];
  join: string[] = [
    'productLink',
    'productLink.product',
    'productLink.product.productBrand',
    'productLink.product.category',
    'productLink.product.subcategory',
  ];

  config: CrudConfig = {
    title: 'Store Product Cart Limit',
    plural: 'Store Product Cart Limits',
    single: 'Store Product Cart Limit',
  };

  columns: CrudColumn<ProductLinkCartLimitEntity>[] = [
    {
      label: 'Product',
      isSortable: false,
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.productLink?.product?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Brand',
      isSortable: true,
      sortBy: 'productLink.product.productBrandCode',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.productLink?.product?.productBrand?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Category',
      isSortable: true,
      sortBy: 'productLink.product.productCategoryCode',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.productLink?.product?.category?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Subcategory',
      isSortable: true,
      sortBy: 'productLink.product.productSubcategoryCode',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.productLink?.product?.subcategory?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Cart Max items amount',
      isSortable: true,
      sortBy: 'cartMaxAmount',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.cartMaxAmount;
      },
      type: 'text',
    },
    {
      label: 'Start Date',
      isSortable: true,
      sortBy: 'startDateTime',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.startDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'End Date',
      isSortable: true,
      sortBy: 'endDateTime',
      getField(item: ProductLinkCartLimitEntity): EntityValue {
        return item.endDateTime;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudProductLinkCartLimitService, public readonly storeDetailsService: StoreDetailsService) {}
}
