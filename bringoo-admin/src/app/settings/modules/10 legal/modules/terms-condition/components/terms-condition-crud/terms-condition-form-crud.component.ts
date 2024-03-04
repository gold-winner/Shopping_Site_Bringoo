import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { tap } from 'rxjs/operators';

import { CrudTermsConditionService } from '../../../../../../../../shared/api/auth/crud-terms-condition.service';
import { TermsConditionCreateInput, TermsConditionEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { TermsConditionFormCreateComponent } from '../terms-condition-form-create/terms-condition-form-create.component';
import { TermsConditionFormFilterComponent } from '../terms-condition-form-filter/terms-condition-form-filter.component';
import { TermsConditionFormUpdateComponent } from '../terms-condition-form-update/terms-condition-form-update.component';

@Component({
  selector: 'app-terms-condition-form-create',
  templateUrl: 'terms-condition-form-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditionFormCrudComponent {
  createForm: Type<DynamicForm<TermsConditionCreateInput>> = TermsConditionFormCreateComponent;
  updateForm: Type<DynamicForm<TermsConditionCreateInput>> = TermsConditionFormUpdateComponent;
  filterForm: Type<DynamicFilterFormComponent> = TermsConditionFormFilterComponent;

  join: string[] = [];
  fields: CrudFields<TermsConditionEntity> = ['dateStart', 'dateEnd', 'name_i18n', 'code', 'isActive', 'description_i18n'];

  reloadPage: symbol = Symbol('reload');

  config: CrudConfig = {
    title: 'Terms and Condition',
    plural: 'Terms and Condition',
    single: 'Terms and Condition',
    formWidth: '90%',
    isDragged: true,
  };

  columns: CrudColumn<TermsConditionEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: TermsConditionEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: TermsConditionEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Date Start',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: TermsConditionEntity): EntityValue {
        return item.dateStart;
      },
      type: 'text',
    },
    {
      label: 'Date End',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: TermsConditionEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'text',
    },

    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: TermsConditionEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  draggedEnd([sourceId, targetId]: [string, string]): void {
    if (sourceId && targetId && sourceId !== targetId) {
      this.service
        .changeOrder({ sourceId, targetId })
        .pipe(tap(() => (this.reloadPage = Symbol('reload'))))
        .subscribe();
    }
  }

  constructor(public readonly service: CrudTermsConditionService) {}
}
