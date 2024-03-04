import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { MarkdownModule } from '../../../../../../shared/modules/markdown/markdown.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { PrivacyPolicyRouterModule } from './privacy-policy-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CrudModule, PrivacyPolicyRouterModule, MarkdownModule],
})
export class PrivacyPolicyModule {}
