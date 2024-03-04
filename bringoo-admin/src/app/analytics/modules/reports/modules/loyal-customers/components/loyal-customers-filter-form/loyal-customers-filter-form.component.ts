import { ChangeDetectionStrategy, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LoyalCustomerInput } from '../../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-loyal-customers-filter-form',
  templateUrl: './loyal-customers-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoyalCustomersFilterFormComponent implements OnInit {
  @Output() salesFilter: EventEmitter<LoyalCustomerInput> = new EventEmitter<LoyalCustomerInput>();
  form!: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getQuery();
  }

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null],
    });

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((filters: LoyalCustomerInput) => {
      this.ngZone.run(() => {
        this.router.navigate([], { queryParams: filters, replaceUrl: true });
      });
      this.salesFilter.emit(filters);
    });
  }

  protected getQuery(): void {
    this.form.patchValue({ ...this.route.snapshot.queryParams });
  }
}
