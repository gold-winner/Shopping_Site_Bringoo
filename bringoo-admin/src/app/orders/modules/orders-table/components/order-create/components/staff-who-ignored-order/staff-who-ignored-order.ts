import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudStaffService } from '../../../../../../../../shared/api/auth/crud-staff.service';
import { FindInput, StaffEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../../../shared/helpers/user-search-filter';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-staff-who-ignored-order',
  templateUrl: './staff-who-ignored-order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffWhoIgnoredOrder implements OnInit {
  @Input() orderId: string = '';
  @Input() set ignored(ids: string[] | undefined) {
    if (ids) {
      this.ignoreList.next(ids);
    }
  }

  @Output() reloadPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  ignoreList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  isLoading$: Observable<boolean> = this.service.isLoading$;
  checkedPage: boolean = false;
  items: StaffEntity[] = [];
  limit: number = 20;
  findInput: FindInput = {
    limit: this.limit,
    join: ['settings'],
    page: 1,
  };

  page$: Observable<Pageable & { items?: StaffEntity[] }> = this.ignoreList.asObservable().pipe(
    switchMap(
      (ids: string[]): Observable<Pageable & { items?: StaffEntity[] }> => {
        if (ids.length === 0) {
          return of({ items: [], page: 1, pageCount: 0, count: 0, total: 0 });
        }
        return this.service.find({
          filter: [`id||${CondOperator.IN}||${ids.join(',')}`],
          ...this.findInput,
          softDelete: true,
        });
      },
    ),
    tap(({ items }: Pageable & { items?: StaffEntity[] }) => {
      if (items) this.items = items;
    }),
  );

  setOfChecked: Set<string> = new Set<string>();
  search: UntypedFormControl = new UntypedFormControl(null);

  constructor(private readonly service: CrudStaffService, private readonly orderService: CrudOrderService) {}

  onAllChecked(status: boolean): void {
    if (status) {
      for (const v of this.items) {
        v.id && this.setOfChecked.add(v.id);
      }
    } else {
      for (const v of this.items) {
        v.id && this.setOfChecked.delete(v.id);
      }
    }
  }

  onItemChecked(value: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(value);
    } else {
      this.setOfChecked.delete(value);
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const sort: string[] = params.sort
      .flatMap(({ key, value }: { key: string; value: NzTableSortOrder }): string | string[] => {
        if (key.includes(',')) {
          return !value ? '' : key.split(',').map((field: string) => `${field},${value === 'ascend' ? 'ASC' : 'DESC'}`);
        }
        return value ? `${key},${value === 'ascend' ? 'ASC' : 'DESC'}` : '';
      })
      .filter((v: string) => v !== '');

    this.findInput = {
      ...this.findInput,
      ...(sort.length > 0 && { sort }),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.limit = params.pageSize;

    this.ignoreList.next([...this.ignoreList.getValue()]);
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(untilDestroyed(this), debounceTime(500)).subscribe((search: string) => {
      const $and: any[] = [{ id: { $in: this.ignoreList.getValue() } }];

      if (search) {
        $and.push({ $or: [...UserSearchFilter(search, 'settings'), { 'settings.staffNumber': { $contL: search } }] });
      }

      this.findInput = {
        ...this.findInput,

        s: JSON.stringify({
          $and,
        }),
      };
      this.ignoreList.next([...this.ignoreList.getValue()]);
    });
  }

  deleteFromIgnoreList(): void {
    this.orderService
      .removeStaffFromIgnoreList({ orderId: this.orderId, staffIds: [...this.setOfChecked] })
      .pipe()
      .subscribe((values: string[]) => {
        this.setOfChecked.clear();
        this.reloadPage.emit(true);
        this.ignoreList.next(values);
      });
  }
}
