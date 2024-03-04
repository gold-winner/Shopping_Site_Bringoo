import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { tap } from 'rxjs/operators';

import { CrudProductCategoryService } from '../../../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../../../shared/api/auth/crud-product-subcategory.service';
import { SalesProductsInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { getDayMonthAgo } from '../../../../../../../../shared/helpers/day-month-ago';

@UntilDestroy()
@Component({
  selector: 'app-sales-products-filter-form',
  templateUrl: './sales-products-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesProductsFilterFormComponent implements OnInit {
  @Output() salesFilter: EventEmitter<SalesProductsInput> = new EventEmitter<SalesProductsInput>();
  form!: UntypedFormGroup;

  dateStart: Date = getDayMonthAgo(new Date());
  dateEnd: Date = new Date();

  dateFormat: string = DATE_FORMAT;
  dateTimeFormat: string = DATE_TIME_FORMAT;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private crudProductCategoryService: CrudProductCategoryService,
    private crudProductSubcategoryService: CrudProductSubcategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getQuery();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null],
      storeId: [null],
      categoryCode: [null],
      subcategoryCode: [null],
      dateStart: [null],
      dateEnd: [null],
    });

    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((filters: SalesProductsInput) => this.router.navigate([], { queryParams: filters, replaceUrl: true })),
      )
      .subscribe((filters: SalesProductsInput) => {
        this.salesFilter.emit(filters);
      });
  }

  protected getQuery(): void {
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      this.form.patchValue({ ...this.route.snapshot.queryParams });
    } else {
      this.form.patchValue({ dateStart: format(this.dateStart, this.dateFormat), dateEnd: format(this.dateEnd, this.dateFormat) });
    }
  }
}
