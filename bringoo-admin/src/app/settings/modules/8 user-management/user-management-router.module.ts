import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { ManagerRolesModule } from './modules/manager-roles/manager-roles.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserManagementComponent,
  },
  {
    path: 'manager-roles',
    data: {
      breadcrumb: 'Manager Roles',
    },
    loadChildren: (): Promise<Type<ManagerRolesModule>> =>
      import('./modules/manager-roles/manager-roles.module').then(
        (m: { ManagerRolesModule: Type<ManagerRolesModule> }) => m.ManagerRolesModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRouterModule {}
