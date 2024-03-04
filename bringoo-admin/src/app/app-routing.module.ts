import { NgModule, Type } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { SITEMAP_CONFIG } from '../shared/config/sitemap.config';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { MenuLinkModel } from '../shared/interfaces/menu-link.model';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InspectionModule } from './inspection/inspection.module';
import { PageNotFoundComponent } from './layout/components/page-not-found/page-not-found.component';
import { MarketingModule } from './marketing/marketing.module';
import { NotificationModule } from './notification/notification.module';
import { OperationsModule } from './operations/operations.module';
import { OrdersModule } from './orders/orders.module';
import { PartnerModule } from './partner/partner.module';
import { ProductsModule } from './products/products.module';
import { RoutePlanningModule } from './route-planning/route-planning.module';
import { SettingsModule } from './settings/settings.module';
import { StoreModule } from './store/store.module';
import { SurveysModule } from './surveys/surveys.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { VoucherModule } from './voucher/voucher.module';

const routes: Routes = [
  {
    path: 'auth',
    data: { layout: 'auth' },
    loadChildren: (): Promise<Type<AuthModule>> => import('./auth/auth.module').then((m: { AuthModule: Type<AuthModule> }) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<DashboardModule>> =>
      import('./dashboard/dashboard.module').then((m: { DashboardModule: Type<DashboardModule> }) => m.DashboardModule),
  },
  {
    path: 'settings',
    data: {
      breadcrumb: 'Settings',
      hideBreadsOnHeader: true,
    },
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<SettingsModule>> =>
      import('./settings/settings.module').then((m: { SettingsModule: Type<SettingsModule> }) => m.SettingsModule),
  },
  {
    path: 'store',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<StoreModule>> =>
      import('./store/store.module').then((m: { StoreModule: Type<StoreModule> }) => m.StoreModule),
  },
  {
    path: 'partner',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<PartnerModule>> =>
      import('./partner/partner.module').then((m: { PartnerModule: Type<PartnerModule> }) => m.PartnerModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<UsersModule>> =>
      import('./users/users.module').then((m: { UsersModule: Type<UsersModule> }) => m.UsersModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<UserModule>> => import('./user/user.module').then((m: { UserModule: Type<UserModule> }) => m.UserModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ProductsModule>> =>
      import('./products/products.module').then((m: { ProductsModule: Type<ProductsModule> }) => m.ProductsModule),
  },
  {
    path: 'analytics',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<AnalyticsModule>> =>
      import('./analytics/analytics.module').then((m: { AnalyticsModule: Type<AnalyticsModule> }) => m.AnalyticsModule),
  },
  {
    path: 'inspection',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<InspectionModule>> =>
      import('./inspection/inspection.module').then((m: { InspectionModule: Type<InspectionModule> }) => m.InspectionModule),
  },
  {
    path: 'marketing',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<AnalyticsModule>> =>
      import('./marketing/marketing.module').then((m: { MarketingModule: Type<MarketingModule> }) => m.MarketingModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<OrdersModule>> =>
      import('./orders/orders.module').then((m: { OrdersModule: Type<OrdersModule> }) => m.OrdersModule),
  },
  {
    path: 'vouchers',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<VoucherModule>> =>
      import('./voucher/voucher.module').then((m: { VoucherModule: Type<VoucherModule> }) => m.VoucherModule),
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<VoucherModule>> =>
      import('./notification/notification.module').then((m: { NotificationModule: Type<NotificationModule> }) => m.NotificationModule),
  },
  {
    path: 'route-planning',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<RoutePlanningModule>> =>
      import('./route-planning/route-planning.module').then(
        (m: { RoutePlanningModule: Type<RoutePlanningModule> }) => m.RoutePlanningModule,
      ),
  },
  {
    path: 'operations',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<OperationsModule>> =>
      import('./operations/operations.module').then((m: { OperationsModule: Type<OperationsModule> }) => m.OperationsModule),
  },
  {
    path: 'surveys',
    data: {
      breadcrumb: 'Surveys',
    },
    loadChildren: (): Promise<Type<SurveysModule>> =>
      import('./surveys/surveys.module').then((m: { SurveysModule: Type<SurveysModule> }) => m.SurveysModule),
  },
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: PageNotFoundComponent,
  },
];

routes.map((value: Route) => {
  const menuSettings: MenuLinkModel | null = SITEMAP_CONFIG.find((v: MenuLinkModel) => v.showInMenu && v.path === value.path) ?? null;
  if (menuSettings) value.data = { breadcrumb: menuSettings.title };
});

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
