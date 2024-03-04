import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreRegionComponent } from './components/crud-store-region/store-region.component';

const routes: Routes = [{ path: '', component: StoreRegionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRegionRouterModule {}
