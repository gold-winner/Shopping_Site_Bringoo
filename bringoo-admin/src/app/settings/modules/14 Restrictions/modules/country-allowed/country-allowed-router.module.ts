import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryAllowedCrudComponent } from './components/country-allowed-crud/country-allowed-crud.component';

const routes: Routes = [{ path: '', component: CountryAllowedCrudComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryAllowedRouterModule {}
