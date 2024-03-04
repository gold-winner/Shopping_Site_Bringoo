import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';
import { LandingModule } from './landing/landing.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StoreSelectorComponent } from './store-selector/store-selector.component';
@NgModule({
  imports: [CommonModule, PagesRoutingModule, SharedModule, CheckoutModule, AuthModule, LandingModule, NgxSkeletonLoaderModule.forRoot()],
  declarations: [ShoppingCartComponent, StoreSelectorComponent],
})
export class PagesModule {}
