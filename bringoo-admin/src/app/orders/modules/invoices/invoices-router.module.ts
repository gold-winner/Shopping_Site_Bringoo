import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoicesCrudComponent } from './components/invoices-crud/invoices-crud.component';

const routes: Routes = [
  { path: '', component: InvoicesCrudComponent },
  { path: 'detail/:id', component: InvoiceDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRouterModule {}
