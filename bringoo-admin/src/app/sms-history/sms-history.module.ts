import { NgModule } from '@angular/core';

import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SharedModule } from '../../shared/shared.module';
import { SmsHistoryCreateFormComponent } from './components/sms-history-create-form/sms-history-create-form.component';
import { SmsHistoryCrudComponent } from './components/sms-history-crud/sms-history-crud.component';
import { SmsHistoryFilterFormComponent } from './components/sms-history-filter-form/sms-history-filter-form.component';

@NgModule({
  declarations: [SmsHistoryCreateFormComponent, SmsHistoryFilterFormComponent, SmsHistoryCrudComponent],
  imports: [SharedModule, CrudModule],
  exports: [SmsHistoryCrudComponent],
})
export class SmsHistoryModule {}
