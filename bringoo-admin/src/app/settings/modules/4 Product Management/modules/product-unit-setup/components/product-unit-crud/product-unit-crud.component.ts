import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudProductUnitService } from '../../../../../../../../shared/api/auth/crud-product-unit.service';
import { ProductUnitCreateInput, ProductUnitEntity, ProductUnitUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { ProductUnitCreateFormComponent } from '../product-unit-create-form/product-unit-create-form.component';
import { ProductUnitFilterFormComponent } from '../product-unit-filter-form/product-unit-filter-form.component';
import { ProductUnitUpdateFormComponent } from '../product-unit-update-form/product-unit-update-form.component';

@Component({
  selector: 'app-product-unit-crud',
  templateUrl: './product-unit-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductUnitCrudComponent {
  createForm: Type<DynamicForm<ProductUnitCreateInput>> = ProductUnitCreateFormComponent;
  updateForm: Type<DynamicForm<ProductUnitUpdateInput>> = ProductUnitUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ProductUnitFilterFormComponent;

  fields: CrudFields<ProductUnitEntity> = ['code', 'name_i18n', 'isActive'];

  config: CrudConfig = {
    title: 'Product Unit Setup',
    plural: 'Product Units',
    single: 'Product Unit',
  };

  columns: CrudColumn<ProductUnitEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: ProductUnitEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: ProductUnitEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: ProductUnitEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudProductUnitService) {}
}
