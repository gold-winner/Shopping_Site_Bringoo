import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [SharedModule],
  exports: [...components],
})
export class MarkdownModule {}
