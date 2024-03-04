import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorManagementComponent } from './components/vendor-management/vendor-management.component';
import { StoreRegionModule } from './modules/store-region/store-region.module';
import { VendorCategorySetupModule } from './modules/vendor-category-setup/vendor-category-setup.module';
import { VendorTypeSetupModule } from './modules/vendor-type-setup/vendor-type-setup.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VendorManagementComponent,
  },
  {
    path: 'vendor-type',
    data: {
      breadcrumb: 'Vendor Type Setup',
    },
    loadChildren: (): Promise<Type<VendorTypeSetupModule>> =>
      import('./modules/vendor-type-setup/vendor-type-setup.module').then(
        (m: { VendorTypeSetupModule: Type<VendorTypeSetupModule> }) => m.VendorTypeSetupModule,
      ),
  },
  {
    path: 'store-region',
    data: {
      breadcrumb: 'Store Region Setup',
    },
    loadChildren: (): Promise<Type<StoreRegionModule>> =>
      import('./modules/store-region/store-region.module').then((m: { StoreRegionModule: Type<StoreRegionModule> }) => m.StoreRegionModule),
  },
  {
    path: 'vendor-category',
    data: {
      breadcrumb: 'Product Unit Setup',
    },
    loadChildren: (): Promise<Type<VendorCategorySetupModule>> =>
      import('./modules/vendor-category-setup/vendor-category-setup.module').then(
        (m: { VendorCategorySetupModule: Type<VendorCategorySetupModule> }) => m.VendorCategorySetupModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorManagementRouterModule {}
