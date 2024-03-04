import { NgModule } from '@angular/core';

import { ProductsAttributesBookstoreCreateFormComponent } from './products-attributes-bookstore-create-form/products-attributes-bookstore-create-form.component';
import { ProductsAttributesBookstoreUpdateFormComponent } from './products-attributes-bookstore-update-form/products-attributes-bookstore-update-form.component';
import { ProductsAttributesGroceryCreateFormComponent } from './products-attributes-grocery-create-form/products-attributes-grocery-create-form.component';
import { ProductsAttributesGroceryUpdateFormComponent } from './products-attributes-grocery-update-form/products-attributes-grocery-update-form.component';
import { ProductsAttributesHardwareCreateFormComponent } from './products-attributes-hardware-create-form/products-attributes-hardware-create-form.component';
import { ProductsAttributesHardwareUpdateFormComponent } from './products-attributes-hardware-update-form/products-attributes-hardware-update-form.component';
import { ProductsAttributesPharmaCreateFormComponent } from './products-attributes-pharma-create-form/products-attributes-pharma-create-form.component';
import { ProductsAttributesPharmaUpdateFormComponent } from './products-attributes-pharma-update-form/products-attributes-pharma-update-form.component';

export const components: Required<NgModule>['declarations'] = [
  ProductsAttributesHardwareUpdateFormComponent,
  ProductsAttributesHardwareCreateFormComponent,
  ProductsAttributesGroceryUpdateFormComponent,
  ProductsAttributesGroceryCreateFormComponent,
  ProductsAttributesBookstoreCreateFormComponent,
  ProductsAttributesBookstoreUpdateFormComponent,
  ProductsAttributesPharmaUpdateFormComponent,
  ProductsAttributesPharmaCreateFormComponent,
];
