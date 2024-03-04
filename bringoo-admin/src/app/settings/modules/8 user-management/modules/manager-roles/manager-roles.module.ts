import { NgModule } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ManagerRolesCreateFormComponent } from './components/manager-roles-create-form/manager-roles-create-form.component';
import { ManagerRolesCrudComponent } from './components/manager-roles-crud/manager-roles-crud.component';
import { ManagerRolesFilterFormComponent } from './components/manager-roles-filter-form/manager-roles-filter-form.component';
import { ManagerRolesUpdateFormComponent } from './components/manager-roles-update-form/manager-roles-update-form.component';
import { PermissionSettingsComponent } from './components/permission-settings/permission-settings.component';
import { ManagerRolesRouterModule } from './manager-roles-router.module';

@NgModule({
  declarations: [
    ManagerRolesCrudComponent,
    ManagerRolesFilterFormComponent,
    ManagerRolesUpdateFormComponent,
    ManagerRolesCreateFormComponent,
    PermissionSettingsComponent,
  ],
  imports: [SharedModule, CrudModule, ManagerRolesRouterModule, NgxBarcode6Module],
})
export class ManagerRolesModule {}
