import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { ProductLinkModule } from './modules/product-link/product-link.module';
import { ProductPriceRequestModule } from './modules/product-price-request/product-price-request.module';
import { ProductPricingModule } from './modules/product-pricing/product-pricing.module';
import { StoreBrandModule } from './modules/store-brand/store-brand.module';
import { StoreCorporationsModule } from './modules/store-corporations/store-corporations.module';
import { StoreSetupInformationModule } from './modules/store-setup/store-setup-information.module';
import { StoresModule } from './modules/stores/stores.module';

const routes: Routes = [
  {
    path: 'brand',
    data: { breadcrumb: 'Brands' },
    loadChildren: (): Promise<Type<StoreBrandModule>> =>
      import('./modules/store-brand/store-brand.module').then((m: { StoreBrandModule: Type<StoreBrandModule> }) => m.StoreBrandModule),
  },
  {
    path: 'corporations',
    data: { breadcrumb: 'Corporations' },
    loadChildren: (): Promise<Type<StoreCorporationsModule>> =>
      import('./modules/store-corporations/store-corporations.module').then(
        (m: { StoreCorporationsModule: Type<StoreCorporationsModule> }) => m.StoreCorporationsModule,
      ),
  },
  {
    path: 'stores',
    pathMatch: 'full',
    data: { breadcrumb: 'Stores' },
    loadChildren: (): Promise<Type<StoresModule>> =>
      import('./modules/stores/stores.module').then((m: { StoresModule: Type<StoresModule> }) => m.StoresModule),
  },
  {
    path: 'product-link',
    data: { breadcrumb: 'Product Link' },
    loadChildren: (): Promise<Type<ProductLinkModule>> =>
      import('./modules/product-link/product-link.module').then((m: { ProductLinkModule: Type<ProductLinkModule> }) => m.ProductLinkModule),
  },
  {
    path: 'product-pricing',
    data: { breadcrumb: 'Product pricing' },
    loadChildren: (): Promise<Type<ProductPricingModule>> =>
      import('./modules/product-pricing/product-pricing.module').then(
        (m: { ProductPricingModule: Type<ProductPricingModule> }) => m.ProductPricingModule,
      ),
  },
  {
    path: 'product-price-request',
    data: { breadcrumb: 'Product pricing' },
    loadChildren: (): Promise<Type<ProductPriceRequestModule>> =>
      import('./modules/product-price-request/product-price-request.module').then(
        (m: { ProductPriceRequestModule: Type<ProductPriceRequestModule> }) => m.ProductPriceRequestModule,
      ),
  },
  {
    path: 'stores/:id',
    loadChildren: (): Promise<Type<StoreSetupInformationModule>> =>
      import('./modules/store-setup/store-setup-information.module').then(
        (m: { StoreSetupInformationModule: Type<StoreSetupInformationModule> }) => m.StoreSetupInformationModule,
      ),
  },
  { path: '', redirectTo: 'stores', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
