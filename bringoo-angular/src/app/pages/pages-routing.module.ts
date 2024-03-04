import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LandingComponent } from './landing/landing.component';
import { LandingModule } from './landing/landing.module';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StoreSelectorComponent } from './store-selector/store-selector.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: AuthComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'store-selector', component: StoreSelectorComponent },
  { path: 'checkout', component: CheckoutComponent },
  // eslint-disable-next-line @typescript-eslint/typedef
  { path: 'landing', loadChildren: (): Promise<LandingModule> => import('./landing/landing.module').then((m) => m.LandingModule) },
  // eslint-disable-next-line @typescript-eslint/typedef
  {
    path: ':store/products',
    loadChildren: (): Promise<ProductsModule> => import('./products/products.module').then((m: any) => m.ProductsModule),
  },
  // eslint-disable-next-line @typescript-eslint/typedef
  { path: 'settings', loadChildren: (): Promise<SettingsModule> => import('./settings/settings.module').then((m) => m.SettingsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
