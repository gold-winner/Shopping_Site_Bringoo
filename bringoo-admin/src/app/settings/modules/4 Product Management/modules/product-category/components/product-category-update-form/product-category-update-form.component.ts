import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { I18NInput, ProductCategoryUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { mlautsReplace } from '../../../../../../../../shared/helpers/mlauts-replacement';
import { SLUG_PATTERN } from '../../../../../../../../shared/helpers/slug-pattern';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-category-update-form',
  templateUrl: './product-category-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryUpdateFormComponent extends DynamicForm<ProductCategoryUpdateInput> implements OnInit {
  defaultFormValue: Partial<ProductCategoryUpdateInput> = {};

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      code: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      slug: [null, [Validators.pattern(SLUG_PATTERN), Validators.required, Validators.maxLength(400), Validators.minLength(3)]],
      vendorCategoryCode: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.autoSlug();
  }

  autoSlug(): void {
    this.form
      .get('name_i18n')
      ?.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((names: I18NInput) => {
        if (names?.EN) {
          const generatedSlag: string = mlautsReplace(names?.EN)
            .replace(/([\W_])+/g, '-')
            .toLowerCase();

          this.form.get('slug')?.patchValue(generatedSlag);
        }
      });
  }

  beforeSubmit(value: ProductCategoryUpdateInput): ProductCategoryUpdateInput {
    let ind: keyof typeof value;
    for (ind in value) {
      if (value[ind] === null || !this.form.get(ind)?.dirty) delete value[ind];
    }
    return value;
  }
}
