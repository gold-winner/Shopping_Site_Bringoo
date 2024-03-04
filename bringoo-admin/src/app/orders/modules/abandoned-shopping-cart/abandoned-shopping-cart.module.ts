import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AbandonedShoppingCartCrudComponent } from './abandoned-shopping-cart-crud/abandoned-shopping-cart-crud.component';
import { AbandonedShoppingCartFilterFormComponent } from './abandoned-shopping-cart-filter-form/abandoned-shopping-cart-filter-form.component';
import { AbandonedShoppingCartRouterModule } from './abandoned-shopping-cart-router.module';

@NgModule({
  declarations: [AbandonedShoppingCartCrudComponent, AbandonedShoppingCartFilterFormComponent],
  imports: [SharedModule, CrudModule, AbandonedShoppingCartRouterModule],
})
export class AbandonedShoppingCartModule {}
