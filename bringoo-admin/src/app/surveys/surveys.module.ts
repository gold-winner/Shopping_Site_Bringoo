import { NgModule } from '@angular/core';

import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SurveyJsModule } from '../../shared/modules/survey-js/survey-js.module';
import { SharedModule } from '../../shared/shared.module';
import { components } from './components';
import { SurveysRouterModule } from './surveys-router.module';

@NgModule({
  declarations: [...components],
  imports: [CrudModule, SurveysRouterModule, SurveyJsModule, SharedModule],
})
export class SurveysModule {}
