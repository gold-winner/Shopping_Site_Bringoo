import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StorePerformanceComponent } from './component/store-performance-page/store-performance.component';

const routes: Routes = [
  {
    path: '',
    data: { storePerformance: true },
    component: StorePerformanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePerformanceRouterModule {}
