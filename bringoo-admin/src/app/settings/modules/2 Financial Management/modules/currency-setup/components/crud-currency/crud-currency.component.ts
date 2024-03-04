import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudCurrencyService } from '../../../../../../../../shared/api/auth/crud-currency.service';
import { CurrencyCreateInput, CurrencyEntity, CurrencyUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CreateFormComponent } from '../create-form/create-form.component';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { UpdateFormComponent } from '../update-form/update-form.component';

@Component({
  selector: 'app-crud-currency',
  templateUrl: './crud-currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudCurrencyComponent {
  createForm: Type<DynamicForm<CurrencyCreateInput>> = CreateFormComponent;
  updateForm: Type<DynamicForm<CurrencyUpdateInput>> = UpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<CurrencyEntity> = ['name_i18n', 'code', 'isActive', 'symbol'];
  config: CrudConfig = {
    title: 'Currency',
    plural: 'Currencies',
    single: 'Currency',
  };

  columns: CrudColumn<CurrencyEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      type: 'text',
      getField(item: CurrencyEntity): EntityValue {
        return item.name_i18n;
      },
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      type: 'text',
      getField(item: CurrencyEntity): EntityValue {
        return item.code;
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: CurrencyEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudCurrencyService) {}
}
