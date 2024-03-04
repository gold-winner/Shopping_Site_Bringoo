import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CrudCorporateService } from '../../../../../../shared/api/auth/crud-corporate.service';
import { CorporateEntity, StoreBrandCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-product-brand-create-form',
  templateUrl: './create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent extends DynamicForm<StoreBrandCreateInput> {
  defaultFormValue: Partial<StoreBrandCreateInput> = {
    isActive: true,
  };

  corporateSelect: SelectOptions<CorporateEntity> = {
    service: this.crudCorporateService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: CorporateEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private fb: UntypedFormBuilder, private readonly crudCorporateService: CrudCorporateService) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      imageUrl: [null],
      isActive: [true, [Validators.required]],
      code: [null, [Validators.required]],
      corporateCode: [null],
    });
  }
}
