import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudLoyaltyProgramService } from '../../../../../../../../shared/api/auth/crud-loyalty-program.service';
import {
  LoyaltyProgramCreateInput,
  LoyaltyProgramEntity,
  LoyaltyProgramUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { LoyaltyProgramSetupCreateFormComponent } from '../loyalty-program-setup-create-form/loyalty-program-setup-create-form.component';
import { LoyaltyProgramSetupFilterFormComponent } from '../loyalty-program-setup-filter-form/loyalty-program-setup-filter-form.component';
import { LoyaltyProgramSetupUpdateFormComponent } from '../loyalty-program-setup-update-form/loyalty-program-setup-update-form.component';

@Component({
  selector: 'app-product-management-setup-crud',
  templateUrl: './loyalty-program-setup-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoyaltyProgramSetupCrudComponent {
  createForm: Type<DynamicForm<LoyaltyProgramCreateInput>> = LoyaltyProgramSetupCreateFormComponent;
  updateForm: Type<DynamicForm<LoyaltyProgramUpdateInput>> = LoyaltyProgramSetupUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = LoyaltyProgramSetupFilterFormComponent;

  fields: CrudFields<LoyaltyProgramEntity> = ['code', 'name_i18n', 'isActive', 'logoUrl'];

  config: CrudConfig = {
    title: 'Loyalty Program Setup',
    plural: 'Loyalty Programs',
    single: 'Loyalty Program',
  };

  columns: CrudColumn<LoyaltyProgramEntity>[] = [
    {
      label: '',
      isSortable: false,
      getField(item: LoyaltyProgramEntity): EntityValue {
        return item.logoUrl;
      },
      type: 'image',
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: LoyaltyProgramEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: LoyaltyProgramEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: LoyaltyProgramEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudLoyaltyProgramService) {}
}
