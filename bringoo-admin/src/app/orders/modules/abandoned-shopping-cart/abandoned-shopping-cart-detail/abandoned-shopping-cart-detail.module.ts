import { NgModule } from '@angular/core';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../../shared/shared.module';
import { OrdersTableModule } from '../../orders-table/orders-table.module';
import { ShoppingCartVoucherComponent } from '../shopping-cart-voucher/shopping-cart-voucher.component';
import { AbandonedShoppingCartDetailRouterModule } from './abandoned-shopping-cart-detail-router.module';
import { AbandonShoppingCartAddProductFormComponent } from './components/abandoned-shopping-cart-add-new-product-form/abandoned-shopping-cart-add-product-form.component';
import { AbandonShoppingCartCheckoutFormComponent } from './components/abandoned-shopping-cart-checkout-form/abandoned-shopping-cart-checkout-form.component';
import { AbandonedShoppingCartDetailComponent } from './components/abandoned-shopping-cart-detail/abandoned-shopping-cart-detail.component';
import { AvailableSlotsNumberPipe } from './pipe/available-slots-number.pipe';
import { GetSlotForDatePipe } from './pipe/get-slot-for-date.pipe';

@NgModule({
  declarations: [
    AbandonedShoppingCartDetailComponent,
    AbandonShoppingCartCheckoutFormComponent,
    AbandonShoppingCartAddProductFormComponent,
    GetSlotForDatePipe,
    AvailableSlotsNumberPipe,
    ShoppingCartVoucherComponent,
  ],
  imports: [SharedModule, DynamicIoModule, AbandonedShoppingCartDetailRouterModule, OrdersTableModule],
})
export class AbandonedShoppingCartDetailModule {}
