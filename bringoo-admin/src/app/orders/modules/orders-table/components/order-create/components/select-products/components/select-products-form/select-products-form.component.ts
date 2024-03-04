import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FindInput, ProductPriceViewEntity } from '../../../../../../../../../../shared/api/auth/data-contracts';
import { ProductPriceViewService } from '../../../../../../../../../../shared/api/auth/product-price-view.service';
import { Pageable } from '../../../../../../../../../../shared/interfaces/pageable';
import { CondOperator } from '../../../../../../../../../../shared/modules/crud/enums/cond-operator';
import { StoreService } from '../../../services/store-service';

@UntilDestroy()
@Component({
  selector: 'app-select-products-form',
  templateUrl: './select-products-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProductsFormComponent implements OnInit {
  @Input() set submit(s: symbol | undefined) {
    if (s) {
      this.onSubmit();
    }
  }

  @Output() quantity: EventEmitter<Map<string, number>> = new EventEmitter<Map<string, number>>();

  items: ProductPriceViewEntity[] = [];
  isLoading$!: Observable<boolean>;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();

  nzPageSizeOptions: number[] = [20, 30, 50];
  form!: UntypedFormGroup;

  valuesMap: Map<string, number> = new Map<string, number>();

  limit = 20;
  page = 1;
  total = 126;
  join: string[] = ['name_i18n', 'ean'];

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.form = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.quantitiesBuild();
  }

  get quantities(): UntypedFormArray {
    return this.form.get('quantities') as UntypedFormArray;
  }

  quantitiesBuild(): void {
    this.quantities.clear();
    for (const { linkId } of this.items) {
      const control: UntypedFormControl = this.fb.control(linkId && this.setOfChecked.has(linkId) ? this.valuesMap.get(linkId) : 1, []);
      control.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((v: number) => linkId && this.setOfChecked.has(linkId) && this.valuesMap.set(linkId, v));
      this.quantities.push(control);
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const queryParams: FindInput = {
      join: this.join,
      page: params.pageIndex,
      limit: params.pageSize,
      filter: [['storeId', CondOperator.EQUALS, this.storeIdService.storeId].join('||')],
    };
    this.service
      .find({ ...queryParams })
      .pipe(
        untilDestroyed(this),
        tap((v: Pageable & { items?: ProductPriceViewEntity[] }) => v.items && (this.items = [...v.items])),
        tap((v: Pageable & { items?: ProductPriceViewEntity[] }) => (this.total = v.total)),
        tap(() => this.quantitiesBuild()),
      )
      .subscribe();
  }

  onAllChecked(status: boolean): void {
    if (status) {
      for (let index: number = 0; index < this.items.length; index++) {
        const { linkId }: ProductPriceViewEntity = this.items[index];
        if (linkId) {
          this.setOfChecked.add(linkId);
          this.valuesMap.set(linkId, this.quantities.value[index]);
        }
      }
    } else {
      for (const { linkId } of this.items) {
        if (linkId) {
          this.setOfChecked.delete(linkId);
          this.valuesMap.delete(linkId);
        }
      }
    }
  }

  onItemChecked(id: string, status: boolean, index: number): void {
    if (status) {
      this.setOfChecked.add(id);
      this.valuesMap.set(id, this.quantities.value[index]);
    } else {
      this.setOfChecked.delete(id);
      this.valuesMap.delete(id);
    }
  }

  onSubmit(): void {
    this.storeIdService.filterSelectedProducts = [...this.setOfChecked.values()];
    this.quantity.emit(this.valuesMap);
  }

  constructor(public readonly service: ProductPriceViewService, private storeIdService: StoreService, private fb: UntypedFormBuilder) {}
}
