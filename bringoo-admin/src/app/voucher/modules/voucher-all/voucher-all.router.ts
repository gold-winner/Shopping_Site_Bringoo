import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { VoucherCrudComponent } from './components/voucher-crud/voucher-crud.component';
import { VoucherDetailComponent } from './components/voucher-detail/voucher-detail.component';

const routes: Routes = [
  { path: '', component: VoucherCrudComponent, pathMatch: 'full' },
  { path: 'details/:id', component: VoucherDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherAllRouter {}
