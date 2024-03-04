import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { Pageable, ProductPriceViewEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { ProductPriceViewService } from '../../../../../../../../shared/api/auth/product-price-view.service';
import { StoreService } from '../services/store-service';

@UntilDestroy()
@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProductsComponent implements OnInit {
  @Output() receipt: EventEmitter<{ subtotal: number; taxes: number }> = new EventEmitter<{ subtotal: number; taxes: number }>();
  openPanel: boolean = false;

  nzPageSizeOptions: number[] = [10, 20, 30];
  limit: number = 10;
  items: ProductPriceViewEntity[] = [];
  isLoading$!: Observable<boolean>;
  page: number = 1;

  submitSymbol: symbol | undefined;
  quantity: Map<string, number> = new Map<string, number>();

  onSubmit(): void {
    this.submitSymbol = Symbol('f');
    this.openPanel = false;
  }

  onCloseDrawer(): void {
    this.submitSymbol = undefined;
    this.openPanel = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.store.productsFilter$
      .pipe(
        untilDestroyed(this),
        filter<string[]>((v: string[]) => v.length > 0),
        switchMap((v: string[]) => {
          const filters: string[] = v.map((v: string) => ['linkId', '$eq', v].join('||'));
          return this.service.find({ or: filters });
        }),
      )
      .pipe(
        untilDestroyed(this),
        tap((v: Pageable & { items?: ProductPriceViewEntity[] }) => v.items && (this.items = v.items)),
        tap(() => this.checkShow()),
      )
      .subscribe();
  }

  checkShow(): void {
    // { subtotal: number; taxes: number }
    this.receipt.emit(
      this.items.reduce(
        (acc: { subtotal: number; taxes: number }, { productVatValue, price }: ProductPriceViewEntity) => ({
          subtotal: acc.subtotal + (price ?? 0),
          taxes: acc.taxes + (productVatValue ?? 0),
        }),
        { subtotal: 0, taxes: 0 },
      ),
    );
  }

  constructor(public readonly service: ProductPriceViewService, public readonly store: StoreService) {}
}
