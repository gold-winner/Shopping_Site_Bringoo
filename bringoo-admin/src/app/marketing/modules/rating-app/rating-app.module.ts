import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { RatingAppHistoryCrudComponent } from './components/rating-app-history-crud/rating-app-history-crud.component';
import { RatingAppHistoryFilterFormComponent } from './components/rating-app-history-filter-form/rating-app-history-filter-form.component';
import { RatingAppRouterModule } from './rating-app-router.module';

@NgModule({
  declarations: [RatingAppHistoryCrudComponent, RatingAppHistoryFilterFormComponent],
  imports: [SharedModule, CrudModule, RatingAppRouterModule],
})
export class RatingAppModule {}
