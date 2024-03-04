import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import { CrudProductRecallService } from '../../../../../../shared/api/auth/crud-product-recall.service';
import { ProductRecallEntity, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@Component({
  selector: 'app-product-recall-details',
  templateUrl: 'product-recall-details.component.html',
  styleUrls: ['product-recall-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallDetailsComponent implements OnInit {
  recall$!: Observable<ProductRecallEntity>;
  dateTimeFormat: string = DATE_TIME_FORMAT;

  constructor(
    private readonly productService: CrudProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly recallService: CrudProductRecallService,
    private readonly breadCrumbs: BreadCrumbService,
  ) {}

  ngOnInit(): void {
    this.recall$ = this.recallService
      .findOne(this.route.snapshot.params['id'], {
        fields: 'productId,startDateTime,endDateTime',
        join: ['reason', 'product||code,name_i18n,productType', 'stores||id'],
      })
      .pipe(
        tap((recall: ProductRecallEntity) => {
          this.breadCrumbs.addBreadCrumbs([
            {
              path: './',
              title: recall.product?.name_i18n ?? '',
            },
          ]);
          const stores: string[] = recall.stores?.map(({ id }: StoreEntity) => id) ?? [];
          if (stores.length > 0) {
            this.route.snapshot.data['stores'] = stores;
            this.route.snapshot.data['hideCreateButton'] = true;
          }
        }),
      );
  }
}
