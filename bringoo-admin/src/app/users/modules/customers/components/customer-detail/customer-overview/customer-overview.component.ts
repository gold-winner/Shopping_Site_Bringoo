import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { CrudCustomerService } from '../../../../../../../shared/api/auth/crud-customer.service';
import { CustomerEntity, CustomerUpdateInput } from '../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../shared/config/country-hpone-codes.config';

@UntilDestroy()
@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOverviewComponent implements OnInit {
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;
  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    settings: this.fb.group({
      phoneCountryCode: [null],
      phoneNumber: [null],
    }),
    isPhoneNumberVerified: [null],
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudCustomerService, private route: ActivatedRoute) {}

  @Input() set customerInfo(customer: CustomerEntity) {
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

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged((a: CustomerUpdateInput, b: CustomerUpdateInput) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe((input: CustomerUpdateInput) => {
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
        .subscribe(() => this.updatePage.emit());
    }
  }
}
