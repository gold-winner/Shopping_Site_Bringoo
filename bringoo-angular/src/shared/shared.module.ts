import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SidebarModule } from 'ng-sidebar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import {
  AccordionComponent,
  ActionHeaderComponent,
  AddressComponent,
  ButtonComponent,
  ButtonGroupComponent,
  CardAddressComponent,
  CardComponent,
  CardNormalComponent,
  CardPaymentComponent,
  CardPopularComponent,
  CardProductComponent,
  CardRecentlyComponent,
  CardShopComponent,
  CardSmallComponent,
  CardStepComponent,
  CartSidebarComponent,
  CategorySidebarComponent,
  CheckboxComponent,
  DeliveryAddressComponent,
  DropdownButtonComponent,
  DropdownComponent,
  DropdownStoreComponent,
  FaqsComponent,
  FooterComponent,
  HeaderComponent,
  IconComponent,
  InputComponent,
  LayoutComponent,
  LinkComponent,
  ModalComponent,
  NavbarHeaderComponent,
  OptionComponent,
  OrderComponent,
  PaginationComponent,
  PopularViewComponent,
  ProductCartComponent,
  ProductCartDetailsComponent,
  ProductCartReplaceComponent,
  QuantityInputComponent,
  RecentlyViewComponent,
  ShopDetailComponent,
  SignModalComponent,
  StoresListComponent,
  SubCategorySidebarComponent,
  SwitchComponent,
  TableComponent,
  TopbarHeaderComponent,
  TotalComponent,
} from './components';
@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    QuantityInputComponent,
    DropdownComponent,
    LinkComponent,
    CardNormalComponent,
    CardSmallComponent,
    CardShopComponent,
    CardComponent,
    FaqsComponent,
    CardStepComponent,
    CardProductComponent,
    ProductCartComponent,
    AddressComponent,
    CardAddressComponent,
    CardPaymentComponent,
    CardRecentlyComponent,
    CardPopularComponent,
    RecentlyViewComponent,
    PopularViewComponent,
    TableComponent,
    AccordionComponent,
    OrderComponent,
    DropdownButtonComponent,
    DropdownStoreComponent,
    HeaderComponent,
    TopbarHeaderComponent,
    NavbarHeaderComponent,
    ActionHeaderComponent,
    FooterComponent,
    ShopDetailComponent,
    TotalComponent,
    LayoutComponent,
    CartSidebarComponent,
    CategorySidebarComponent,
    SubCategorySidebarComponent,
    CheckboxComponent,
    ModalComponent,
    SignModalComponent,
    OptionComponent,
    SwitchComponent,
    ButtonGroupComponent,
    DeliveryAddressComponent,
    StoresListComponent,
    ProductCartDetailsComponent,
    ProductCartReplaceComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IvyCarouselModule,
    SidebarModule.forRoot(),
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
  exports: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    QuantityInputComponent,
    DropdownComponent,
    LinkComponent,
    CardComponent,
    FaqsComponent,
    CardStepComponent,
    CardProductComponent,
    CardNormalComponent,
    CardSmallComponent,
    CardShopComponent,
    ProductCartComponent,
    AddressComponent,
    CardAddressComponent,
    CardPaymentComponent,
    CardRecentlyComponent,
    CardPopularComponent,
    RecentlyViewComponent,
    PopularViewComponent,
    TableComponent,
    AccordionComponent,
    OrderComponent,
    DropdownButtonComponent,
    DropdownStoreComponent,
    HeaderComponent,
    TopbarHeaderComponent,
    NavbarHeaderComponent,
    ActionHeaderComponent,
    FooterComponent,
    ShopDetailComponent,
    TotalComponent,
    LayoutComponent,
    CartSidebarComponent,
    CategorySidebarComponent,
    SubCategorySidebarComponent,
    CheckboxComponent,
    ModalComponent,
    SignModalComponent,
    OptionComponent,
    SwitchComponent,
    ButtonGroupComponent,
    ProductCartDetailsComponent,
    ProductCartReplaceComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
