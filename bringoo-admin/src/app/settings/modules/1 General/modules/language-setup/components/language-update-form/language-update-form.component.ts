import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { LanguageUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { LANGUAGES_CONFIG } from '../../../../../../../../shared/config/languages.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-language-update-form',
  templateUrl: './language-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageUpdateFormComponent extends DynamicForm<LanguageUpdateInput> {
  languageCodeList: string[] = LANGUAGES_CONFIG;
  defaultFormValue: Partial<LanguageUpdateInput> = {};

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, []],
      code: [null, [Validators.required]],
    });
  }
}
