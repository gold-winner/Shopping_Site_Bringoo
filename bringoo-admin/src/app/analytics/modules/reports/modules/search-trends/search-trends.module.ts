import { NgModule } from '@angular/core';

import { ChartModule } from '../../../../../../shared/modules/charts/chart.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SearchTrendsComponent } from './components/search-trends/search-trends.component';
import { SearchTrendProductsComponent } from './components/search-trends-products/search-trends-products.component';
import { ReportsRouterModule } from './search-trends.router.module';

@NgModule({
  declarations: [SearchTrendsComponent, SearchTrendProductsComponent],
  imports: [SharedModule, ReportsRouterModule, ChartModule],
})
export class SearchTrendsModule {}
