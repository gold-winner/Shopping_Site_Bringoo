import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductRecommendationCreateFormComponent } from './components/product-recommendation-create-form/product-recommendation-create-form.component';
import { ProductRecommendationCrudComponent } from './components/product-recommendation-crud/product-recommendation-crud.component';
import { ProductRecommendationDetailsComponent } from './components/product-recommendation-details/product-recommendation-details.component';
import { ProductRecommendationFormComponent } from './components/product-recommendation-filter-form/product-recommendation-filter-form.component';
import { ProductRecommendationItemCreateComponent } from './components/product-recommendation-item-create-form/product-recommendation-item-create-form.component';
import { SelectProductLinkFilterFormComponent } from './components/select-product-link-filter-form/select-product-link-filter-form.component';
import { ProductRecommendationRouter } from './product-recommendation.router';

@NgModule({
  declarations: [
    ProductRecommendationCrudComponent,
    ProductRecommendationDetailsComponent,
    SelectProductLinkFilterFormComponent,
    ProductRecommendationCreateFormComponent,
    ProductRecommendationItemCreateComponent,
    ProductRecommendationFormComponent,
  ],
  imports: [ProductRecommendationRouter, SharedModule, CrudModule],
})
export class ProductRecommendationModule {}
