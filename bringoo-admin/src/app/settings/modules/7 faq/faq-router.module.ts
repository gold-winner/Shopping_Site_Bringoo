import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqComponent } from './components/faq/faq.component';
import { FaqItemModule } from './modules/faq-item/faq-item.module';
import { FaqTopicModule } from './modules/faq-topic/faq-topic.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FaqComponent,
  },
  {
    path: 'faq-topic',
    data: {
      breadcrumb: 'FAQ Topic',
    },
    loadChildren: (): Promise<Type<FaqTopicModule>> =>
      import('./modules/faq-topic/faq-topic.module').then((m: { FaqTopicModule: Type<FaqTopicModule> }) => m.FaqTopicModule),
  },
  {
    path: 'faq-item',
    data: {
      breadcrumb: 'FAQ Items',
    },
    loadChildren: (): Promise<Type<FaqItemModule>> =>
      import('./modules/faq-item/faq-item.module').then((m: { FaqItemModule: Type<FaqItemModule> }) => m.FaqItemModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqRouterModule {}
