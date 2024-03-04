import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppManagerPriceRequestService } from '../../../../../../shared/api/auth/app-manager-price-request.service';
import { CrudProductPriceRequestService } from '../../../../../../shared/api/auth/crud-product-price-request.service';
import { PriceTypeEnum, ProductPriceEntity, ProductPriceRequestEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-product-price-approve',
  templateUrl: 'product-price-approve.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPriceApproveComponent extends DynamicForm<ProductPriceRequestEntity> {
  constructor(
    private fb: UntypedFormBuilder,
    private readonly service: CrudProductPriceRequestService,
    private readonly appManagerPriceRequestService: AppManagerPriceRequestService,
  ) {
    super();
    this.buildForm();
  }

  priceRequest$!: Observable<ProductPriceRequestEntity>;
  oldPrice$!: Observable<{ salePrice: number; regularPrice: number }>;
  dateFormat: string = DATE_FORMAT;
  typeOfPrice: string[] = Object.values(PriceTypeEnum);
  requestId!: string;
  isLoading$: Observable<boolean> = this.appManagerPriceRequestService.isLoading$;

  beforePatch(value: ProductPriceRequestEntity): ProductPriceRequestEntity {
    this.requestId = value.id;
    this.loadRequest();
    return super.beforePatch(value);
  }

  buildForm(): void {
    this.form = this.fb.group({
      newPrice: [null],
      dateStart: [null],
      dateEnd: [null],
      type: [null],
    });
  }

  loadRequest(): void {
    this.priceRequest$ = this.service.findOne(this.requestId, {
      join: [
        'productLink',
        'productLink.product||name_i18n,defaultPrice',
        'productLink.store||name_i18n',
        'productLink.prices',
        'staff||id',
        'staff.settings||firstName,lastName',
      ],
    });

    this.oldPrice$ = this.priceRequest$.pipe(
      map((item: ProductPriceRequestEntity): { salePrice: number; regularPrice: number } => {
        const salePrice: number =
          item.productLink?.prices?.find(({ type }: ProductPriceEntity) => type === PriceTypeEnum.SALE)?.price ??
          item.productLink?.product?.defaultPrice ??
          0;

        const regularPrice: number =
          item.productLink?.prices?.find(({ type }: ProductPriceEntity) => type === PriceTypeEnum.REGULAR)?.price ??
          item.productLink?.product?.defaultPrice ??
          0;
        return {
          salePrice,
          regularPrice,
        };
      }),
    );
  }

  approveRequest(): void {
    this.appManagerPriceRequestService
      .approvePriceRequest(this.requestId, this.form.value)
      .pipe(tap(() => this.loadRequest()))
      .subscribe();
  }

  updateRequest(): void {
    this.appManagerPriceRequestService
      .updatePriceRequest(this.requestId, this.form.value)
      .pipe(tap(() => this.loadRequest()))
      .subscribe();
  }

  rejectRequest(): void {
    this.appManagerPriceRequestService
      .rejectPriceRequest(this.requestId)
      .pipe(tap(() => this.loadRequest()))
      .subscribe();
  }
}
