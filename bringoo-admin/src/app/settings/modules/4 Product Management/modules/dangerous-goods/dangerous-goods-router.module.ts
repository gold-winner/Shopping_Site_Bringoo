import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DangerousGoodsCrudComponent } from './components/dangerous-goods-crud/dangerous-goods-crud.component';

const routes: Routes = [{ path: '', component: DangerousGoodsCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DangerousGoodsRouterModule {}
