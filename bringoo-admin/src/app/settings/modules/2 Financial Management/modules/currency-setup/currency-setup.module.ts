import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CrudCurrencyComponent } from './components/crud-currency/crud-currency.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
  declarations: [CreateFormComponent, UpdateFormComponent, CrudCurrencyComponent, FilterFormComponent],
  imports: [CurrencyRoutingModule, SharedModule, CrudModule],
})
export class CurrencySetupModule {}
