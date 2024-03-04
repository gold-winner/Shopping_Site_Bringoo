import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductManagementComponent } from './components/product-management/product-management.component';
import { DangerousGoodsModule } from './modules/dangerous-goods/dangerous-goods.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductLegalModule } from './modules/product-legal/product-legal.module';
import { ProductSubcategoryModule } from './modules/product-subcategory/product-subcategory.module';
import { ProductUnitSetupModule } from './modules/product-unit-setup/product-unit-setup.module';
import { ProductsRecallReasonModule } from './modules/products-recall-reason/products-recall-reason.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductManagementComponent,
  },
  {
    path: 'product-unit',
    data: {
      breadcrumb: 'Product Unit Setup',
    },
    loadChildren: (): Promise<Type<ProductUnitSetupModule>> =>
      import('./modules/product-unit-setup/product-unit-setup.module').then(
        (m: { ProductUnitSetupModule: Type<ProductUnitSetupModule> }) => m.ProductUnitSetupModule,
      ),
  },
  {
    path: 'product-category',
    data: {
      breadcrumb: 'Product Category Setup',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: (): Promise<Type<ProductCategoryModule>> =>
          import('./modules/product-category/product-category.module').then(
            (m: { ProductCategoryModule: Type<ProductCategoryModule> }) => m.ProductCategoryModule,
          ),
      },
      {
        path: ':id',
        loadChildren: (): Promise<Type<ProductSubcategoryModule>> =>
          import('./modules/product-subcategory/product-subcategory.module').then(
            (m: { ProductSubcategoryModule: Type<ProductSubcategoryModule> }) => m.ProductSubcategoryModule,
          ),
      },
    ],
  },
  {
    path: 'product-legal',
    data: {
      breadcrumb: 'Product Legal',
    },
    loadChildren: (): Promise<Type<ProductLegalModule>> =>
      import('./modules/product-legal/product-legal.module').then(
        (m: { ProductLegalModule: Type<ProductLegalModule> }) => m.ProductLegalModule,
      ),
  },

  {
    path: 'recall-reason',
    data: {
      breadcrumb: 'Recall Reason',
    },
    loadChildren: (): Promise<Type<ProductsRecallReasonModule>> =>
      import('./modules/products-recall-reason/products-recall-reason.module').then(
        (m: { ProductsRecallReasonModule: Type<ProductsRecallReasonModule> }) => m.ProductsRecallReasonModule,
      ),
  },

  {
    path: 'dangerous-goods',
    data: {
      breadcrumb: 'Dangerous Goods',
    },
    loadChildren: (): Promise<Type<DangerousGoodsModule>> =>
      import('./modules/dangerous-goods/dangerous-goods.module').then(
        (m: { DangerousGoodsModule: Type<DangerousGoodsModule> }) => m.DangerousGoodsModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRouterModule {}
