import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { UserManagementRouterModule } from './user-management-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, UserManagementRouterModule],
})
export class UserManagementModule {}
