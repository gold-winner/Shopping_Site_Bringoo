import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { AuthEmailComponent } from './components/auth-email/auth-email.component';
import { AuthPhoneComponent } from './components/auth-phone/auth-phone.component';
import { AuthTypesComponent } from './components/auth-types/auth-types.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'email',
        pathMatch: 'full',
      },
      {
        path: 'phone',
        component: AuthPhoneComponent,
        children: [],
      },
      {
        path: 'email',
        component: AuthEmailComponent,
      },
      {
        path: '**',
        component: AuthTypesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
