import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductSubcategoryModule } from '../product-subcategory/product-subcategory.module';
import { ProductCategoryCrudComponent } from './components/product-category-crud/product-category-crud.component';

const routes: Routes = [
  { path: '', component: ProductCategoryCrudComponent, pathMatch: 'full' },
  {
    path: '**',
    loadChildren: (): Promise<Type<ProductSubcategoryModule>> =>
      import('../product-subcategory/product-subcategory.module').then(
        (m: { ProductSubcategoryModule: Type<ProductSubcategoryModule> }) => m.ProductSubcategoryModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryRouterModule {}
