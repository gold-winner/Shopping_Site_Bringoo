import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CrudManagerService } from '../../../../../../../shared/api/auth/crud-manager.service';
import { ManagerEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { COUNTRY_PHONE_CODES_CONFIG } from '../../../../../../../shared/config/country-hpone-codes.config';

@UntilDestroy()
@Component({
  selector: 'app-manager-overview',
  templateUrl: './managers-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersOverviewComponent {
  countryCode: (string | number)[][] = COUNTRY_PHONE_CODES_CONFIG;
  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    settings: this.fb.group({
      phoneCountryCode: [null, []],
      phoneNumber: [null, []],
    }),
  });

  constructor(private fb: UntypedFormBuilder, private service: CrudManagerService, private route: ActivatedRoute) {}

  @Input() set managerInfo(manager: ManagerEntity) {
    if (manager) {
      this.form.patchValue(manager);
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

  onSubmit(): void {
    if (this.form.dirty && this.form.valid) {
      this.service
        .update(this.route.snapshot.params['id'], this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.updatePage.emit();
        });
    }
  }
}
