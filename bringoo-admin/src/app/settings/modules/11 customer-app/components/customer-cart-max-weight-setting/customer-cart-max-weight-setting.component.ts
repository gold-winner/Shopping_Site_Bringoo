import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AppSettingsCustomerService } from '../../../../../../shared/api/auth/app-settings-customer.service';
import { SettingsCustomerEntity } from '../../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../../shared/helpers/validate-form';

@Component({
  selector: 'app-customer-cart-max-weight-setting',
  templateUrl: './customer-cart-max-weight-setting.component.html',
  styleUrls: ['customer-cart-max-weight-setting.component.scss'],
  host: { class: 'bg-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCartMaxWeightSettingComponent implements OnInit {
  form!: FormGroup;
  originalCartMaxWeight: number | undefined;

  constructor(
    private fb: FormBuilder,
    private readonly notification: NzNotificationService,
    private readonly appSettingsCustomerService: AppSettingsCustomerService,
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.appSettingsCustomerService.get().subscribe(({ cartMaxWeight }: SettingsCustomerEntity) => {
      this.originalCartMaxWeight = cartMaxWeight;
      this.form.setValue({ cartMaxWeight });
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      cartMaxWeight: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.appSettingsCustomerService.update(this.form.value).subscribe(() => {
        this.originalCartMaxWeight = this.form.value.cartMaxWeight;

        this.notification.create('success', 'Saved', 'Data has been saved', {
          nzDuration: 2000,
          nzPlacement: 'bottomLeft',
        });
      });
    }
  }

  onCancel(): void {
    this.form.reset({ cartMaxWeight: this.originalCartMaxWeight });
  }
}
