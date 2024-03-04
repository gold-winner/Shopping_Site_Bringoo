import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'date-fns';
import { take } from 'rxjs/operators';

import { CrudStaffService } from '../../../../../../../shared/api/auth/crud-staff.service';
import { StaffEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../shared/config/constants.config';

@Component({
  selector: 'app-staff-note',
  templateUrl: './staff-note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffNoteComponent {
  form: UntypedFormGroup = this.fb.group({
    note: [null],
  });

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
    if (v !== undefined && v.toString() === Symbol('note').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: UntypedFormBuilder, private service: CrudStaffService, private route: ActivatedRoute) {}

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.updatePage.emit(true);
        });
    }
  }
}
