import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudPrivacyPolicyService } from '../../../../../../../../shared/api/auth/crud-privacy-policy.service';
import {
  PrivacyPolicyCreateInput,
  PrivacyPolicyEntity,
  PrivacyPolicyUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { PrivacyPolicyFormCreateComponent } from '../privacy-policy-form-create/privacy-policy-form-create.component';
import { PrivacyPolicyFormFilterComponent } from '../privacy-policy-form-filter/privacy-policy-form-filter.component';
import { PrivacyPolicyFormUpdateComponent } from '../privacy-policy-form-update/privacy-policy-form-update.component';

@Component({
  selector: 'app-privacy-policy-crud',
  templateUrl: 'privacy-policy-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = PrivacyPolicyFormFilterComponent;
  createForm: Type<DynamicForm<PrivacyPolicyCreateInput>> = PrivacyPolicyFormCreateComponent;
  updateForm: Type<DynamicForm<PrivacyPolicyUpdateInput>> = PrivacyPolicyFormUpdateComponent;

  fields: CrudFields<PrivacyPolicyEntity> = ['code', 'dateStart', 'dateEnd', 'isActive', 'name_i18n'];

  config: CrudConfig = {
    title: 'Privacy Policy',
    plural: 'Privacy Policies',
    single: 'Privacy Policy',
    formWidth: '90%',
  };

  columns: CrudColumn<PrivacyPolicyEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: PrivacyPolicyEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: PrivacyPolicyEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Date Start',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: PrivacyPolicyEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Date End',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: PrivacyPolicyEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
  ];

  constructor(public readonly service: CrudPrivacyPolicyService) {}
}
