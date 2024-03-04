import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { StoreSetupLayoutComponent } from '../../components/store-setup-layout/store-setup-layout.component';
import { ProductCategorySortingModule } from './components/product-category-sorting/product-category-sorting.module';
import { ProductDisclaimerModule } from './components/product-disclaimer/product-disclaimer.module';
import { ProductPromotionModule } from './components/product-promotion/product-promotion.module';
import { ProductRecommendationModule } from './components/product-recommendation/product-recommendation.module';
import { StoreAddressModule } from './components/store-address/store-address.module';
import { StoreAssetsComponent } from './components/store-assets/store-assets.component';
import { StoreBasicInformationFormComponent } from './components/store-basic-information-form/store-basic-information-form.component';
import { StoreClosingDaysModule } from './components/store-closing-days/store-closing-days.module';
import { StoreCommissionFeeCategoryModule } from './components/store-commission-fee-category/store-commission-fee-category.module';
import { StoreCommissionFeeProductModule } from './components/store-commission-fee-product/store-commission-fee-product.module';
import { StoreCommissionFeeStoreModule } from './components/store-commission-fee-store/store-commission-fee-store.module';
import { StoreCommissionFeeSubcategoryModule } from './components/store-commission-fee-subcategory/store-commission-fee-subcategory.module';
import { StoreConsultantsModule } from './components/store-consultants/store-consultants.module';
import { StoreContactsModule } from './components/store-contacts/store-contacts.module';
import { StoreDeliverySlotModule } from './components/store-delivery-slot/store-delivery-slot.module';
import { StoreDeliveryZoneModule } from './components/store-delivery-zone/store-delivery-zone.module';
import { StoreInstantDeliveryFeeModule } from './components/store-instant-delivery-fee/store-instant-delivery-fee.module';
import { StoreLoyaltyProgramModule } from './components/store-loyalty-program/store-loyalty-program.module';
import { StoreNotificationBlockModule } from './components/store-notification-block/store-notification-block.module';
import { StoreOpeningHoursModule } from './components/store-opening-hours/store-opening-hours.module';
import { OutOfStockModule } from './components/store-out-of-stock/store-out-of-stock.module';
import { StorePickDurationModule } from './components/store-pick-duration/store-pick-duration.module';
import { StorePickerDriverLimitationsFormComponent } from './components/store-picker-driver-limitations/store-picker-driver-limitations-form.component';
import { StoreProductCategoryAndGroupModule } from './components/store-product-category-and-groups/store-product-category-and-group.module';
import { StoreProductCategoryOutOfStockTimeModule } from './components/store-product-category-out-of-stock-time/out-of-stock-time.module';
import { StoreProductLinkModule } from './components/store-product-link/store-product-link.module';
import { StoreProductLinkCartLimitModule } from './components/store-product-link-cart-limit/store-product-link-cart-limit.module';
import { StoreScheduledDeliveryFeeModule } from './components/store-scheduled-delivery-fee/store-scheduled-delivery-fee.module';
import { StoreSchedulerModule } from './components/store-scheduler/store-scheduler.module';
import { StoreServiceSubModule } from './components/store-service-sub/store-service-sub.module';
import { StoreStaffBoundModule } from './components/store-staff-bound/store-staff-bound.module';
import { StoreShopSettingsFormComponent } from './components/store-webshop-settings/store-shop-settings-form.component';
import { StoreWeightOptionModule } from './components/store-weight-option/store-weight-option.module';

const routes: Routes = [
  {
    path: '',
    component: StoreSetupLayoutComponent,
    children: [
      {
        path: 'basic-information',
        component: StoreBasicInformationFormComponent,
      },
      {
        path: 'shop-settings',
        component: StoreShopSettingsFormComponent,
      },
      {
        path: 'product-category-and-groups',
        loadChildren: (): Promise<Type<StoreProductCategoryAndGroupModule>> =>
          import('./components/store-product-category-and-groups/store-product-category-and-group.module').then(
            (m: { StoreProductCategoryAndGroupModule: Type<StoreProductCategoryAndGroupModule> }) => m.StoreProductCategoryAndGroupModule,
          ),
      },
      {
        path: 'product-category-sorting',
        loadChildren: (): Promise<Type<ProductCategorySortingModule>> =>
          import('./components/product-category-sorting/product-category-sorting.module').then(
            (m: { ProductCategorySortingModule: Type<ProductCategorySortingModule> }) => m.ProductCategorySortingModule,
          ),
      },
      //todo: add when it be needed
      // {
      //   path: '10 legal',
      //   component: StoreLegalComponent,
      // },
      {
        path: 'product-disclaimer',
        loadChildren: (): Promise<Type<ProductDisclaimerModule>> =>
          import('./components/product-disclaimer/product-disclaimer.module').then(
            (m: { ProductDisclaimerModule: Type<ProductDisclaimerModule> }) => m.ProductDisclaimerModule,
          ),
      },
      {
        path: 'product-link',
        loadChildren: (): Promise<Type<StoreProductLinkModule>> =>
          import('./components/store-product-link/store-product-link.module').then(
            (m: { StoreProductLinkModule: Type<StoreProductLinkModule> }) => m.StoreProductLinkModule,
          ),
      },
      {
        path: 'out-of-stock',
        data: { breadcrumb: 'Out Of Stock' },
        loadChildren: (): Promise<Type<OutOfStockModule>> =>
          import('./components/store-out-of-stock/store-out-of-stock.module').then(
            (m: { OutOfStockModule: Type<OutOfStockModule> }) => m.OutOfStockModule,
          ),
      },
      {
        path: 'product-category-out-of-stock-time',
        data: { breadcrumb: 'Product Category Out Of Stock Time' },
        loadChildren: (): Promise<Type<StoreProductCategoryOutOfStockTimeModule>> =>
          import('./components/store-product-category-out-of-stock-time/out-of-stock-time.module').then(
            (m: { StoreProductCategoryOutOfStockTimeModule: Type<StoreProductCategoryOutOfStockTimeModule> }) =>
              m.StoreProductCategoryOutOfStockTimeModule,
          ),
      },
      {
        path: 'store-product-link-cart-limit',
        data: { breadcrumb: 'Product Cart Limit' },
        loadChildren: (): Promise<Type<StoreProductLinkCartLimitModule>> =>
          import('./components/store-product-link-cart-limit/store-product-link-cart-limit.module').then(
            (m: { StoreProductLinkCartLimitModule: Type<StoreProductLinkCartLimitModule> }) => m.StoreProductLinkCartLimitModule,
          ),
      },
      {
        path: 'weight-option',
        loadChildren: (): Promise<Type<StoreWeightOptionModule>> =>
          import('./components/store-weight-option/store-weight-option.module').then(
            (m: { StoreWeightOptionModule: Type<StoreWeightOptionModule> }) => m.StoreWeightOptionModule,
          ),
      },
      {
        path: 'delivery-zone',
        loadChildren: (): Promise<Type<StoreDeliveryZoneModule>> =>
          import('./components/store-delivery-zone/store-delivery-zone.module').then(
            (m: { StoreDeliveryZoneModule: Type<StoreDeliveryZoneModule> }) => m.StoreDeliveryZoneModule,
          ),
      },
      {
        path: 'store-address',
        loadChildren: (): Promise<Type<StoreAddressModule>> =>
          import('./components/store-address/store-address.module').then(
            (m: { StoreAddressModule: Type<StoreAddressModule> }) => m.StoreAddressModule,
          ),
      },
      {
        path: 'store-contact',
        loadChildren: (): Promise<Type<StoreContactsModule>> =>
          import('./components/store-contacts/store-contacts.module').then(
            (m: { StoreContactsModule: Type<StoreContactsModule> }) => m.StoreContactsModule,
          ),
      },
      {
        path: 'store-consultants',
        loadChildren: (): Promise<Type<StoreConsultantsModule>> =>
          import('./components/store-consultants/store-consultants.module').then(
            (m: { StoreConsultantsModule: Type<StoreConsultantsModule> }) => m.StoreConsultantsModule,
          ),
      },
      {
        path: 'instants-delivery-fee',
        loadChildren: (): Promise<Type<StoreInstantDeliveryFeeModule>> =>
          import('./components/store-instant-delivery-fee/store-instant-delivery-fee.module').then(
            (m: { StoreInstantDeliveryFeeModule: Type<StoreInstantDeliveryFeeModule> }) => m.StoreInstantDeliveryFeeModule,
          ),
      },
      {
        path: 'scheduled-delivery-fee',
        loadChildren: (): Promise<Type<StoreScheduledDeliveryFeeModule>> =>
          import('./components/store-scheduled-delivery-fee/store-scheduled-delivery-fee.module').then(
            (m: { StoreScheduledDeliveryFeeModule: Type<StoreScheduledDeliveryFeeModule> }) => m.StoreScheduledDeliveryFeeModule,
          ),
      },
      {
        path: 'store-opening-hours',
        loadChildren: (): Promise<Type<StoreOpeningHoursModule>> =>
          import('./components/store-opening-hours/store-opening-hours.module').then(
            (m: { StoreOpeningHoursModule: Type<StoreOpeningHoursModule> }) => m.StoreOpeningHoursModule,
          ),
      },
      {
        path: 'store-pick-durations',
        loadChildren: (): Promise<Type<StorePickDurationModule>> =>
          import('./components/store-pick-duration/store-pick-duration.module').then(
            (m: { StorePickDurationModule: Type<StorePickDurationModule> }) => m.StorePickDurationModule,
          ),
      },
      {
        path: 'store-delivery-slot',
        loadChildren: (): Promise<Type<StoreDeliverySlotModule>> =>
          import('./components/store-delivery-slot/store-delivery-slot.module').then(
            (m: { StoreDeliverySlotModule: Type<StoreDeliverySlotModule> }) => m.StoreDeliverySlotModule,
          ),
      },
      {
        path: 'store-scheduler',
        loadChildren: (): Promise<Type<StoreSchedulerModule>> =>
          import('./components/store-scheduler/store-scheduler.module').then(
            (m: { StoreSchedulerModule: Type<StoreSchedulerModule> }) => m.StoreSchedulerModule,
          ),
      },
      {
        path: 'store-commission-fee-store',
        loadChildren: (): Promise<Type<StoreCommissionFeeStoreModule>> =>
          import('./components/store-commission-fee-store/store-commission-fee-store.module').then(
            (m: { StoreCommissionFeeStoreModule: Type<StoreCommissionFeeStoreModule> }) => m.StoreCommissionFeeStoreModule,
          ),
      },
      {
        path: 'store-commission-fee-category',
        loadChildren: (): Promise<Type<StoreCommissionFeeCategoryModule>> =>
          import('./components/store-commission-fee-category/store-commission-fee-category.module').then(
            (m: { StoreCommissionFeeCategoryModule: Type<StoreCommissionFeeCategoryModule> }) => m.StoreCommissionFeeCategoryModule,
          ),
      },
      {
        path: 'store-commission-fee-subcategory',
        loadChildren: (): Promise<Type<StoreCommissionFeeSubcategoryModule>> =>
          import('./components/store-commission-fee-subcategory/store-commission-fee-subcategory.module').then(
            (m: { StoreCommissionFeeSubcategoryModule: Type<StoreCommissionFeeSubcategoryModule> }) =>
              m.StoreCommissionFeeSubcategoryModule,
          ),
      },
      {
        path: 'store-commission-fee-product',
        loadChildren: (): Promise<Type<StoreCommissionFeeProductModule>> =>
          import('./components/store-commission-fee-product/store-commission-fee-product.module').then(
            (m: { StoreCommissionFeeProductModule: Type<StoreCommissionFeeProductModule> }) => m.StoreCommissionFeeProductModule,
          ),
      },
      {
        path: 'picker-driver-limitations',
        component: StorePickerDriverLimitationsFormComponent,
      },
      {
        path: 'store-assets',
        component: StoreAssetsComponent,
      },
      {
        path: 'store-closing-days',
        loadChildren: (): Promise<Type<StoreClosingDaysModule>> =>
          import('./components/store-closing-days/store-closing-days.module').then(
            (m: { StoreClosingDaysModule: Type<StoreClosingDaysModule> }) => m.StoreClosingDaysModule,
          ),
      },
      {
        path: 'store-staff-bound',
        loadChildren: (): Promise<Type<StoreStaffBoundModule>> =>
          import('./components/store-staff-bound/store-staff-bound.module').then(
            (m: { StoreStaffBoundModule: Type<StoreStaffBoundModule> }) => m.StoreStaffBoundModule,
          ),
      },
      {
        path: 'store-product-management',
        loadChildren: (): Promise<Type<StoreLoyaltyProgramModule>> =>
          import('./components/store-loyalty-program/store-loyalty-program.module').then(
            (m: { StoreLoyaltyProgramModule: Type<StoreLoyaltyProgramModule> }) => m.StoreLoyaltyProgramModule,
          ),
      },
      {
        path: 'store-product-recommendations',
        data: { breadcrumb: 'Product Recommendations' },
        loadChildren: (): Promise<Type<ProductRecommendationModule>> =>
          import('./components/product-recommendation/product-recommendation.module').then(
            (m: { ProductRecommendationModule: Type<ProductRecommendationModule> }) => m.ProductRecommendationModule,
          ),
      },
      {
        path: 'store-product-promotion',
        data: { breadcrumb: 'Product Promotion' },
        loadChildren: (): Promise<Type<ProductPromotionModule>> =>
          import('./components/product-promotion/product-promotion.module').then(
            (m: { ProductPromotionModule: Type<ProductPromotionModule> }) => m.ProductPromotionModule,
          ),
      },
      {
        path: 'store-notification-blocks',
        data: { breadcrumb: 'Notifications Blocks' },
        loadChildren: (): Promise<Type<StoreNotificationBlockModule>> =>
          import('./components/store-notification-block/store-notification-block.module').then(
            (m: { StoreNotificationBlockModule: Type<StoreNotificationBlockModule> }) => m.StoreNotificationBlockModule,
          ),
      },
      {
        path: 'store-service-subs',
        data: { breadcrumb: 'Store Services' },
        loadChildren: (): Promise<Type<StoreServiceSubModule>> =>
          import('./components/store-service-sub/store-service-sub.module').then(
            (m: { StoreServiceSubModule: Type<StoreServiceSubModule> }) => m.StoreServiceSubModule,
          ),
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreSetupInformationRouterModule {}
