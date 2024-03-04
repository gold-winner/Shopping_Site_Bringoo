import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudSettingsEmailBlockedService } from '../../../../../../../../shared/api/auth/crud-settings-email-blocked.service';
import {
  SettingsEmailBlockedCreateInput,
  SettingsEmailBlockedEntity,
  SettingsEmailBlockedUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { EmailBlockedCreateFormComponent } from '../email-blocked-create-form/email-blocked-create-form.component';
import { EmailBlockedFilterFormComponent } from '../email-blocked-filter-form/email-blocked-filter-form.component';
import { EmailBlockedUpdateFormComponent } from '../email-blocked-update-form/email-blocked-update-form.component';

@Component({
  selector: 'app-email-blocked-crud',
  templateUrl: './email-blocked-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailBlockedCrudComponent {
  createForm: Type<DynamicForm<SettingsEmailBlockedCreateInput>> = EmailBlockedCreateFormComponent;
  updateForm: Type<DynamicForm<SettingsEmailBlockedUpdateInput>> = EmailBlockedUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = EmailBlockedFilterFormComponent;
  fields: CrudFields<SettingsEmailBlockedEntity> = ['isActive', 'emailDomain'];

  config: CrudConfig = {
    title: 'Emails blocked',
    plural: 'Emails allowed',
    single: 'Emails allowed',
  };

  columns: CrudColumn<SettingsEmailBlockedEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: SettingsEmailBlockedEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Not active',
      },
    },
    {
      label: 'Email domain',
      isSortable: true,
      sortBy: 'emailDomain',
      getField(item: SettingsEmailBlockedEntity): EntityValue {
        return item.emailDomain;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudSettingsEmailBlockedService) {}
}
