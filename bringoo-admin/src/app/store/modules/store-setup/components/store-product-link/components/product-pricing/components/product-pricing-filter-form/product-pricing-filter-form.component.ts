import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { take } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../../../../shared/api/auth/crud-product-link.service';
import { FindInput, ProductLinkEntity } from '../../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { StoreDetailsService } from '../../../../../../../../services/store-details.service';

@UntilDestroy()
@Component({
  selector: 'app-product-pricing-filter-form',
  templateUrl: './product-pricing-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPricingFilterFormComponent extends DynamicFilterFormComponent {
  productLinkId: string;
  storeCode: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly storeDetailsBreadService: StoreDetailsService,
    private readonly crudProductLinkService: CrudProductLinkService,
  ) {
    super();
    this.productLinkId = this.route.snapshot.params['id'];

    if (this.productLinkId) {
      this.crudProductLinkService
        .findOne(this.productLinkId, { fields: 'id', join: ['product||name_i18n', 'store||code'] })
        .pipe(take(1))
        .subscribe(({ product, store }: ProductLinkEntity) => {
          this.storeCode = store?.code ?? '';
          this.setBreadCrumbs(product?.name_i18n ?? 'Product price');
        });
      this.setBreadCrumbs('');
    }
  }

  setBreadCrumbs(name: string): void {
    this.storeDetailsBreadService.breadcrumbs = [
      {
        path: `../`,
        title: `${name}`,
      },
    ];
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search } as any);
    const $and: any[] = [];

    if (this.productLinkId) {
      $and.push({ productLinkId: this.productLinkId });
    }
    if (search) {
      $and.push({
        $or: [
          {
            'productLink.product.name_i18n': { $contL: search },
          },
        ],
      });
    }
    return { s: JSON.stringify({ $and }) };
  }
}
