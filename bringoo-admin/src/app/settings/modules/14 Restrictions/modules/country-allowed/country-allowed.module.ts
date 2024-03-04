import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CountryAllowedCreateFormComponent } from './components/country-allowed-create-form/country-allowed-create-form.component';
import { CountryAllowedCrudComponent } from './components/country-allowed-crud/country-allowed-crud.component';
import { CountryAllowedFilterFormComponent } from './components/country-allowed-filter-form/country-allowed-filter-form.component';
import { CountryAllowedUpdateFormComponent } from './components/country-allowed-update-form/country-allowed-update-form.component';
import { CountryAllowedRouterModule } from './country-allowed-router.module';

@NgModule({
  declarations: [
    CountryAllowedCreateFormComponent,
    CountryAllowedUpdateFormComponent,
    CountryAllowedFilterFormComponent,
    CountryAllowedCrudComponent,
  ],
  imports: [SharedModule, CrudModule, CountryAllowedRouterModule],
})
export class CountryAllowedModule {}
