import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { StoreProductRecommendationCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-product-recommendation-create-form',
  templateUrl: './product-recommendation-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecommendationCreateFormComponent extends DynamicForm<StoreProductRecommendationCreateInput> implements OnInit {
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      isActive: [true, [Validators.required]],
      storeId: [this.route?.parent?.parent?.snapshot.params['id'], [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      intro_i18n: [null],
      dateStart: [null],
      dateEnd: [null],
    });
  }
}
