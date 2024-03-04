import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { FindUnboundStaffInput, StaffEntity, StoreStaffManyCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { StaffBoundService } from '../../../../../../../../shared/api/auth/staff-bound.service';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-staff-bound-create-form',
  templateUrl: './store-staff-bound-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreStaffBoundCreateFormComponent extends DynamicForm<StoreStaffManyCreateInput> {
  storeId!: string;
  isLoading$: Observable<boolean> = this.staffService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  nzPageSizeOptions: number[] = [20, 30, 50];
  form!: UntypedFormGroup;
  limit = 20;
  total = 126;

  filterForm: UntypedFormGroup = this.fb.group({
    search: [null],
  });

  staffFilter: BehaviorSubject<FindUnboundStaffInput> = new BehaviorSubject<FindUnboundStaffInput>({
    page: 1,
    limit: 20,
  });

  beforeShow(): void {
    this.staffFilter.next({ ...this.staffFilter.getValue(), page: 1 });
  }

  items: Observable<StaffEntity[] | undefined> = this.staffFilter.asObservable().pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    switchMap((search: FindUnboundStaffInput) =>
      this.staffService.findUnboundStaff(this.storeId, search).pipe(
        filter((v: Pageable & { items?: StaffEntity[] }) => !!v?.items),
        tap((v: Pageable & { items?: StaffEntity[] }) => (this.total = v.total)),
        map((v: Pageable & { items?: StaffEntity[] }) => v.items),
      ),
    ),
  );

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: FindUnboundStaffInput = {
      ...this.staffFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.staffFilter.next(search);
  }

  onAllChecked(status: boolean, staff: StaffEntity[]): void {
    for (const { id } of staff) {
      status ? this.setOfChecked.add(id) : this.setOfChecked.delete(id);
    }
    this.form.patchValue({ staffIds: [...this.setOfChecked], storeId: this.storeId });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ staffIds: [...this.setOfChecked], storeId: this.storeId });
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly staffService: StaffBoundService,
    private readonly route: ActivatedRoute,
  ) {
    super();
    this.getStoreId();
    this.buildForm();
  }

  getStoreId(): void {
    this.storeId = this.route.parent?.parent?.snapshot.params['id'];
  }

  buildForm(): void {
    this.form = this.fb.group({
      staffIds: [null],
      storeId: [this.storeId, [Validators.required]],
    });

    this.filterForm.valueChanges.pipe(untilDestroyed(this)).subscribe(({ search }: { search: string }) => {
      this.staffFilter.next({
        ...(search && { search }),
        limit: this.limit,
        page: 1,
      });
    });
  }
}
