import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import {
  OrderedEnum,
  OrderStatusEnum,
  Pageable,
  ProductRecallEntity,
  ProductRecallReasonDto,
  ProductRecallReportsFiltersInput,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { ProductRecallService } from '../../../../../../shared/api/auth/product-recall.service';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { saveBlobAsFile } from '../../../../../../shared/helpers/file-saver';
import { RemoveNullFieldsFromObject } from '../../../../../../shared/helpers/remove-null-fields-from-object';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

type filterType = {
  dateStart?: string;
  dateEnd?: string;
  storeIds?: string[];
  orderNumber?: string;
  orderStatus?: OrderStatusEnum;
  order?: OrderedEnum;
  orderField?: string;
  page?: number;
  limit?: number;
};

type FormGroupType = ToFormGroupType<filterType>;

@Component({
  selector: 'app-product-recall-report',
  templateUrl: 'product-recall-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecallReportComponent implements AfterViewInit {
  @Input() productCode!: string;
  orderStatuses: string[] = Object.values(OrderStatusEnum);
  dateFormat: string = DATE_FORMAT;
  @Input() filter: ProductRecallEntity | null = null;

  filterForm: FormGroup<FormGroupType> = new FormGroup<FormGroupType>({
    dateStart: new FormControl(null),
    dateEnd: new FormControl(null),
    storeIds: new FormControl(null),
    orderNumber: new FormControl(null),
    orderStatus: new FormControl(null),
    order: new FormControl(null),
    orderField: new FormControl(null),
    page: new FormControl(1),
    limit: new FormControl(20),
  });

  recallReport$!: Observable<Pageable & { items?: ProductRecallReasonDto[] }>;
  isLoading$: Observable<boolean> = this.service.isLoading$;

  defaultSort: Pick<ProductRecallReportsFiltersInput, 'orderField' | 'order'> = {
    order: OrderedEnum.ASC,
    orderField: 'deliveryDate',
  };

  constructor(private readonly fb: UntypedFormBuilder, private readonly service: ProductRecallService) {
    this.recallReport();
  }

  ngAfterViewInit(): void {
    this.loadDefaultValues();
  }

  recallReport(): void {
    this.recallReport$ = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      switchMap(
        (formValue: typeof this.filterForm.value): Observable<Pageable & { items?: ProductRecallReasonDto[] }> => {
          return this.service.reports(this.productCode, RemoveNullFieldsFromObject({ ...formValue }) as ProductRecallReportsFiltersInput);
        },
      ),
    );
  }

  loadDefaultValues(): void {
    this.filterForm.patchValue({
      ...this.defaultSort,
      ...(this.filter && {
        dateStart: format(new Date(this.filter.startDateTime), DATE_FORMAT),
        ...(this.filter.endDateTime && { dateEnd: format(new Date(this.filter.endDateTime), DATE_FORMAT) }),
        ...(this.filter.stores && { storeIds: this.filter.stores.map(({ id }: StoreEntity) => id) ?? [] }),
      }),
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const pagination: Pick<ProductRecallReportsFiltersInput, 'page' | 'limit'> = {
      page: params.pageIndex,
      limit: params.pageSize,
    };

    const sort: { key: string; value: NzTableSortOrder } | undefined = params.sort
      .filter(({ value }: { key: string; value: NzTableSortOrder }) => value)
      .pop();
    if (sort) {
      this.filterForm.patchValue({
        order: sort.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC,
        orderField: sort.key,
        ...pagination,
      });
    } else {
      this.filterForm.patchValue({ ...this.defaultSort, ...pagination });
    }
  }

  onExport(fileExt: string): void {
    const filters: ProductRecallReportsFiltersInput = RemoveNullFieldsFromObject({
      ...this.filterForm.value,
    }) as ProductRecallReportsFiltersInput;

    this.service
      .export(this.productCode, {
        fileExt,
        ...filters,
      })
      .pipe(
        tap((response: any) => {
          saveBlobAsFile(
            response,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
            `product-recall-report-${this.productCode}-${filters.dateStart}${
              filters.dateEnd ? filters.dateEnd : ''
            }.${fileExt.toLowerCase()}`,
          );
        }),
      )
      .subscribe();
  }
}
