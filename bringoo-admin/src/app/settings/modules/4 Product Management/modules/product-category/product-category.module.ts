import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductCategoryCreateFormComponent } from './components/product-category-create-form/product-category-create-form.component';
import { ProductCategoryCrudComponent } from './components/product-category-crud/product-category-crud.component';
import { ProductCategoryFilterFormComponent } from './components/product-category-filter-form/product-category-filter-form.component';
import { ProductCategoryUpdateFormComponent } from './components/product-category-update-form/product-category-update-form.component';
import { ProductCategoryRouterModule } from './product-category-router.module';

@NgModule({
  declarations: [
    ProductCategoryCrudComponent,
    ProductCategoryCreateFormComponent,
    ProductCategoryUpdateFormComponent,
    ProductCategoryFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, ProductCategoryRouterModule],
})
export class ProductCategoryModule {}
