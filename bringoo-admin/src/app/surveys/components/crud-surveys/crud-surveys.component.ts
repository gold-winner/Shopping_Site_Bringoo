import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudSurveyService } from '../../../../shared/api/auth/crud-survey.service';
import { SurveyCreateInput, SurveyEntity, SurveyUpdateInput } from '../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../shared/modules/crud/types/crud-select.type';
import { CreateSurveysComponent } from '../create-surveys/create-surveys.component';
import { FilterSurveysComponent } from '../filter-surveys/filter-surveys.component';
import { UpdateSurveysComponent } from '../update-surveys/update-surveys.component';

@Component({
  selector: 'app-crud-surveys',
  templateUrl: 'crud-surveys.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudSurveysComponent {
  createForm: Type<DynamicForm<SurveyCreateInput>> = CreateSurveysComponent;
  updateForm: Type<DynamicForm<SurveyUpdateInput>> = UpdateSurveysComponent;
  filterForm: Type<DynamicFilterFormComponent> = FilterSurveysComponent;

  fields: CrudFields<SurveyEntity> = ['name_i18n', 'dateStart', 'dateEnd', 'isForCustomer', 'isForStaff'];

  config: CrudConfig = {
    title: 'Surveys',
    plural: 'Surveys',
    single: 'Survey',
    formWidth: '90%',
  };

  columns: CrudColumn<SurveyEntity>[] = [
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: SurveyEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'User group',
      isSortable: false,
      getField(item: SurveyEntity): EntityValue {
        const groups: string[] = [];
        if (item.isForStaff) {
          groups.push('Staffs');
        }
        if (item.isForCustomer) {
          groups.push('Customers');
        }
        return groups.join(', ');
      },
      type: 'text',
    },
    {
      label: 'Date Start',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: SurveyEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Date End',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: SurveyEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: SurveyEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudSurveyService) {}
}
