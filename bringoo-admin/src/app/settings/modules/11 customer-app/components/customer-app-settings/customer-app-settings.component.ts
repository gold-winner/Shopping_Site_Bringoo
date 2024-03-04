import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

import { AppSettingsCustomerService } from '../../../../../../shared/api/auth/app-settings-customer.service';
import { SettingsCustomerEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_COMMA_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { validateForm } from '../../../../../../shared/helpers/validate-form';

@Component({
  selector: 'app-11 customer-app-settings',
  templateUrl: './customer-app-settings.component.html',
  styleUrls: ['../../../../styles/section-with-scroll.scss'],
  host: { class: 'bg-component h-100p scroll-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAppSettingsComponent implements OnInit {
  decimalCommaPattern: RegExp = DECIMAL_COMMA_PATTERN_CONFIG;
  form!: UntypedFormGroup;
  originalCartMaxWeight: number | undefined;
  originalOrderDelayNotificationTime: number | undefined;
  originalProductOutOfStockTime: number | undefined;
  originalAppIosVersion: string | undefined;
  originalAppAndroidVersion: string | undefined;
  originalSearchRank: number | undefined;
  originalSubscriptionActiveTime: number | undefined;

  isLoading$: Observable<boolean> = this.appSettingsCustomerService.isLoading$;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
    private readonly appSettingsCustomerService: AppSettingsCustomerService,
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.appSettingsCustomerService
      .get()
      .subscribe(
        ({
          cartMaxWeight,
          orderDelayNotificationTime,
          productOutOfStockTime,
          appIosVersion,
          appAndroidVersion,
          searchRank,
          subscriptionActiveTime,
        }: SettingsCustomerEntity) => {
          this.originalCartMaxWeight = cartMaxWeight;
          this.originalOrderDelayNotificationTime = orderDelayNotificationTime;
          this.originalProductOutOfStockTime = productOutOfStockTime;
          this.originalAppIosVersion = appIosVersion;
          this.originalAppAndroidVersion = appAndroidVersion;
          this.originalSearchRank = searchRank;
          this.originalSubscriptionActiveTime = subscriptionActiveTime;

          this.form.setValue({
            cartMaxWeight,
            orderDelayNotificationTime,
            productOutOfStockTime,
            appIosVersion,
            appAndroidVersion,
            searchRank,
            subscriptionActiveTime,
          });
        },
      );
  }

  buildForm(): void {
    this.form = this.fb.group({
      cartMaxWeight: [null, [Validators.required]],
      orderDelayNotificationTime: [null, [Validators.required]],
      productOutOfStockTime: [null, [Validators.required]],
      appIosVersion: [null, [Validators.required]],
      appAndroidVersion: [null, [Validators.required]],
      searchRank: [null, [Validators.required]],
      subscriptionActiveTime: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.appSettingsCustomerService.update(this.form.value).subscribe(() => {
        this.originalCartMaxWeight = this.form.value.cartMaxWeight;
        this.originalOrderDelayNotificationTime = this.form.value.orderDelayNotificationTime;
        this.originalProductOutOfStockTime = this.form.value.productOutOfStockTime;
        this.originalAppIosVersion = this.form.value.appIosVersion;
        this.originalAppAndroidVersion = this.form.value.appAndroidVersion;
        this.originalSearchRank = this.form.value.searchRank;
        this.originalSubscriptionActiveTime = this.form.value.subscriptionActiveTime;

        this.notification.create('success', 'Saved', 'Data has been saved', {
          nzDuration: 2000,
          nzPlacement: 'bottomLeft',
        });
      });
    }
  }

  onCancel(): void {
    this.form.reset({
      cartMaxWeight: this.originalCartMaxWeight,
      orderDelayNotificationTime: this.originalOrderDelayNotificationTime,
      productOutOfStockTime: this.originalProductOutOfStockTime,
      appIosVersion: this.originalAppIosVersion,
      appAndroidVersion: this.originalAppAndroidVersion,
      searchRank: this.originalSearchRank,
      subscriptionActiveTime: this.originalSubscriptionActiveTime,
    });
  }
}
