import { NgModule } from '@angular/core';

import { VoucherBuyGetComponent } from './voucher-buy-get/voucher-buy-get.component';
import { VoucherCreateFormComponent } from './voucher-create-form/voucher-create-form.component';
import { VoucherCrudComponent } from './voucher-crud/voucher-crud.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { VoucherDiscountComponent } from './voucher-discount/voucher-discount.component';
import { VoucherFilterFormComponent } from './voucher-filter-form/voucher-filter-form.component';
import { VoucherFreeShippingComponent } from './voucher-free-shipping/voucher-free-shipping.component';
import { VoucherOrdersComponent } from './voucher-orders/voucher-orders.component';
import { VoucherOrdersFilterFormComponent } from './voucher-orders-filter-form/voucher-orders-filter-form.component';
import { VoucherSummaryComponent } from './voucher-summary/voucher-summary.component';
import { VoucherUpdateFormComponent } from './voucher-update-form/voucher-update-form.component';

export const components: Required<NgModule>['declarations'] = [
  VoucherCreateFormComponent,
  VoucherUpdateFormComponent,
  VoucherFilterFormComponent,
  VoucherBuyGetComponent,
  VoucherSummaryComponent,
  VoucherCrudComponent,
  VoucherDiscountComponent,
  VoucherFreeShippingComponent,
  VoucherDetailComponent,
  VoucherOrdersComponent,
  VoucherOrdersFilterFormComponent,
];
