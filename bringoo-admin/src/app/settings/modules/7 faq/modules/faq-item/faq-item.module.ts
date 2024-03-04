import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CurrencyRoutingModule } from '../../../2 Financial Management/modules/currency-setup/currency-routing.module';
import { FaqItemCreateFormComponent } from './components/faq-item-create-form/faq-item-create-form.component';
import { FaqItemCrudComponent } from './components/faq-item-crud/faq-item-crud.component';
import { FaqItemFilterFormComponent } from './components/faq-item-filter-form/faq-item-filter-form.component';
import { FaqItemUpdateFormComponent } from './components/faq-item-update-form/faq-item-update-form.component';
import { FaqItemRouterModule } from './faq-item-router.module';

@NgModule({
  declarations: [FaqItemCrudComponent, FaqItemCreateFormComponent, FaqItemUpdateFormComponent, FaqItemFilterFormComponent],
  imports: [FaqItemRouterModule, CurrencyRoutingModule, SharedModule, CrudModule],
})
export class FaqItemModule {}
