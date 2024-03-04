import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select/select.types';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, skip, switchMap, take, tap } from 'rxjs/operators';

import { FindInput, Pageable } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { uuid } from '../../helpers/uuid';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { FilterSearch } from '../../types/crud-filters.types';

@UntilDestroy()
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> extends CustomControlComponent implements OnInit, OnDestroy {
  control: UntypedFormControl = new UntypedFormControl();
  @Input()
  cid: string = uuid();

  total: number = 0;

  @Input() required: boolean = false;
  @Input() method: string = 'find';
  @Input() suffix: string = '';
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';

  @Input() placeHolder: string = '';
  @Input() softDelete: boolean | undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  writeValue(val: string | string[]): void {
    if ((this.type === 'multiple' || this.type === 'tags') && !Array.isArray(val)) {
      val = [val];
    }

    if (val === null || val?.length === 0) {
      this.control.reset();
    } else {
      this.loadSelectedValues(val);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {}

  @Input() set options(options: SelectOptions<T>) {
    this.selectOptions = options;
    this.findSubject = new BehaviorSubject<FindInput>({
      page: 1,
      limit: 50,
      //TODO remove as
      ...(options.join && { join: options.join as string[] }),
      ...(options.sort && { sort: options.sort }),
      filter: options.filter || [],
      fields: options.fields.join(','),
      ...(this.softDelete && { softDelete: this.softDelete }),
      ...(options.filterForS && { s: JSON.stringify({ $and: options.filterForS }) }),
    });
    this.subscribeOnSubject();
  }

  selectOptions!: SelectOptions<T>;
  private pageCount: number = 10000;
  optionList: NzSelectOptionInterface[] = [];

  findSubject!: BehaviorSubject<FindInput>;
  private findSubscription: Subscription | undefined;

  onSelectOpenChange(open: boolean): void {
    if (open) {
      this.findSubject.next({
        ...this.findSubject.getValue(),
        page: 1,
      });
    }
  }

  onScrollBottom(): void {
    const currentValue: FindInput = this.findSubject.getValue();
    const page: number = currentValue.page ? currentValue.page + 1 : 1;
    if (page <= this.pageCount) {
      this.findSubject.next({
        ...currentValue,
        page: currentValue.page ? currentValue.page + 1 : 1,
      });
    }
  }

  loadSelectedValues(value: string | string[]): void {
    const values: string[] = Array.isArray(value) ? value : [value];
    const loaded: Set<string> = new Set(this.optionList.map(({ value }: NzSelectOptionInterface) => value));

    if (values.every((v: string) => loaded.has(v))) {
      this.control.setValue(value);
      return;
    }

    const search: string = JSON.stringify({
      [this.selectOptions.valueKey]: { [CondOperator.IN]: values },
    });

    this.selectOptions.service
      .find({ s: search, limit: 10000, page: 1, fields: this.selectOptions.fields.join(',') })
      .pipe(untilDestroyed(this), take(1))
      .subscribe((pageable: Pageable & { items?: T[] }) => {
        if (!pageable || !pageable.items?.length) {
          return;
        } else {
          this.total = pageable.total;
          this.optionList = this.mapItems(pageable.items);
          this.control.setValue(value);
        }
      });
  }

  subscribeOnSubject(): void {
    this.findSubscription?.unsubscribe();
    this.optionList = [];
    this.findSubscription = this.findSubject
      .asObservable()
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        switchMap((queryParams: FindInput) => this.selectOptions.service.find({ ...queryParams })),
      )
      .subscribe((pageable: Pageable & { items?: T[] }) => {
        this.pageCount = pageable.pageCount;
        this.total = pageable.total;
        if (pageable.items) {
          this.optionList = pageable.page === 1 ? this.mapItems(pageable.items) : [...this.optionList, ...this.mapItems(pageable.items)];
        }
      });
  }

  private mapItems(items: T[]): NzSelectOptionInterface[] {
    return items.map((item: T) => ({
      value: `${item[this.selectOptions.valueKey]}`,
      label: this.selectOptions.getLabel(item),
    }));
  }

  ngOnDestroy(): void {
    if (this.findSubscription) {
      this.findSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged(), skip(1)).subscribe((value: T) => this.onChange(value));
  }

  onSelectAll(): void {
    this.selectOptions.service
      .find({ ...this.findSubject.getValue(), page: 1, limit: this.total })
      .pipe(
        map((pageable: Pageable & { items?: T[] }): NzSelectOptionInterface[] => {
          return pageable.items ? this.mapItems(pageable.items) : [];
        }),
        tap((options: NzSelectOptionInterface[]) => (this.optionList = options)),
        map((options: NzSelectOptionInterface[]) => options.map(({ value }: NzSelectOptionInterface) => value)),
        tap((values: any[]) => this.control.patchValue(values)),
      )
      .subscribe();
  }

  onClearAll(): void {
    this.control.patchValue([]);
  }

  onSearch(term: string): void {
    let filter: string[] = [],
      or: string[] = [],
      s: string = '';

    //todo remove this if block when SelectOptions.search will be removed
    if (this.selectOptions.search) {
      const findInput: Required<Pick<FindInput, 'filter' | 'or'>> = this.onFilterOld(term, this.selectOptions.search);
      filter = findInput.filter;
      or = findInput.or;
    }

    if (this.selectOptions.searchForS) {
      const findInput: Required<Pick<FindInput, 's'>> = this.onFilter(term, this.selectOptions.searchForS);
      s = findInput.s;
    }

    this.findSubject.next({
      ...this.findSubject.getValue(),
      //todo remove filter & or field
      ...(filter && { filter }),
      ...(or && { or }),
      ...(s && { s }),
      page: 1,
    });
  }

  /**
   * @deprecated
   * todo remove
   */
  private onFilterOld(term: string, searchFunc: Required<SelectOptions<T>>['search']): Required<Pick<FindInput, 'filter' | 'or'>> {
    let filter: string[] = this.selectOptions.filter || [];
    let or: string[] = [];

    if (term) {
      const [search, ...orSearch]: string[] = searchFunc(term);
      if (orSearch?.length > 0) {
        or = [...filter, ...orSearch];
      }
      filter = [...filter, search];
    }
    return {
      or,
      filter,
    };
  }

  private onFilter(term: string, searchFunc: Required<SelectOptions<T>>['searchForS']): Required<Pick<FindInput, 's'>> {
    const searchFilters: FilterSearch<T>[] = searchFunc(term);
    const filters: FilterSearch<T>[] = this.selectOptions.filterForS ?? [];

    if (searchFilters.length === 0 && filters.length === 0) return { s: '' };

    return {
      s: JSON.stringify({
        $and: [...filters, ...searchFilters],
      }),
    };
  }
}
