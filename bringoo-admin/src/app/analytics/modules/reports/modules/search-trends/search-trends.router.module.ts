import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTrendsComponent } from './components/search-trends/search-trends.component';
import { SearchTrendProductsComponent } from './components/search-trends-products/search-trends-products.component';

const routes: Routes = [
  { path: '', component: SearchTrendsComponent },
  { path: 'products/:term', component: SearchTrendProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}
