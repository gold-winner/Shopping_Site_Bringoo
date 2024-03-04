import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from '../../../../../shared/shared.module';
import { SettingsHistoryCategoryComponent } from './history-category/history-category.component';
import { SettingsHistoryDetailsComponent } from './history-details/history-details.component';
import { SettingsHistoryProductsComponent } from './history-products/history-products.component';
import { SettingsHistoryStatusComponent } from './history-status/history-status.component';
import { SettingsHistorySubtitleComponent } from './history-subtitle/history-subtitle.component';

@NgModule({
  declarations: [
    SettingsHistoryDetailsComponent,
    SettingsHistoryProductsComponent,
    SettingsHistoryStatusComponent,
    SettingsHistorySubtitleComponent,
    SettingsHistoryCategoryComponent,
  ],
  imports: [SharedModule, CommonModule, NgxSkeletonLoaderModule.forRoot()],
  exports: [
    SettingsHistoryDetailsComponent,
    SettingsHistoryProductsComponent,
    SettingsHistoryStatusComponent,
    SettingsHistorySubtitleComponent,
    SettingsHistoryCategoryComponent,
  ],
})
export class SettingsHistoryModule {}
