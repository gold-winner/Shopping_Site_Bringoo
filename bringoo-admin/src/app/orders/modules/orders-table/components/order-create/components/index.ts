import { NgModule } from '@angular/core';

import { ReceiptUpdateGroupsPipe } from '../../../pipes/receipt-update-groups.pipe';
import { OrderAccountingComponent } from '../../order-accounting/order-accounting.component';
import { OrderCommissionFeeComponent } from '../../order-commission-fee/order-commission-fee.component';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';
import { OrderTemperatureCheckCreateFormComponent } from '../../order-temperature-check-create/order-temperature-check-create-form.component';
import { OrderTemperatureCheckCrudComponent } from '../../order-temperature-check-crud/order-temperature-check-crud.component';
import { OrderTemperatureCheckFilterFormComponent } from '../../order-temperature-check-filter-form/order-temperature-check-filter-form.component';
import { OrderVoucherComponent } from '../../order-voucher/order-voucher.component';
import { OrdersCrudComponent } from '../../orders-crud/orders-crud.component';
import { CancelOptionComponent } from './cancel-option/cancel-option.component';
import { InitialNotificationsComponent } from './initial-notifications/initial-notifications.component';
import { InitialNotificationsFilterFormComponent } from './initial-notifications/initial-notifications-filter-form/initial-notifications-filter-form.component';
import { LoadReceiptComponent } from './load-receipt/load-receipt.component';
import { CommentComponent } from './manager-messages/comment/comment.component';
import { CreateOrderManagerComment } from './manager-messages/create-order-manager-comment/create-order-manager-comment.component';
import { ManagerMessagesComponent } from './manager-messages/manager-messages.component';
import { MessageUpdateComponent } from './message-update/message-update.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentsDoughnutComponent } from './payments-doughnut/payments-doughnut.component';
import { ReceiptNumberUpdateComponent } from './receipt-number-update/receipt-number-update.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { SelectCustomerFilterFormComponent } from './select-customer/select-customer-filter-form/select-customer-filter-form.component';
import { SelectCustomerAddressComponent } from './select-customer-address/select-customer-address.component';
import { SelectCustomerAddressCreateFormComponent } from './select-customer-address/select-customer-address-create-form/select-customer-address-create-form.component';
import { SelectCustomerAddressFilterFormComponent } from './select-customer-address/select-customer-address-filter-form/select-customer-address-filter-form.component';
import { SelectCustomerAddressUpdateFormComponent } from './select-customer-address/select-customer-address-update-form/select-customer-address-update-form.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { SelectDriverFilterFormComponent } from './select-driver/select-driver-filter-form/select-driver-filter-form.component';
import { SelectPickerComponent } from './select-picker/select-picker.component';
import { SelectPickerFilterFormComponent } from './select-picker/select-picker-filter-form/select-picker-filter-form.component';
import { SelectProductsFormComponent } from './select-products/components/select-products-form/select-products-form.component';
import { SelectProductsComponent } from './select-products/select-products.component';
import { SelectReceiptComponent } from './select-receipt/select-receipt.component';
import { SelectStoreComponent } from './select-store/select-store.component';
import { SelectStoreAddressComponent } from './select-store-address/select-store-address.component';
import { SelectStoreAddressFilterFormComponent } from './select-store-address/select-store-address-filter-form/select-store-address-filter-form.component';
import { StaffWhoIgnoredOrder } from './staff-who-ignored-order/staff-who-ignored-order';
import { TagsUpdateComponent } from './tags-update/tags-update.component';
import { TotalShopAmountUpdateComponent } from './total-shop-amount-update/total-shop-amount-update.component';

export const components: Required<NgModule>['declarations'] = [
  OrdersCrudComponent,
  SelectCustomerComponent,
  SelectCustomerFilterFormComponent,
  SelectCustomerAddressComponent,
  SelectStoreComponent,
  SelectStoreAddressComponent,
  SelectPickerComponent,
  SelectPickerFilterFormComponent,
  SelectDriverComponent,
  SelectDriverFilterFormComponent,
  SelectReceiptComponent,
  SelectCustomerAddressFilterFormComponent,
  SelectStoreAddressFilterFormComponent,
  SelectProductsComponent,
  SelectProductsFormComponent,
  SelectCustomerAddressCreateFormComponent,
  SelectCustomerAddressUpdateFormComponent,
  OrderDetailComponent,
  MessageUpdateComponent,
  OrderHistoryComponent,
  CancelOptionComponent,
  InitialNotificationsComponent,
  InitialNotificationsFilterFormComponent,
  StaffWhoIgnoredOrder,
  TagsUpdateComponent,
  OrderCommissionFeeComponent,
  LoadReceiptComponent,
  ReceiptUpdateGroupsPipe,
  ManagerMessagesComponent,
  OrderAccountingComponent,
  CommentComponent,
  CreateOrderManagerComment,
  PaymentsDoughnutComponent,
  OrderVoucherComponent,
  TotalShopAmountUpdateComponent,
  OrderTemperatureCheckCrudComponent,
  OrderTemperatureCheckCreateFormComponent,
  OrderTemperatureCheckFilterFormComponent,
  ReceiptNumberUpdateComponent,
];
