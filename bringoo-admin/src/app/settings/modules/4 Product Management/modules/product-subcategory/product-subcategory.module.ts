import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductSubcategoryCreateFormComponent } from './components/product-subcategory-create-form/product-subcategory-create-form.component';
import { ProductSubcategoryCrudComponent } from './components/product-subcategory-crud/product-subcategory-crud.component';
import { ProductSubcategoryFilterFormComponent } from './components/product-subcategory-filter-form/product-subcategory-filter-form.component';
import { ProductSubcategoryUpdateFormComponent } from './components/product-subcategory-update-form/product-subcategory-update-form.component';
import { ProductSubcategoryRouterModule } from './product-subcategory-router.module';

@NgModule({
  declarations: [
    ProductSubcategoryCrudComponent,
    ProductSubcategoryCreateFormComponent,
    ProductSubcategoryUpdateFormComponent,
    ProductSubcategoryFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, ProductSubcategoryRouterModule],
})
export class ProductSubcategoryModule {}
