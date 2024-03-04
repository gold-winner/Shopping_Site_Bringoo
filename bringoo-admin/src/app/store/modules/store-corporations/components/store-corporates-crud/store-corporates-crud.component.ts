import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCorporateService } from '../../../../../../shared/api/auth/crud-corporate.service';
import { CorporateCreateInput, CorporateEntity, CorporateUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreCorporatesCreateFormComponent } from '../store-corporates-create-form/store-corporates-create-form.component';
import { StoreCorporatesFilterFormComponent } from '../store-corporates-filter-form/store-corporates-filter-form.component';
import { StoreCorporatesUpdateFormComponent } from '../store-corporates-update-form/store-corporates-update-form.component';

@Component({
  selector: 'app-store-corporates-crud',
  templateUrl: './store-corporates-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCorporatesCrudComponent {
  createForm: Type<DynamicForm<CorporateCreateInput>> = StoreCorporatesCreateFormComponent;
  updateForm: Type<DynamicForm<CorporateUpdateInput>> = StoreCorporatesUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StoreCorporatesFilterFormComponent;

  fields: CrudFields<CorporateEntity> = ['name_i18n', 'isActive'];

  config: CrudConfig = {
    title: 'Corporations',
    plural: 'Corporations',
    single: 'Corporation',
  };

  columns: CrudColumn<CorporateEntity>[] = [
    {
      label: 'Corporate',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: CorporateEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CorporateEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudCorporateService) {}
}
