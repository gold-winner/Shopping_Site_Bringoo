import { NgModule } from '@angular/core';

import { LogisticOrdersModule } from './logistic-orders/logistic-orders.module';
import { LogisticRouteDetailsModule } from './logistic-route-details/logistic-route-details.module';
import { LogisticRoutesModules } from './logistic-routes/logistic-routes.modules';

export const modules: Required<NgModule>['imports'] = [LogisticRoutesModules, LogisticRouteDetailsModule, LogisticOrdersModule];
