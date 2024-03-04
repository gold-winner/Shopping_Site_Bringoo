import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { LoadTemplateCrudComponent } from './components/load-template-crud/load-template-crud.component';
import { LoadTemplateFilterFormComponent } from './components/load-template-filter-form/load-template-filter-form.component';
import { StoreCategoryAndGroupSaveTemplate } from './components/store-category-and-group-save-template/store-category-and-group-save-template';
import { ProductCategoryAndGroupsComponent } from './components/store-product-category-and-groups/product-category-and-groups.component';
import { ProductCategoryAndGroupsFilterComponent } from './components/store-product-category-and-groups-filter/product-category-and-groups-filter.component';
import { StoreProductCategoryAndGroupRouterModule } from './store-product-category-and-group-router.module';

@NgModule({
  declarations: [
    ProductCategoryAndGroupsFilterComponent,
    ProductCategoryAndGroupsComponent,
    StoreCategoryAndGroupSaveTemplate,
    LoadTemplateCrudComponent,
    LoadTemplateFilterFormComponent,
  ],
  imports: [SharedModule, StoreProductCategoryAndGroupRouterModule, CrudModule],
  exports: [ProductCategoryAndGroupsFilterComponent],
})
export class StoreProductCategoryAndGroupModule {}
