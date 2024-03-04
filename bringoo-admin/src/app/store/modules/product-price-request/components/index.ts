import { NgModule } from '@angular/core';

import { ProductPriceApproveComponent } from './product-price-approve/product-price-approve.component';
import { ProductPriceRequestCrudComponent } from './product-price-request-crud/product-price-request-crud.component';
import { ProductPriceRequestFilterComponent } from './product-price-request-filter/product-price-request-filter.component';

export const components: Required<NgModule>['declarations'] = [
  ProductPriceRequestFilterComponent,
  ProductPriceRequestCrudComponent,
  ProductPriceApproveComponent,
];
