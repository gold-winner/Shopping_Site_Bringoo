import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutOrderComponent } from './components/order/order.component';
@NgModule({
  declarations: [CheckoutComponent, CheckoutOrderComponent],
  imports: [SharedModule, RouterModule, CommonModule, GoogleMapsModule, HttpClientJsonpModule, HttpClientModule],
  exports: [CheckoutComponent, CheckoutOrderComponent, RouterModule],
})
export class CheckoutModule {}
