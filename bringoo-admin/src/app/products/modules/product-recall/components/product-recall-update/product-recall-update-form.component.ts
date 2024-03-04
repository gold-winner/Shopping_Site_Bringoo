import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { CrudProductRecallService } from '../../../../../../shared/api/auth/crud-product-recall.service';
import { ProductRecallEntity, ProductRecallUpdateInput, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-recall-update-form',
  templateUrl: 'product-recall-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallUpdateFormComponent extends DynamicForm<ProductRecallUpdateInput> implements OnInit {
  form!: UntypedFormGroup;

  beforePatch(value: ProductRecallUpdateInput): ProductRecallUpdateInput {
    const patchValues: ProductRecallUpdateInput & any = value;

    this.crudProductRecallService.findOne(patchValues.id, { join: ['stores'] }).subscribe((recall: ProductRecallEntity) => {
      this.form.patchValue({ storeIds: recall?.stores?.map(({ id }: StoreEntity) => id) } || []);
    });

    return patchValues;
  }

  constructor(public readonly crudProductRecallService: CrudProductRecallService, private readonly fb: UntypedFormBuilder) {
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
      storeIds: [null],
    });
  }
}
