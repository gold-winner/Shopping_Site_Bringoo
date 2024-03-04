import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudCurrencyComponent } from './components/crud-currency/crud-currency.component';

const routes: Routes = [{ path: '', component: CrudCurrencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyRoutingModule {}
