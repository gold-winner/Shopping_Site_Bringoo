import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import { ProductRecallCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-recall-create-form',
  templateUrl: 'product-recall-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallCreateFormComponent extends DynamicForm<ProductRecallCreateInput> implements OnInit {
  form!: UntypedFormGroup;

  constructor(public readonly crudProductService: CrudProductService, private readonly fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, [Validators.required]],
      reasonCode: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      storeIds: [[]],
    });
  }
}
