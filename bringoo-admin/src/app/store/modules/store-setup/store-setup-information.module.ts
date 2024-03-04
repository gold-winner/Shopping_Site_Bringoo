import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { StoreSetupLayoutComponent } from '../../components/store-setup-layout/store-setup-layout.component';
import { StoreAssetsComponent } from './components/store-assets/store-assets.component';
import { StoreBasicInformationFormComponent } from './components/store-basic-information-form/store-basic-information-form.component';
import { StoreLegalComponent } from './components/store-legal/store-legal.component';
import { StorePickerDriverLimitationsFormComponent } from './components/store-picker-driver-limitations/store-picker-driver-limitations-form.component';
import { StoreShopSettingsFormComponent } from './components/store-webshop-settings/store-shop-settings-form.component';
import { StoreSetupInformationRouterModule } from './store-setup-information-router.module';

@NgModule({
  declarations: [
    StoreBasicInformationFormComponent,
    StoreLegalComponent,
    StoreAssetsComponent,
    StoreShopSettingsFormComponent,
    StorePickerDriverLimitationsFormComponent,
    StoreSetupLayoutComponent,
  ],
  imports: [SharedModule, StoreSetupInformationRouterModule],
})
export class StoreSetupInformationModule {}
