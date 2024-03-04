import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CrudLanguageService } from '../../../../../../../../shared/api/auth/crud-language.service';
import { LanguageCreateInput, LanguageEntity, LanguageUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { PrimaryLanguageControllerService } from '../../../../../../../../shared/api/auth/primary-language-controller.service';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { LanguagesService } from '../../../../../../../../shared/services/languages.service';
import { LanguageCreateFormComponent } from '../language-create-form/language-create-form.component';
import { LanguageFilterFormComponent } from '../language-filter-form/language-filter-form.component';
import { LanguageUpdateFormComponent } from '../language-update-form/language-update-form.component';

@Component({
  selector: 'app-language-crud',
  templateUrl: './language-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCrudComponent {
  createForm: Type<DynamicForm<LanguageCreateInput>> = LanguageCreateFormComponent;
  updateForm: Type<DynamicForm<LanguageUpdateInput>> = LanguageUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = LanguageFilterFormComponent;

  fields: CrudFields<LanguageEntity> = ['code', 'name_i18n', 'isActive', 'isPrimary'];
  setPrimaryLanguage: boolean = false;
  reloadData: symbol | undefined;

  reloadingActions: string[] = ['delete', 'create', 'update'];

  config: CrudConfig = {
    title: 'Languages',
    plural: 'Languages',
    single: 'Language',
    actionsList: [
      {
        label: 'Change primary language',
        noSelectionDisable: false,
        action: (): void => {
          this.setPrimaryLanguage = true;
        },
      },
    ],
  };

  columns: CrudColumn<LanguageEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: LanguageEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: LanguageEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: LanguageEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Type',
      isSortable: true,
      sortBy: 'isPrimary',
      getField(item: LanguageEntity): EntityValue {
        return item.isPrimary;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Main',
        falseText: 'Extra',
      },
    },
  ];

  languageController: UntypedFormControl = new UntypedFormControl(null, [Validators.required]);

  constructor(
    public readonly service: CrudLanguageService,
    private readonly primaryLanguageService: PrimaryLanguageControllerService,
    private readonly notification: NzNotificationService,
    private readonly languagesService: LanguagesService,
  ) {}

  onChangeLanguage(): void {
    if (this.languageController.valid) {
      this.primaryLanguageService.changePrimaryLanguage({ lang: this.languageController.value }).subscribe(() => {
        this.notification.success('Change Primary Language', 'Successfully changed.');
        this.reloadData = Symbol('reload');
        this.reloadLanguages();
      });
    }
    this.onClosePanel();
  }

  onClosePanel(): void {
    this.setPrimaryLanguage = false;
  }

  reloadLanguages(): void {
    this.languagesService.loadLanguages.next(Symbol('reload'));
  }
}
