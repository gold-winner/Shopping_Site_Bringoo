import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { tap } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { ProductLinkCartLimitCreateInput, ProductLinkEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-product-link-cart-limit-create-form',
  templateUrl: './store-product-link-cart-limit-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCartLimitCreateFormComponent extends DynamicForm<ProductLinkCartLimitCreateInput> {
  defaultFormValue: Partial<ProductLinkCartLimitCreateInput> = {
    startDateTime: format(new Date(), DATE_TIME_FORMAT),
    cartMaxAmount: 10,
  };

  productLinkInfos: Record<string, string>[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudProductLinkService: CrudProductLinkService,
  ) {
    super();
    this.buildForm();

    this.crudProductLinkService
      .find({
        s: JSON.stringify({
          storeId: this.route.parent?.parent?.snapshot.params['id'],
        }),
        join: ['product'],
      })
      .pipe(
        tap(
          (v: Pageable & { items?: ProductLinkEntity[] }) =>
            v.items &&
            (this.productLinkInfos = v.items.map((entity: ProductLinkEntity) => {
              return {
                id: entity.id,
                productName: entity.product?.name_i18n || '',
              };
            })),
        ),
      )
      .subscribe();
  }

  buildForm(): void {
    this.form = this.fb.group({
      productLinkId: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, [Validators.required]],
      cartMaxAmount: [null, [Validators.required]],
    });
  }
}
