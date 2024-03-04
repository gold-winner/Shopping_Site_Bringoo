import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  @Input() set model(user: User | undefined) {
    this.defaults = user;
    if (this.form) {
      // @ts-ignore
      this.form.patchValue(user, { emitEvent: false });
    }
  }

  @Output() update: EventEmitter<User> = new EventEmitter<User>();

  private defaults: User | undefined;

  form: UntypedFormGroup | undefined;
  isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  constructor(private readonly formBuilder: UntypedFormBuilder, private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.defaults?.firstName, [Validators.required]],
      lastName: [this.defaults?.lastName, [Validators.required]],
      email: [this.defaults?.email, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      isActive: [this.defaults?.isActive],
    });
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form?.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onSubmit(): void {
    const { firstName, lastName, email, password, isActive } = this.form ? this.form.value : undefined;
    this.update.emit({ firstName, lastName, email, password, isActive });
  }
}
