import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { LanguageCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { LANGUAGES_CONFIG } from '../../../../../../../../shared/config/languages.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-language-create-form',
  templateUrl: './language-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCreateFormComponent extends DynamicForm<LanguageCreateInput> {
  languageCodeList: string[] = LANGUAGES_CONFIG;
  defaultFormValue: Partial<LanguageCreateInput> = {
    isActive: true,
  };

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
