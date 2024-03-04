import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { add, format } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AnalyticsProductSearchService } from '../../api/auth/analytics-product-search.service';
import { ProductSearchTermsDto } from '../../api/auth/data-contracts';
import { DATE_FORMAT } from '../../config/constants.config';

@Component({
  selector: 'app-popular-search',
  templateUrl: 'popular-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block scroll-y' },
})
export class PopularSearchComponent implements OnInit {
  @Input() storeId: string | undefined;
  @Input() useDateLimits: boolean = false;
  @Input() daysLimit: number = 0;

  total: number = 1;
  count: number = 1;

  page: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  productSearchTerm$!: Observable<ProductSearchTermsDto>;

  constructor(private readonly analyticsProductSearch: AnalyticsProductSearchService) {}

  ngOnInit(): void {
    this.productSearchTerm$ = this.page.asObservable().pipe(
      switchMap(
        (page: number): Observable<ProductSearchTermsDto> =>
          this.analyticsProductSearch.getProductSearchTerm({
            ...(this.storeId && { storeId: this.storeId }),
            limit: 10,
            ...(this.useDateLimits && {
              dateStart: format(new Date(), DATE_FORMAT),
              dateEnd: format(add(new Date(), { days: -this.daysLimit }), DATE_FORMAT),
            }),
            page,
          }),
      ),
      tap(({ total, items }: ProductSearchTermsDto) => {
        this.total = total;
        this.count = items.length;
      }),
    );
  }

  changePage(index: number): void {
    this.page.next(index);
  }
}
