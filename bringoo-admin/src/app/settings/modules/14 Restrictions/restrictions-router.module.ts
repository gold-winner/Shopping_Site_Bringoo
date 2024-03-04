import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestrictionsComponent } from './components/restrictions/restrictions.component';
import { CountryAllowedModule } from './modules/country-allowed/country-allowed.module';
import { EmailBlockedModule } from './modules/email-blocked/email-blocked.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RestrictionsComponent,
  },
  {
    path: 'country-allowed',
    data: {
      breadcrumb: 'Countries allowed',
    },
    loadChildren: (): Promise<Type<CountryAllowedModule>> =>
      import('./modules/country-allowed/country-allowed.module').then(
        (m: { CountryAllowedModule: Type<CountryAllowedModule> }) => m.CountryAllowedModule,
      ),
  },
  {
    path: 'email-blocked',
    data: {
      breadcrumb: 'Email domains Blocked',
    },
    loadChildren: (): Promise<Type<EmailBlockedModule>> =>
      import('./modules/email-blocked/email-blocked.module').then(
        (m: { EmailBlockedModule: Type<EmailBlockedModule> }) => m.EmailBlockedModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictionsRouterModule {}
