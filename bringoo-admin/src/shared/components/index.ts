import { NgModule } from '@angular/core';

import { AddressCardComponent } from './address-card/address-card.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { ErrorTipComponent } from './error-tip/error-tip-component';
import { BreadcrumbComponent } from './headers/breadcrumb/breadcrumb.component';
import { DefHeaderComponent } from './headers/default/def-header.component';
import { IconComponent } from './icon/icon.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { LangControllerComponent } from './lang-controller/lang-controller.component';
import { LocalDateComponent } from './local-date/local-date.component';
import { NutriscoreControlComponent } from './nutriscore-control/nutriscore-control.component';
import { NutritionalDataControlComponent } from './nutritional-data-control/nutritional-data-control.component';
import { OrdersFilterFormComponent } from './orders-filter-form/orders-filter-form.component';
import { PickerCardComponent } from './picker-card/picker-card.component';
import { PopularSearchComponent } from './popular-search/popular-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ImportFormComponent } from './products-import-form/import-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SearchInsertComponent } from './search-insert/search-insert.component';
import { SearchMatchStringComponent } from './search-match-string/search-match-string.component';
import { CardsComponent } from './settings-card/cards.component';
import { StatusComponent } from './status/status.component';
import { StoreCardComponent } from './store-card/store-card.component';
import { StoreCustomSlotForm } from './store-custom-slot-form/store-custom-slot-form.component';
import { TransactionItemsTableComponent } from './transaction-items-table/transaction-items-table.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { VerificationStatusComponent } from './verification-status/verification-status.component';

export const components: Required<NgModule>['declarations'] = [
  SearchInsertComponent,
  DefHeaderComponent,
  BreadcrumbComponent,
  ProductsFilterComponent,
  ProductsTableComponent,
  LocalDateComponent,
  CustomerCardComponent,
  AddressCardComponent,
  StoreCardComponent,
  PickerCardComponent,
  LangControllerComponent,
  CardsComponent,
  SearchInsertComponent,
  InputSearchComponent,
  StatusComponent,
  ImportFormComponent,
  VerificationStatusComponent,
  ErrorTipComponent,
  IconComponent,
  BreadcrumbsComponent,
  TransactionsTableComponent,
  TransactionItemsTableComponent,
  ProductDetailComponent,
  PopularSearchComponent,
  NutriscoreControlComponent,
  NutritionalDataControlComponent,
  OrdersFilterFormComponent,
  StoreCustomSlotForm,
  SearchMatchStringComponent,
];
