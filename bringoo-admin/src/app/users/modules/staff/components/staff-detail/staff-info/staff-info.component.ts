import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format, parse } from 'date-fns';
import { take } from 'rxjs/operators';

import { CrudStaffService } from '../../../../../../../shared/api/auth/crud-staff.service';
import { StaffEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffInfoComponent {
  form: UntypedFormGroup = this.fb.group({
    settings: this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [new Date()],
    }),
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudStaffService, private route: ActivatedRoute) {}

  @Input() set staffInfo(customer: StaffEntity) {
    if (customer) {
      const patchValue: StaffEntity & any = customer;
      if (customer.settings?.dateOfBirth) {
        patchValue.settings.dateOfBirth = parse(patchValue.settings.dateOfBirth, DATE_FORMAT, new Date());
      }
      this.form.patchValue(patchValue);
    } else {
      this.form.reset();
    }
  }

  @Input() set submit(v: symbol) {
    if (v.toString() === Symbol('info').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      const formValue: StaffEntity & any = this.form.value;
      if (formValue.settings.dateOfBirth) {
        formValue.settings.dateOfBirth = format(formValue.settings?.dateOfBirth, DATE_FORMAT);
      }
      this.service
        .update(this.route.snapshot.params['id'], formValue)
        .pipe(take(1))
        .subscribe(() => {
          this.updatePage.emit(true);
        });
    }
  }
}
