import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VoucherAllModule } from './modules/voucher-all/voucher-all.module';

const routes: Routes = [
  {
    path: 'all',
    loadChildren: (): Promise<Type<VoucherAllModule>> =>
      import('./modules/voucher-all/voucher-all.module').then((m: { VoucherAllModule: Type<VoucherAllModule> }) => m.VoucherAllModule),
  },
  { path: '', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherRouter {}
