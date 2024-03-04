import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreCorporatesCreateFormComponent } from './components/store-corporates-create-form/store-corporates-create-form.component';
import { StoreCorporatesCrudComponent } from './components/store-corporates-crud/store-corporates-crud.component';
import { StoreCorporatesFilterFormComponent } from './components/store-corporates-filter-form/store-corporates-filter-form.component';
import { StoreCorporatesUpdateFormComponent } from './components/store-corporates-update-form/store-corporates-update-form.component';
import { StoreCorporationsRouterModule } from './store-corporations-router.module';

@NgModule({
  declarations: [
    StoreCorporatesCrudComponent,
    StoreCorporatesCreateFormComponent,
    StoreCorporatesUpdateFormComponent,
    StoreCorporatesFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreCorporationsRouterModule],
})
export class StoreCorporationsModule {}
