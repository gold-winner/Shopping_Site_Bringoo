import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { CrudStaffService } from '../../../../../../../shared/api/auth/crud-staff.service';
import { StaffEntity, StaffUpdateInput } from '../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../shared/config/country-hpone-codes.config';

@UntilDestroy()
@Component({
  selector: 'app-staff-overview',
  templateUrl: './staff-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffOverviewComponent implements OnInit {
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;
  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    settings: this.fb.group({
      phoneCountryCode: [null, []],
      phoneNumber: [null, []],
    }),
    isPhoneNumberVerified: [null],
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudStaffService, private route: ActivatedRoute) {}

  @Input() set staffInfo(customer: StaffEntity) {
    if (customer) {
      this.form.patchValue(customer);
    } else {
      this.form.reset();
    }
  }

  @Input() set submit(v: symbol | undefined) {
    if (v !== undefined && v.toString() === Symbol('overview').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged((a: StaffUpdateInput, b: StaffUpdateInput) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe((input: StaffUpdateInput) => {
        if (!input.settings?.phoneCountryCode || !input.settings?.phoneNumber) {
          this.form.patchValue({ isPhoneNumberVerified: false });
        }
      });
  }

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.updatePage.emit(true);
        });
    }
  }
}
