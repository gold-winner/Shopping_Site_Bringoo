import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import {
  FindUnusedLoyaltyProgramsInput,
  LoyaltyProgramEntity,
  StoreLoyaltyProgramManyCreateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { StoreLoyaltyProgramService } from '../../../../../../../../shared/api/auth/store-loyalty-program.service';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { AppLanguageService } from '../../../../../../../../shared/services/app-language.service';

type LoyaltyProgramEntityExtend = LoyaltyProgramEntity & { name: string };

@UntilDestroy()
@Component({
  selector: 'app-store-product-management-create-form',
  templateUrl: './store-loyalty-program-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreLoyaltyProgramCreateFormComponent extends DynamicForm<StoreLoyaltyProgramManyCreateInput> {
  storeId!: string;
  isLoading$: Observable<boolean> = this.storeLoyaltyProgramService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  nzPageSizeOptions: number[] = [20, 30, 50];
  form!: UntypedFormGroup;
  limit = 20;
  total = 126;

  filterForm: UntypedFormGroup = this.fb.group({
    search: [null],
  });

  loyaltyProgramFilter: BehaviorSubject<FindUnusedLoyaltyProgramsInput> = new BehaviorSubject<FindUnusedLoyaltyProgramsInput>({
    page: 1,
    limit: 20,
  });

  beforeShow(): void {
    this.loyaltyProgramFilter.next({ ...this.loyaltyProgramFilter.getValue(), page: 1 });
  }

  items: Observable<LoyaltyProgramEntityExtend[] | undefined> = this.loyaltyProgramFilter.asObservable().pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    switchMap((search: FindUnusedLoyaltyProgramsInput) =>
      this.storeLoyaltyProgramService.findUnusedLoyaltyPrograms(this.storeId, search).pipe(
        filter((v: Pageable & { items?: LoyaltyProgramEntity[] }) => !!v?.items),
        tap((v: Pageable & { items?: LoyaltyProgramEntity[] }) => {
          this.total = v.total;
        }),
        map((v: Pageable & { items?: LoyaltyProgramEntity[] }) => {
          const items: LoyaltyProgramEntityExtend[] | undefined = v.items as LoyaltyProgramEntityExtend[] | undefined;

          for (const item of items || []) {
            const name_i18n: Record<string, string> = (item?.name_i18n as unknown) as Record<string, string>;
            item.name = name_i18n[this.appLanguageService.language] || '';
          }

          return v.items as LoyaltyProgramEntityExtend[] | undefined;
        }),
      ),
    ),
  );

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: FindUnusedLoyaltyProgramsInput = {
      ...this.loyaltyProgramFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.loyaltyProgramFilter.next(search);
  }

  onAllChecked(status: boolean, loyaltyPrograms: LoyaltyProgramEntity[]): void {
    for (const { id } of loyaltyPrograms) {
      status ? this.setOfChecked.add(id) : this.setOfChecked.delete(id);
    }
    this.form.patchValue({ loyaltyProgramIds: [...this.setOfChecked], storeId: this.storeId });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ loyaltyProgramIds: [...this.setOfChecked], storeId: this.storeId });
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    public readonly storeLoyaltyProgramService: StoreLoyaltyProgramService,
    private readonly route: ActivatedRoute,
    private readonly appLanguageService: AppLanguageService,
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
      loyaltyProgramIds: [null],
      storeId: [this.storeId, [Validators.required]],
    });

    this.filterForm.valueChanges.pipe(untilDestroyed(this)).subscribe(({ search }: { search: string }) => {
      this.loyaltyProgramFilter.next({
        ...(search && { search }),
        limit: this.limit,
        page: 1,
      });
    });
  }
}
