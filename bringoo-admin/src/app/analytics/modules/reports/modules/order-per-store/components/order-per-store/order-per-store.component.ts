import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AnalyticsOrderPerStoreService } from '../../../../../../../../shared/api/auth/analytics-order-per-store.service';
import {
  AnonymousOrderPerStoreFiltersInput,
  OrderPerStoreAnonymousDto,
  PageableOrderPerStoreAnonymousDto,
  TransferFileTypeEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { saveBlobAsFile } from '../../../../../../../../shared/helpers/file-saver';

@UntilDestroy()
@Component({
  selector: 'app-order-per-store',
  templateUrl: './order-per-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPerStoreComponent implements OnInit {
  filters: BehaviorSubject<AnonymousOrderPerStoreFiltersInput> = new BehaviorSubject<AnonymousOrderPerStoreFiltersInput>({});

  form!: UntypedFormGroup;

  nzPageSizeOptions: number[] = [10, 20, 30, 50];

  fileFormats: TransferFileTypeEnum[] = Object.values(TransferFileTypeEnum);

  isCheckedAll: boolean = false;
  setOfCheckedItems: Set<string> = new Set<string>();

  tableData$!: Observable<PageableOrderPerStoreAnonymousDto>;
  isLoading$: Observable<boolean> = this.service.isLoading$;

  constructor(private readonly service: AnalyticsOrderPerStoreService, private readonly fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.buildTableData();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [],
      dateStart: [],
      dateEnd: [],
    });

    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        tap(({ storeId, dateStart, dateEnd }: AnonymousOrderPerStoreFiltersInput) => {
          const { page, limit }: AnonymousOrderPerStoreFiltersInput = this.filters.getValue();

          this.filters.next({
            ...(storeId && { storeId }),
            ...(dateStart && { dateStart }),
            ...(dateEnd && { dateEnd }),
            ...(page && { page }),
            ...(limit && { limit }),
          });
        }),
      )
      .subscribe();
  }

  onQueryParamsChange({ pageSize, pageIndex }: NzTableQueryParams): void {
    this.filters.next({
      ...this.filters.getValue(),
      page: pageIndex,
      limit: pageSize,
    });
  }

  buildTableData(): void {
    this.tableData$ = this.filters
      .asObservable()
      .pipe(
        switchMap(
          (filters: AnonymousOrderPerStoreFiltersInput): Observable<PageableOrderPerStoreAnonymousDto> =>
            this.service.anonymousOrderPerStore(filters),
        ),
      );
  }

  onCheckChange(id: string, status: boolean): void {
    this.setOfCheckedItems[status ? 'add' : 'delete'](id);
  }

  onCheckAllChange(ordersPerStore: OrderPerStoreAnonymousDto[], status: boolean): void {
    this.isCheckedAll = status;

    for (const orderPerStore of ordersPerStore) {
      this.onCheckChange(orderPerStore.rowIdentifier, status);
    }
  }

  exportFile(fileExt: TransferFileTypeEnum): void {
    const filters: AnonymousOrderPerStoreFiltersInput = this.filters.getValue();

    this.service
      .anonymousOrderPerStoreExport({
        fileExt,
        ...(this.setOfCheckedItems.size > 0 && { identifiers: [...this.setOfCheckedItems.values()] }),
        ...filters,
      })
      .pipe(
        untilDestroyed(this),
        tap((response: any) => {
          const dateRange: string =
            (filters.dateStart && filters.dateEnd && `${filters.dateStart}-${filters.dateEnd}`) ||
            (filters.dateStart && !filters.dateEnd && `after ${filters.dateStart}`) ||
            (!filters.dateStart && filters.dateEnd && `before ${filters.dateEnd}`) ||
            '';

          saveBlobAsFile(
            response,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
            `order per store${dateRange}.${fileExt}`,
          );
        }),
      )
      .subscribe();
  }
}
