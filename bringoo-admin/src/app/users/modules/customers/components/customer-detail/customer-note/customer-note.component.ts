import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { CrudCustomerService } from '../../../../../../../shared/api/auth/crud-customer.service';
import { CustomerEntity } from '../../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerNoteComponent {
  form: UntypedFormGroup = this.fb.group({
    note: [null],
  });

  @Input() set customerInfo(customer: CustomerEntity) {
    if (customer?.note) {
      this.form.patchValue(customer);
    }
  }

  @Input() set submit(v: symbol) {
    if (v !== undefined && v.toString() === Symbol('note').toString()) {
      this.onSubmit();
    }
  }

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: UntypedFormBuilder, private service: CrudCustomerService, private route: ActivatedRoute) {}

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.updatePage.emit();
        });
    }
  }
}
