import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { CustomersModule } from './modules/customers/customers.module';
import { ManagersModule } from './modules/managers/managers.module';
import { StaffModule } from './modules/staff/staff.module';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Customers' },
    loadChildren: (): Promise<Type<CustomersModule>> =>
      import('./modules/customers/customers.module').then((m: { CustomersModule: Type<CustomersModule> }) => m.CustomersModule),
  },
  {
    path: 'staff',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Staff' },
    loadChildren: (): Promise<Type<StaffModule>> =>
      import('./modules/staff/staff.module').then((m: { StaffModule: Type<StaffModule> }) => m.StaffModule),
  },
  {
    path: 'managers',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Managers' },
    loadChildren: (): Promise<Type<ManagersModule>> =>
      import('./modules/managers/managers.module').then((m: { ManagersModule: Type<ManagersModule> }) => m.ManagersModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRouterModule {}
