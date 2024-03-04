import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreContactsCreateFormComponent } from './components/store-contacts-create-form/store-contacts-create-form.component';
import { StoreContactsCrudComponent } from './components/store-contacts-crud/store-contacts-crud.component';
import { StoreContactsFilterFormComponent } from './components/store-contacts-filter-form/store-contacts-filter-form.component';
import { StoreContactsUpdateFormComponent } from './components/store-contacts-update-form/store-contacts-update-form.component';
import { StoreContactsRouterModule } from './store-contacts-router.module';

@NgModule({
  declarations: [
    StoreContactsCrudComponent,
    StoreContactsCreateFormComponent,
    StoreContactsUpdateFormComponent,
    StoreContactsFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreContactsRouterModule],
})
export class StoreContactsModule {}
