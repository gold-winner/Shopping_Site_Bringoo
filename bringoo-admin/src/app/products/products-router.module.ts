import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { ProductBrandModule } from './modules/product-brand/product-brand.module';
import { ProductRecallModule } from './modules/product-recall/product-recall.module';
import { ProductRequestModule } from './modules/product-request/product-request.module';
import { ProductsModule } from './modules/products/products.module';

const routes: Routes = [
  {
    path: 'all',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ProductsModule>> =>
      import('./modules/products/products.module').then((m: { ProductsModule: Type<ProductsModule> }) => m.ProductsModule),
  },
  {
    path: 'brands',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ProductBrandModule>> =>
      import('./modules/product-brand/product-brand.module').then(
        (m: { ProductBrandModule: Type<ProductBrandModule> }) => m.ProductBrandModule,
      ),
  },
  {
    path: 'requests',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ProductRequestModule>> =>
      import('./modules/product-request/product-request.module').then(
        (m: { ProductRequestModule: Type<ProductRequestModule> }) => m.ProductRequestModule,
      ),
  },
  {
    path: 'recall',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ProductRecallModule>> =>
      import('./modules/product-recall/product-recall.module').then(
        (m: { ProductRecallModule: Type<ProductRecallModule> }) => m.ProductRecallModule,
      ),
  },
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRouterModule {}
