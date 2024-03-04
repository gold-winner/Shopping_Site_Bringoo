import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoresModule } from '../../../store/modules/stores/stores.module';
import { components } from './components';
import { ProductRecallRouterModule } from './product-recall-router.module';

@NgModule({
  declarations: [...components],
  imports: [ProductRecallRouterModule, SharedModule, CrudModule, StoresModule],
})
export class ProductRecallModule {}
