import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudVatService } from '../../../../../../../../shared/api/auth/crud-vat.service';
import { VatCreateInput, VatEntity, VatUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { VatSetupCreateFormComponent } from '../vat-setup-create-form/vat-setup-create-form.component';
import { VatSetupFilterFormComponent } from '../vat-setup-filter-form/vat-setup-filter-form.component';
import { VatSetupUpdateFormComponent } from '../vat-setup-update-form/vat-setup-update-form.component';

@Component({
  selector: 'app-vat-setup-crud',
  templateUrl: './vat-setup-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VatSetupCrudComponent {
  createForm: Type<DynamicForm<VatCreateInput>> = VatSetupCreateFormComponent;
  updateForm: Type<DynamicForm<VatUpdateInput>> = VatSetupUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = VatSetupFilterFormComponent;

  fields: CrudFields<VatEntity> = ['code', 'value', 'name_i18n', 'isActive'];

  config: CrudConfig = {
    title: 'VAT Setup',
    plural: "VAT's",
    single: 'VAT',
  };

  columns: CrudColumn<VatEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: VatEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Value',
      isSortable: true,
      sortBy: 'value',
      getField(item: VatEntity): EntityValue {
        return item.value ? `${item.value.toString()}%` : item.value;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: VatEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: VatEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudVatService) {}
}
