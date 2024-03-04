import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoicesCrudComponent } from './components/invoices-crud/invoices-crud.component';
import { InvoicesFilterFormComponent } from './components/invoices-filter-form/invoices-filter-form.component';
import { InvoicesRouterModule } from './invoices-router.module';

@NgModule({
  declarations: [InvoicesCrudComponent, InvoicesFilterFormComponent, InvoiceDetailComponent],
  imports: [SharedModule, CrudModule, InvoicesRouterModule],
})
export class InvoicesModule {}
