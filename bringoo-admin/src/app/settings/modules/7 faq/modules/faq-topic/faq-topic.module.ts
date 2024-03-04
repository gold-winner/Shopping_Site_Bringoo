import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CurrencyRoutingModule } from '../../../2 Financial Management/modules/currency-setup/currency-routing.module';
import { FaqTopicCreateFormComponent } from './components/faq-topic-create-form/faq-topic-create-form.component';
import { FaqTopicCrudComponent } from './components/faq-topic-crud/faq-topic-crud.component';
import { FaqTopicFilterFormComponent } from './components/faq-topic-filter-form/faq-topic-filter-form.component';
import { FaqTopicUpdateFormComponent } from './components/faq-topic-update-form/faq-topic-update-form.component';
import { FaqTopicRouterModule } from './faq-topic-router.module';

@NgModule({
  declarations: [FaqTopicCrudComponent, FaqTopicCreateFormComponent, FaqTopicUpdateFormComponent, FaqTopicFilterFormComponent],
  imports: [FaqTopicRouterModule, CurrencyRoutingModule, SharedModule, CrudModule],
})
export class FaqTopicModule {}
