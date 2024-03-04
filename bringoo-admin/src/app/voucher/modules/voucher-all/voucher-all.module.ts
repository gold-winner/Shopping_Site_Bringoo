import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { VoucherAllRouter } from './voucher-all.router';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CrudModule, VoucherAllRouter],
})
export class VoucherAllModule {}
