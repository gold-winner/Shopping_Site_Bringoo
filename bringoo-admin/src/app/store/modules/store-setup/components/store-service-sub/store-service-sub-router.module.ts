import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreServiceSubComponent } from './components/store-service-sub.component';

const routes: Routes = [{ path: '', component: StoreServiceSubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreServiceSubRouterModule {}
