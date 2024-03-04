import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { I18NInput, ProductSubcategoryUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { mlautsReplace } from '../../../../../../../../shared/helpers/mlauts-replacement';
import { SLUG_PATTERN } from '../../../../../../../../shared/helpers/slug-pattern';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-subcategory-update-form',
  templateUrl: './product-subcategory-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSubcategoryUpdateFormComponent extends DynamicForm<ProductSubcategoryUpdateInput> implements OnInit {
  defaultFormValue: Partial<ProductSubcategoryUpdateInput> = {
    categoryCode: this.route.parent?.snapshot.url[0].path,
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      categoryCode: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      code: [null, [Validators.required]],
      imageUrl: [null, Validators.required],
      isActive: [null],
      slug: [null, [Validators.pattern(SLUG_PATTERN), Validators.required, Validators.maxLength(400), Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.autoSlug();
  }

  autoSlug(): void {
    this.form
      .get('name_i18n')
      ?.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(({ EN }: I18NInput) => {
        if (EN) {
          const generatedSlag: string = mlautsReplace(EN)
            .replace(/([\W_])+/g, '-')
            .toLowerCase();

          this.form.get('slug')?.patchValue(generatedSlag);
        }
      });
  }
}
