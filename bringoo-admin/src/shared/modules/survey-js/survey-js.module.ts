import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SurveyCreatorModule } from 'survey-creator-angular';

import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SurveyCreatorModule],
  exports: [...components],
})
export class SurveyJsModule {}
