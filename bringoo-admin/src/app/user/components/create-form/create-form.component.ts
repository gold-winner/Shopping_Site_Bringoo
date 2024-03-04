import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-create-form',
  templateUrl: './create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent implements OnInit {
  @Output() create: EventEmitter<User> = new EventEmitter<User>();

  form: UntypedFormGroup | undefined;
  isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  constructor(private readonly formBuilder: UntypedFormBuilder, private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      isActive: [true],
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
    this.create.emit({ firstName, lastName, email, password, isActive });
  }
}
