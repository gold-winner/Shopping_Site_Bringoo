import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../shared/shared.module';
import { SettingsOrderDetailsComponent } from './order-details/order-details.component';
import { SettingsOrderProductsComponent } from './order-products/order-products.component';
import { SettingsOrderStatusComponent } from './order-status/order-status.component';

@NgModule({
  declarations: [SettingsOrderDetailsComponent, SettingsOrderProductsComponent, SettingsOrderStatusComponent],
  imports: [SharedModule, CommonModule],
  exports: [SettingsOrderDetailsComponent, SettingsOrderProductsComponent, SettingsOrderStatusComponent],
})
export class SettingsOrderModule {}
