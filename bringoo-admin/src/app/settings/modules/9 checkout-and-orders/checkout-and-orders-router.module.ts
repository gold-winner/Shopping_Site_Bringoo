import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutAndOrdersComponent } from './components/checkout-and-orders/checkout-and-orders.component';
import { CancelReasonModule } from './modules/cancel-reason/cancel-reason.module';
import { ReplacementOptionModule } from './modules/replacement-option/replacement-option.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CheckoutAndOrdersComponent,
  },
  {
    path: 'replacement-options',
    data: {
      breadcrumb: 'Replacement Options',
    },
    loadChildren: (): Promise<Type<ReplacementOptionModule>> =>
      import('./modules/replacement-option/replacement-option.module').then(
        (m: { ReplacementOptionModule: Type<ReplacementOptionModule> }) => m.ReplacementOptionModule,
      ),
  },
  {
    path: 'cancel-reason',
    data: {
      breadcrumb: 'Cancel reason',
    },
    loadChildren: (): Promise<Type<CancelReasonModule>> =>
      import('./modules/cancel-reason/cancel-reason.module').then(
        (m: { CancelReasonModule: Type<CancelReasonModule> }) => m.CancelReasonModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutAndOrdersRouterModule {}
