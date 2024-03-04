import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { SettingsCardsPageComponent } from './components/settings-cards-page/settings-cards-page.component';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';
import { GeneralModule } from './modules/1 General/general.module';
import { FinancialManagementModule } from './modules/2 Financial Management/financial-management.module';
import { LoyaltyProgramModule } from './modules/3 Loyalty Program/loyalty-program.module';
import { ProductManagementModule } from './modules/4 Product Management/product-management.module';
import { VendorManagementModule } from './modules/5 vendor-management/vendor-management.module';
import { CommunicationAndEmailModule } from './modules/6 communication-and-email/communication-and-email.module';
import { FaqModule } from './modules/7 faq/faq.module';
import { UserManagementModule } from './modules/8 user-management/user-management.module';
import { CheckoutAndOrdersModule } from './modules/9 checkout-and-orders/checkout-and-orders.module';
import { LegalModule } from './modules/10 legal/legal.module';
import { CustomerAppModule } from './modules/11 customer-app/customer-app.module';
import { StaffAppModule } from './modules/12 staff-app/staff-app.module';
import { PartnerAppModule } from './modules/13 partner-app/partner-app.module';
import { RestrictionsModule } from './modules/14 Restrictions/restrictions.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsCardsPageComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      {
        path: 'general',
        data: {
          breadcrumb: 'General',
        },
        loadChildren: (): Promise<Type<GeneralModule>> =>
          import('./modules/1 General/general.module').then((m: { GeneralModule: Type<GeneralModule> }) => m.GeneralModule),
      },
      {
        path: 'financial-management',
        data: {
          breadcrumb: 'Financial Management',
        },
        loadChildren: (): Promise<Type<FinancialManagementModule>> =>
          import('./modules/2 Financial Management/financial-management.module').then(
            (m: { FinancialManagementModule: Type<FinancialManagementModule> }) => m.FinancialManagementModule,
          ),
      },
      {
        path: 'loyalty-program',
        data: {
          breadcrumb: 'Loyalty Program',
        },
        loadChildren: (): Promise<Type<LoyaltyProgramModule>> =>
          import('./modules/3 Loyalty Program/loyalty-program.module').then(
            (m: { LoyaltyProgramModule: Type<LoyaltyProgramModule> }) => m.LoyaltyProgramModule,
          ),
      },
      {
        path: 'product-management',
        data: {
          breadcrumb: 'Product Management',
        },
        loadChildren: (): Promise<Type<ProductManagementModule>> =>
          import('./modules/4 Product Management/product-management.module').then(
            (m: { ProductManagementModule: Type<ProductManagementModule> }) => m.ProductManagementModule,
          ),
      },
      {
        path: 'vendor-management',
        data: {
          breadcrumb: 'Vendor Management',
        },
        loadChildren: (): Promise<Type<VendorManagementModule>> =>
          import('./modules/5 vendor-management/vendor-management.module').then(
            (m: { VendorManagementModule: Type<VendorManagementModule> }) => m.VendorManagementModule,
          ),
      },
      {
        path: 'communication-email',
        data: {
          breadcrumb: 'Communication and Email',
        },
        loadChildren: (): Promise<Type<CommunicationAndEmailModule>> =>
          import('./modules/6 communication-and-email/communication-and-email.module').then(
            (m: { CommunicationAndEmailModule: Type<CommunicationAndEmailModule> }) => m.CommunicationAndEmailModule,
          ),
      },
      {
        path: 'faq',
        data: {
          breadcrumb: `FAQ's`,
        },
        loadChildren: (): Promise<Type<FaqModule>> =>
          import('./modules/7 faq/faq.module').then((m: { FaqModule: Type<FaqModule> }) => m.FaqModule),
      },
      {
        path: 'user-management',
        data: {
          breadcrumb: `User Management`,
        },
        loadChildren: (): Promise<Type<UserManagementModule>> =>
          import('./modules/8 user-management/user-management.module').then(
            (m: { UserManagementModule: Type<UserManagementModule> }) => m.UserManagementModule,
          ),
      },
      {
        path: 'checkout-orders',
        data: {
          breadcrumb: `Checkout and Orders`,
        },
        loadChildren: (): Promise<Type<CheckoutAndOrdersModule>> =>
          import('./modules/9 checkout-and-orders/checkout-and-orders.module').then(
            (m: { CheckoutAndOrdersModule: Type<CheckoutAndOrdersModule> }) => m.CheckoutAndOrdersModule,
          ),
      },
      {
        path: 'legal',
        data: {
          breadcrumb: `Legal`,
        },
        loadChildren: (): Promise<Type<LegalModule>> =>
          import('./modules/10 legal/legal.module').then((m: { LegalModule: Type<LegalModule> }) => m.LegalModule),
      },
      {
        path: 'customer-app',
        data: {
          breadcrumb: `Customer App`,
        },
        loadChildren: (): Promise<Type<CustomerAppModule>> =>
          import('./modules/11 customer-app/customer-app.module').then(
            (m: { CustomerAppModule: Type<CustomerAppModule> }) => m.CustomerAppModule,
          ),
      },
      {
        path: 'staff-app',
        data: {
          breadcrumb: `Staff App`,
        },
        loadChildren: (): Promise<Type<StaffAppModule>> =>
          import('./modules/12 staff-app/staff-app.module').then((m: { StaffAppModule: Type<StaffAppModule> }) => m.StaffAppModule),
      },
      {
        path: 'partner-app',
        data: {
          breadcrumb: `Partner App`,
        },
        loadChildren: (): Promise<Type<PartnerAppModule>> =>
          import('./modules/13 partner-app/partner-app.module').then(
            (m: { PartnerAppModule: Type<PartnerAppModule> }) => m.PartnerAppModule,
          ),
      },
      {
        path: 'restrictions',
        data: {
          breadcrumb: `Restrictions`,
        },
        loadChildren: (): Promise<Type<RestrictionsModule>> =>
          import('./modules/14 Restrictions/restrictions.module').then(
            (m: { RestrictionsModule: Type<RestrictionsModule> }) => m.RestrictionsModule,
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
export class SettingsRoutingModule {}
