import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format, parse } from 'date-fns';
import { take } from 'rxjs/operators';

import { CrudCustomerService } from '../../../../../../../shared/api/auth/crud-customer.service';
import { CustomerEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoComponent {
  form: UntypedFormGroup = this.fb.group({
    settings: this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [new Date()],
    }),
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudCustomerService, private route: ActivatedRoute) {}

  @Input() set customerInfo(customer: CustomerEntity) {
    if (customer) {
      const patchValue: CustomerEntity & any = customer;
      if (customer.settings?.dateOfBirth) {
        patchValue.settings.dateOfBirth = parse(patchValue.settings.dateOfBirth, DATE_FORMAT, new Date());
      }
      this.form.patchValue(patchValue);
    } else {
      this.form.reset();
    }
  }

  @Input() set submit(v: symbol) {
    if (v !== undefined && v.toString() === Symbol('info').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      const formValue: CustomerEntity & any = this.form.value;
      formValue.settings.dateOfBirth = format(formValue.settings?.dateOfBirth, DATE_FORMAT);
      this.service
        .update(this.route.snapshot.params['id'], formValue)
        .pipe(take(1))
        .subscribe(() => this.updatePage.emit());
    }
  }
}
