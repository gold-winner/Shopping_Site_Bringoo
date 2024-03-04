import { NgModule } from '@angular/core';

import { SurveyCreatorComponent } from './survey-creator/survey-creator.component';
import { SurveyCreatorControlComponent } from './survey-creator-control/survey-creator-control.component';

export const components: Required<NgModule>['declarations'] = [SurveyCreatorComponent, SurveyCreatorControlComponent];
