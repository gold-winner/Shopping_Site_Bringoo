import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinancialManagementComponent } from './components/financial-management/financial-management.component';
import { CurrencySetupModule } from './modules/currency-setup/currency-setup.module';
import { DepositTypeSetupModule } from './modules/deposit-type-setup/deposit-type-setup.module';
import { VatSetupModule } from './modules/vat-setup/vat-setup.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FinancialManagementComponent,
  },
  {
    path: 'vat',
    data: {
      breadcrumb: 'Vat Setup',
    },
    loadChildren: (): Promise<Type<VatSetupModule>> =>
      import('./modules/vat-setup/vat-setup.module').then((m: { VatSetupModule: Type<VatSetupModule> }) => m.VatSetupModule),
  },
  {
    path: 'currency',
    data: {
      breadcrumb: 'Nationality Setup',
    },
    loadChildren: (): Promise<Type<CurrencySetupModule>> =>
      import('./modules/currency-setup/currency-setup.module').then(
        (m: { CurrencySetupModule: Type<CurrencySetupModule> }) => m.CurrencySetupModule,
      ),
  },
  {
    path: 'deposit-type',
    data: {
      breadcrumb: 'Deposit Type Setup',
    },
    loadChildren: (): Promise<Type<DepositTypeSetupModule>> =>
      import('./modules/deposit-type-setup/deposit-type-setup.module').then(
        (m: { DepositTypeSetupModule: Type<DepositTypeSetupModule> }) => m.DepositTypeSetupModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialManagementRouterModule {}
