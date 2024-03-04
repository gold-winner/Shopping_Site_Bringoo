import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnalyticsOpsTeamService } from '../../../../../../shared/api/auth/analytics-ops-team.service';
import {
  AnalyticsOpsTeamDashboardDto,
  AnalyticsOpsTeamDashboardInput,
  OpsTeamDashboardOrderFieldEnum,
  OrderedEnum,
  PageableAnalyticsOpsTeamDashboardDto,
} from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-ops-team-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'ops-team-dashboard.component.html',
  host: { class: 'd-block w-100p h-100p p-8' },
})
export class OpsTeamDashboardComponent implements OnInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('title') title!: ElementRef<HTMLDivElement>;
  @ViewChild('filters') filters!: ElementRef<HTMLDivElement>;
  opsTeamDashboardOrderFieldEnum: typeof OpsTeamDashboardOrderFieldEnum = OpsTeamDashboardOrderFieldEnum;

  paginationContainer?: HTMLElement;
  searchSubject: BehaviorSubject<AnalyticsOpsTeamDashboardInput> = new BehaviorSubject<AnalyticsOpsTeamDashboardInput>({
    limit: 20,
    page: 1,
  });

  nzScroll: BehaviorSubject<{ x: string; y: string }> = new BehaviorSubject<{ x: string; y: string }>({
    x: 'auto',
    y: 'auto',
  });

  init: boolean = true;

  items!: AnalyticsOpsTeamDashboardDto[];
  isLoading$: Observable<boolean> = this.service.isLoading$;

  limit: number = 20;
  page: number = 1;
  total: number = 0;
  totalPages: number = 0;

  constructor(private readonly service: AnalyticsOpsTeamService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(switchMap((input: AnalyticsOpsTeamDashboardInput) => this.service.dashboard(input)))
      .subscribe(({ items, total, pageCount }: PageableAnalyticsOpsTeamDashboardDto) => {
        this.total = total;
        this.totalPages = pageCount;
        this.items = [...items];

        if (this.init) {
          this.resizeTable();
          this.init = false;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resizeTable();
  }

  resizeTable(): void {
    if (!this.paginationContainer) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.paginationContainer = this.container.nativeElement.querySelector('.ant-table-pagination')!;
    }

    const crud_container: HTMLDivElement = this.container.nativeElement as HTMLDivElement;

    const styles: CSSStyleDeclaration = window.getComputedStyle(crud_container);
    const crudTopPadding: number = Number.parseFloat(styles.getPropertyValue('padding-top'));
    const crudBottomPadding: number = Number.parseFloat(styles.getPropertyValue('padding-bottom'));

    const paginationContainerHeight: number = (this.paginationContainer?.offsetHeight ?? 24) + 16 * 2;
    const table_headerHeight: number = (crud_container.querySelector('.ant-table-header') as HTMLDivElement).offsetHeight;

    const titleHeight: number = this.title?.nativeElement?.offsetHeight ?? 0;
    const filtersHeight: number = this.filters?.nativeElement?.offsetHeight ?? 0;

    const maxHeight: number = crud_container.offsetHeight - crudTopPadding - crudBottomPadding;
    const tableHeight: number = maxHeight - (paginationContainerHeight + table_headerHeight + titleHeight + filtersHeight);

    this.nzScroll.next({
      x: '1600px',
      y: `${tableHeight}px`,
    });
  }

  onQueryParamsChange({
    pageIndex,
    pageSize,
    sort: sortParams,
  }: NzTableQueryParams & { sort: Array<{ key: any; value: NzTableSortOrder }> }): void {
    this.page = pageIndex;
    this.limit = pageSize;

    const sort:
      | {
          key: OpsTeamDashboardOrderFieldEnum;
          value: NzTableSortOrder;
        }
      | undefined = sortParams.filter(({ value }: { key: OpsTeamDashboardOrderFieldEnum; value: NzTableSortOrder }) => value).pop();

    const { limit, page, order, orderField, ...filters } = this.searchSubject.getValue();

    this.searchSubject.next({
      ...filters,
      page: pageIndex,
      limit: pageSize,
      ...(sort && {
        orderField: sort.key,
        order: sort.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC,
      }),
    });
  }

  onFiltersUpdate(filters: Omit<AnalyticsOpsTeamDashboardInput, 'page' | 'limit' | 'order' | 'orderField'>): void {
    const { page, limit, order, orderField } = this.searchSubject.getValue();

    this.searchSubject.next({
      page,
      limit,
      ...(order && { order }),
      ...(orderField && { orderField }),
      ...filters,
    });
  }
}
