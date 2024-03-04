import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreClosingDaysCrudComponent } from './components/store-closing-days-crud/store-closing-days-crud.component';

const routes: Routes = [{ path: '', component: StoreClosingDaysCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreClosingDaysRouterModule {}
