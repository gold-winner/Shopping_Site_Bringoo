import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductPromotionCreateFormComponent } from './components/product-promotion-create-form/product-promotion-create-form.component';
import { ProductPromotionCrudComponent } from './components/product-promotion-crud/product-promotion-crud.component';
import { ProductPromotionDetailsComponent } from './components/product-promotion-details/product-promotion-details.component';
import { ProductPromotionFormComponent } from './components/product-promotion-filter-form/product-promotion-filter-form.component';
import { ProductPromotionItemCreateComponent } from './components/product-promotion-item-create-form/product-promotion-item-create-form.component';
import { SelectProductLinkFilterFormComponent } from './components/select-product-link-filter-form/select-product-link-filter-form.component';
import { ProductPromotionRouter } from './product-promotion.router';

@NgModule({
  declarations: [
    ProductPromotionCrudComponent,
    ProductPromotionDetailsComponent,
    SelectProductLinkFilterFormComponent,
    ProductPromotionCreateFormComponent,
    ProductPromotionFormComponent,
    ProductPromotionItemCreateComponent,
  ],
  imports: [ProductPromotionRouter, SharedModule, CrudModule],
})
export class ProductPromotionModule {}
