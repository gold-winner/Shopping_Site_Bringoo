import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreContactsCrudComponent } from './components/store-contacts-crud/store-contacts-crud.component';

const routes: Routes = [{ path: '', component: StoreContactsCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreContactsRouterModule {}
