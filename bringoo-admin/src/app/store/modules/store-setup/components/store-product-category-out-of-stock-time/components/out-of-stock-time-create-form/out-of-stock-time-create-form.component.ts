import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudStoreProductCategoryOutOfStockTimeService } from '../../../../../../../../shared/api/auth/crud-store-product-category-out-of-stock-time.service';
import {
  Pageable,
  StoreProductCategoryOutOfStockTimeCreateInput,
  StoreProductCategoryOutOfStockTimeEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-product-category-out-of-stock-time-create-form',
  templateUrl: './out-of-stock-time-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductCategoryOutOfStockTimeCreateFormComponent extends DynamicForm<StoreProductCategoryOutOfStockTimeCreateInput> {
  storeId: string = this.route.parent?.parent?.snapshot.params['id'];

  defaultFormValue: Partial<StoreProductCategoryOutOfStockTimeCreateInput> = {
    storeId: this.storeId,
  };

  assignedProductCategoryCodes$!: Observable<string[]>;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    public readonly crudService: CrudStoreProductCategoryOutOfStockTimeService,
  ) {
    super();

    this.assignedProductCategoryCodes$ = this.crudService
      .find({
        s: JSON.stringify({
          $and: [{ storeId: this.storeId }],
        }),
      })
      .pipe(
        map(({ items }: Pageable & { items?: StoreProductCategoryOutOfStockTimeEntity[] }) => items || []),
        map((items: StoreProductCategoryOutOfStockTimeEntity[]) =>
          items.map(({ productCategoryCode }: StoreProductCategoryOutOfStockTimeEntity) => productCategoryCode),
        ),
      );

    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      productCategoryCode: [null, [Validators.required]],
      productOutOfStockTime: [null, [Validators.required]],
    });
  }
}
