import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from '../../../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
@NgModule({
  declarations: [ProductsComponent, ProductsGridComponent, ProductFilterComponent, ProductComponent],
  imports: [SharedModule, CommonModule, ProductsRoutingModule, IvyCarouselModule, NgxSkeletonLoaderModule.forRoot()],
  exports: [ProductsComponent],
})
export class ProductsModule {}
