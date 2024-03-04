import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { EmailBlockedCreateFormComponent } from './components/email-blocked-create-form/email-blocked-create-form.component';
import { EmailBlockedCrudComponent } from './components/email-blocked-crud/email-blocked-crud.component';
import { EmailBlockedFilterFormComponent } from './components/email-blocked-filter-form/email-blocked-filter-form.component';
import { EmailBlockedUpdateFormComponent } from './components/email-blocked-update-form/email-blocked-update-form.component';
import { EmailBlockedRouterModule } from './email-blocked-router.module';

@NgModule({
  declarations: [
    EmailBlockedCreateFormComponent,
    EmailBlockedUpdateFormComponent,
    EmailBlockedFilterFormComponent,
    EmailBlockedCrudComponent,
  ],
  imports: [SharedModule, CrudModule, EmailBlockedRouterModule],
})
export class EmailBlockedModule {}
