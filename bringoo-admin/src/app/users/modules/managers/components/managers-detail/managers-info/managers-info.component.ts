import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { format, parse } from 'date-fns';
import { take } from 'rxjs/operators';

import { CrudManagerService } from '../../../../../../../shared/api/auth/crud-manager.service';
import { ManagerEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-manager-info',
  templateUrl: './managers-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersInfoComponent {
  form: UntypedFormGroup = this.fb.group({
    settings: this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [new Date()],
    }),
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudManagerService, private route: ActivatedRoute) {}

  @Input() set managerInfo(manager: ManagerEntity) {
    if (manager) {
      const patchValue: ManagerEntity & any = manager;
      if (manager.settings?.dateOfBirth) {
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
      const formValue: ManagerEntity & any = this.form.value;
      formValue.settings.dateOfBirth = format(formValue.settings?.dateOfBirth, DATE_FORMAT);
      this.service
        .update(this.route.snapshot.params['id'], formValue)
        .pipe(take(1))
        .subscribe(() => {
          this.updatePage.emit();
        });
    }
  }
}
