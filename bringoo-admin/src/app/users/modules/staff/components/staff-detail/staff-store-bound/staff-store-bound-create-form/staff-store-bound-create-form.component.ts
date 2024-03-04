import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { CrudStoreStaffBoundService } from '../../../../../../../../shared/api/auth/crud-store-staff-bound.service';
import { FindUnboundStoresInput, StoreEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';

@UntilDestroy()
@Component({
  selector: 'app-staff-store-bound-create-form',
  templateUrl: './staff-store-bound-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffStoreBoundCreateFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  @Input() set submit(symbol: symbol | undefined) {
    if (symbol) {
      this.onSubmit();
    }
  }

  @Input() showItems: boolean = false;

  staffId: string = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  isLoading$: Observable<boolean> = this.storeService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  nzPageSizeOptions: number[] = [20, 30, 50];
  form!: UntypedFormGroup;
  limit = 20;
  total = 126;

  filterForm: UntypedFormGroup = this.fb.group({
    search: [null],
  });

  storeFilter: BehaviorSubject<FindUnboundStoresInput> = new BehaviorSubject<FindUnboundStoresInput>({
    page: 1,
    limit: 20,
  });

  items: Observable<StoreEntity[] | undefined> = this.storeFilter.asObservable().pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    switchMap(
      (search: FindUnboundStoresInput): Observable<StoreEntity[] | undefined> =>
        this.storeService.findUnboundStores(this.staffId, search).pipe(
          filter((v: Pageable & { items?: StoreEntity[] }) => !!v?.items),
          tap((v: Pageable & { items?: StoreEntity[] }) => (this.total = v.total)),
          map((v: Pageable & { items?: StoreEntity[] }) => v.items),
        ),
    ),
  );

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: FindUnboundStoresInput = {
      ...this.storeFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.storeFilter.next(search);
  }

  onAllChecked(status: boolean, Stores: StoreEntity[]): void {
    for (const { id } of Stores) {
      status ? this.setOfChecked.add(id) : this.setOfChecked.delete(id);
    }
    this.form.patchValue({ storeIds: [...this.setOfChecked] });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ storeIds: [...this.setOfChecked] });
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly storeService: CrudStoreService,
    private readonly route: ActivatedRoute,
    private crudStoreStaffBoundService: CrudStoreStaffBoundService,
  ) {
    this.buildForm();
  }

  onSubmit(): void {
    this.crudStoreStaffBoundService.createManyForStaff(this.form.value).subscribe(() => {
      this.storeFilter.next({ ...this.storeFilter.getValue() });
      this.setOfChecked.clear();
      this.formSubmit.emit(Symbol('a'));
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeIds: [null],
      staffId: [this.staffId, [Validators.required]],
    });

    this.filterForm.valueChanges.pipe(untilDestroyed(this)).subscribe(({ search }: { search: string }) => {
      this.storeFilter.next({
        ...(search && { search }),
        limit: this.limit,
        page: 1,
      });
    });
  }
}
