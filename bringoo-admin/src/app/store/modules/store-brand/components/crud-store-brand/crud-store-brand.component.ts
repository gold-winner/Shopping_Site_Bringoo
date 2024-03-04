import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudStoreBrandService } from '../../../../../../shared/api/auth/crud-store-brand.service';
import { StoreBrandCreateInput, StoreBrandEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { CreateFormComponent } from '../create-form/create-form.component';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-stores-brand',
  templateUrl: './crud-store-brand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudStoreBrandComponent {
  createForm: Type<DynamicForm<StoreBrandCreateInput>> = CreateFormComponent;
  updateForm: Type<DynamicForm<StoreBrandCreateInput>> = CreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<StoreBrandEntity> = ['name_i18n', 'corporateCode', 'imageUrl'];
  join: string[] = ['corporate||name_i18n'];

  config: CrudConfig = {
    title: 'Store brand',
    plural: 'Store Brands',
    single: 'Store Brand',
  };

  columns: CrudColumn<StoreBrandEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: StoreBrandEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Brand name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: StoreBrandEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Corporation',
      isSortable: true,
      sortBy: 'corporateCode',
      getField(item: StoreBrandEntity): EntityValue {
        return item.corporate?.name_i18n;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudStoreBrandService) {}
}
