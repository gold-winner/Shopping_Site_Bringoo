import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudVendorTypeService } from '../../../../../../../../shared/api/auth/crud-vendor-type.service';
import { VendorTypeCreateInput, VendorTypeEntity, VendorTypeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { VendorTypeCreateFormComponent } from '../vendor-type-create-form/vendor-type-create-form.component';
import { VendorTypeUpdateFormComponent } from '../vendor-type-update-form/vendor-type-update-form.component';

@Component({
  selector: 'app-crud-vendor-type',
  templateUrl: './crud-vendor-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudVendorTypeComponent {
  createForm: Type<DynamicForm<VendorTypeCreateInput>> = VendorTypeCreateFormComponent;
  updateForm: Type<DynamicForm<VendorTypeUpdateInput>> = VendorTypeUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  pageSizeOptions: number[] = [50, 100, 250, 500];

  fields: CrudFields<VendorTypeEntity> = ['code', 'name_i18n', 'isActive'];
  config: CrudConfig = {
    title: 'Vendor Type Setup',
    plural: 'Vendor types',
    single: 'Vendor type',
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

  constructor(public readonly service: CrudVendorTypeService) {}
}
