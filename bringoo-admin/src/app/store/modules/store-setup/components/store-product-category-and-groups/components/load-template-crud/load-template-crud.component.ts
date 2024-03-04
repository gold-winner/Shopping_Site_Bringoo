import { Component, EventEmitter, Output, Type } from '@angular/core';

import { CrudCategoriesAndGroupsTemplateService } from '../../../../../../../../shared/api/auth/crud-categories-and-groups-template.service';
import { CategoriesAndGroupsTemplateEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { LoadTemplateFilterFormComponent } from '../load-template-filter-form/load-template-filter-form.component';

@Component({
  selector: 'app-load-template-crud',
  templateUrl: './load-template-crud.component.html',
})
export class LoadTemplateCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = LoadTemplateFilterFormComponent;

  @Output() templateId: EventEmitter<string> = new EventEmitter<string>();

  fields: CrudFields<CategoriesAndGroupsTemplateEntity> = ['name_i18n', 'description_i18n', 'isActive'];

  join: string[] = [];

  config: CrudConfig = {
    title: 'Categories And Groups',
    plural: 'Categories And Groups',
    single: 'Categories And Groups',
    isCreateButtonVisible: false,
    isShowDefaultActions: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    actionsList: [],
  };

  columns: CrudColumn<CategoriesAndGroupsTemplateEntity>[] = [
    {
      label: 'Template Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: CategoriesAndGroupsTemplateEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Description',
      isSortable: true,
      sortBy: 'description_i18n',
      getField(item: CategoriesAndGroupsTemplateEntity): EntityValue {
        return item.description_i18n;
      },
      type: 'text',
    },
  ];

  onChecked(ids: string[]): void {
    this.templateId.emit(ids[0]);
  }

  constructor(public readonly service: CrudCategoriesAndGroupsTemplateService) {}
}
