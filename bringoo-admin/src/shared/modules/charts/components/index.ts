import { NgModule } from '@angular/core';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarChartPercentageComponent } from './bar-chart-percentage/bar-chart-percentage.component';
import { DoughnutChartComponent } from './doughnut/doughnut-chart.component';
import { HeatMapChartComponent } from './heat-map-chart/heat-map-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { StackedVerticalBarChartComponent } from './stacked-vertical-bar-chart/stacked-vertical-bar-chart.component';
import { WordCloudChartComponent } from './word-cloud-chart/word-cloud-chart.component';

export const components: Required<NgModule>['declarations'] = [
  BarChartComponent,
  HeatMapChartComponent,
  StackedBarChartComponent,
  BarChartPercentageComponent,
  LineChartComponent,
  WordCloudChartComponent,
  StackedVerticalBarChartComponent,
  DoughnutChartComponent,
];
