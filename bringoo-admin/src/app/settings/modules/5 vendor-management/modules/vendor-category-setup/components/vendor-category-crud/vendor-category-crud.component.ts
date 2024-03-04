import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudVendorCategoryService } from '../../../../../../../../shared/api/auth/crud-vendor-category.service';
import {
  VendorCategoryCreateInput,
  VendorCategoryEntity,
  VendorCategoryUpdateInput,
  VendorTypeEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { VendorCategoryCreateFormComponent } from '../vendor-category-create-form/vendor-category-create-form.component';
import { VendorCategoryFilterFormComponent } from '../vendor-category-filter-form/vendor-category-filter-form.component';
import { VendorCategoryUpdateFormComponent } from '../vendor-category-update-form/vendor-category-update-form.component';

@Component({
  selector: 'app-vendor-category-crud',
  templateUrl: './vendor-category-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCategoryCrudComponent {
  createForm: Type<DynamicForm<VendorCategoryCreateInput>> = VendorCategoryCreateFormComponent;
  updateForm: Type<DynamicForm<VendorCategoryUpdateInput>> = VendorCategoryUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = VendorCategoryFilterFormComponent;

  pageSizeOptions: number[] = [50, 100, 250, 500];

  fields: CrudFields<VendorCategoryEntity> = ['code', 'name_i18n', 'isActive'];
  config: CrudConfig = {
    title: 'Vendor Category Setup',
    plural: 'Vendor Categories',
    single: 'Vendor Category',
  };

  columns: CrudColumn<VendorTypeEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: VendorTypeEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: VendorTypeEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: VendorTypeEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudVendorCategoryService) {}
}
