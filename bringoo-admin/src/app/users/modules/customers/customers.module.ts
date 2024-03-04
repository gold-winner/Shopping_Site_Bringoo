import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { ChartModule } from '../../../../shared/modules/charts/chart.module';
import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { PushNotificationModule } from '../../../push-notification/push-notification.module';
import { SmsHistoryModule } from '../../../sms-history/sms-history.module';
import { CustomerCreateFormComponent } from './components/customer-create-form/customer-create-form.component';
import { CustomerCrudComponent } from './components/customer-crud/customer-crud.component';
import { CustomerAddressCreateFormComponent } from './components/customer-detail/customer-address/customer-address-create-form/customer-address-create-form.component';
import { CustomerAddressFilterFormComponent } from './components/customer-detail/customer-address/customer-address-filter-form/customer-address-filter-form.component';
import { CustomerAddressCrudComponent } from './components/customer-detail/customer-address/customer-address-options-crud/customer-address-crud.component';
import { CustomerAddressUpdateFormComponent } from './components/customer-detail/customer-address/customer-address-update-form/customer-address-update-form.component';
import { CustomerBanCreateFormComponent } from './components/customer-detail/customer-ban/customer-ban-create-form/customer-ban-create-form.component';
import { CustomerBanCrudComponent } from './components/customer-detail/customer-ban/customer-ban-crud/customer-ban-crud.component';
import { CustomerBanFilterFormComponent } from './components/customer-detail/customer-ban/customer-ban-filter-form/customer-ban-filter-form.component';
import { CustomerBonusCreateFormComponent } from './components/customer-detail/customer-bonus/customer-bonus-create-form/customer-bonus-create-form.component';
import { CustomerBonusCrudComponent } from './components/customer-detail/customer-bonus/customer-bonus-crud/customer-bonus-crud.component';
import { CustomerBonusFilterFormComponent } from './components/customer-detail/customer-bonus/customer-bonus-filter-form/customer-bonus-filter-form.component';
import { CustomerBonusUpdateFormComponent } from './components/customer-detail/customer-bonus/customer-bonus-update-form/customer-bonus-update-form.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerHeatMapComponent } from './components/customer-detail/customer-heat-map/customer-heat-map.component';
import { CustomerInfoComponent } from './components/customer-detail/customer-info/customer-info.component';
import { CustomerLoyaltyProgramCreateFormComponent } from './components/customer-detail/customer-loyalty-program/customer-loyalty-program-create-form/customer-loyalty-program-create-form.component';
import { CustomerLoyaltyProgramCrudComponent } from './components/customer-detail/customer-loyalty-program/customer-loyalty-program-crud/customer-loyalty-program-crud.component';
import { CustomerLoyaltyProgramFilterFormComponent } from './components/customer-detail/customer-loyalty-program/customer-loyalty-program-filter-form/customer-loyalty-program-filter-form.component';
import { CustomerLoyaltyProgramUpdateFormComponent } from './components/customer-detail/customer-loyalty-program/customer-loyalty-program-update-form/customer-loyalty-program-update-form.component';
import { CustomerNoteComponent } from './components/customer-detail/customer-note/customer-note.component';
import { CustomerOrderHistoryComponent } from './components/customer-detail/customer-order-history/customer-order-history.component';
import { CustomerOrderHistoryFilterComponent } from './components/customer-detail/customer-order-history/customer-order-history-filter/customer-order-history-filter.component';
import { CustomerOverviewComponent } from './components/customer-detail/customer-overview/customer-overview.component';
import { CustomerRatingAppHistoryComponent } from './components/customer-detail/customer-rating-app-history/customer-rating-app-history.component';
import { CustomerRatingAppHistoryFilterComponent } from './components/customer-detail/customer-rating-app-history/customer-rating-app-history-filter/customer-rating-app-history-filter.component';
import { CustomerSessionHistoryComponent } from './components/customer-detail/customer-session-history/customer-session-history.component';
import { CustomerSessionHistoryFilterComponent } from './components/customer-detail/customer-session-history/customer-session-history-filter/customer-session-history-filter.component';
import { CustomerShoppingListComponent } from './components/customer-detail/customer-shopping-list/customer-shopping-list.component';
import { CustomerShoppingDetailsFormComponent } from './components/customer-detail/customer-shopping-list/customer-shopping-list-details-form/customer-shopping-list-details-form.component';
import { CustomerShoppingListFilterComponent } from './components/customer-detail/customer-shopping-list/customer-shopping-list-filter/customer-shopping-list-filter.component';
import { CustomerShoppingListProductsComponent } from './components/customer-detail/customer-shopping-list/customer-shopping-list-products/customer-shopping-list-products.component';
import { CustomerShoppingListProductsFilterComponent } from './components/customer-detail/customer-shopping-list/customer-shopping-list-products-filter/customer-shopping-list-products-filter.component';
import { RevenueShopBreakdownComponent } from './components/customer-detail/revenue-shop-breakdown/revenue-shop-breakdown.component';
import { ShoppingCategoryBreakdownComponent } from './components/customer-detail/shopping-category-breakdown/shopping-category-breakdown.component';
import { CustomerFilterFormComponent } from './components/customer-filter-form/customer-filter-form.component';
import { CustomerUpdateFormComponent } from './components/customer-update-form/customer-update-form.component';
import { CustomersRouterModule } from './customers-router.module';

@NgModule({
  declarations: [
    CustomerCrudComponent,
    CustomerCreateFormComponent,
    CustomerFilterFormComponent,
    CustomerUpdateFormComponent,
    CustomerDetailComponent,
    CustomerAddressCrudComponent,
    CustomerAddressFilterFormComponent,
    CustomerAddressUpdateFormComponent,
    CustomerAddressCreateFormComponent,
    CustomerOverviewComponent,
    CustomerInfoComponent,
    CustomerNoteComponent,
    CustomerOrderHistoryComponent,
    CustomerOrderHistoryFilterComponent,
    CustomerRatingAppHistoryComponent,
    CustomerRatingAppHistoryFilterComponent,
    CustomerBanCreateFormComponent,
    CustomerBanFilterFormComponent,
    CustomerBanCrudComponent,
    CustomerBonusCreateFormComponent,
    CustomerBonusUpdateFormComponent,
    CustomerBonusFilterFormComponent,
    CustomerBonusCrudComponent,
    CustomerSessionHistoryComponent,
    CustomerSessionHistoryFilterComponent,
    CustomerHeatMapComponent,
    ShoppingCategoryBreakdownComponent,
    RevenueShopBreakdownComponent,
    CustomerShoppingListComponent,
    CustomerShoppingListFilterComponent,
    CustomerShoppingDetailsFormComponent,
    CustomerShoppingListProductsComponent,
    CustomerShoppingListProductsFilterComponent,
    CustomerLoyaltyProgramCrudComponent,
    CustomerLoyaltyProgramCreateFormComponent,
    CustomerLoyaltyProgramFilterFormComponent,
    CustomerLoyaltyProgramUpdateFormComponent,
  ],
  imports: [CustomersRouterModule, CrudModule, ChartModule, GoogleMapsModule, PushNotificationModule, SmsHistoryModule],
})
export class CustomersModule {}
