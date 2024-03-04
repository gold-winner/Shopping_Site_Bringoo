import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

import { AppSettingsStaffService } from '../../../../../../shared/api/auth/app-settings-staff.service';
import { SettingsStaffEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_COMMA_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { validateForm } from '../../../../../../shared/helpers/validate-form';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@Component({
  selector: 'app-staff-app-settings',
  templateUrl: './staff-app-settings.component.html',
  styleUrls: ['../../../../styles/section-with-scroll.scss'],
  host: { class: 'h-100p bg-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffAppSettingsComponent implements OnInit {
  decimalCommaPattern: RegExp = DECIMAL_COMMA_PATTERN_CONFIG;
  form!: UntypedFormGroup;
  originalPickerJobDistance: number | undefined;
  originalRiderJobDistance: number | undefined;
  originalSignUpCode: number | undefined;
  originalAppIosVersion: string | undefined;
  originalAppAndroidVersion: string | undefined;
  originalSubscriptionActiveTime: number | undefined;
  originalSearchRank: number | undefined;

  isLoading$: Observable<boolean> = this.appSettingsStaffService.isLoading$;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
    private breadCrumbService: BreadCrumbService,
    private readonly appSettingsStaffService: AppSettingsStaffService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setBreadCrumbs();

    this.appSettingsStaffService
      .get()
      .subscribe(
        ({
          pickerJobDistance,
          riderJobDistance,
          signUpCode,
          appIosVersion,
          appAndroidVersion,
          searchRank,
          subscriptionActiveTime,
        }: SettingsStaffEntity) => {
          this.originalPickerJobDistance = pickerJobDistance;
          this.originalRiderJobDistance = riderJobDistance;
          this.originalSignUpCode = signUpCode;
          this.originalAppIosVersion = appIosVersion;
          this.originalAppAndroidVersion = appAndroidVersion;
          this.originalSearchRank = searchRank;
          this.originalSubscriptionActiveTime = subscriptionActiveTime;

          this.form.setValue({
            pickerJobDistance,
            riderJobDistance,
            signUpCode,
            appIosVersion,
            appAndroidVersion,
            searchRank,
            subscriptionActiveTime,
          });
        },
      );
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: 'settings/staff-app-settings',
        title: 'Staff App Settings',
      },
    ]);
  }

  buildForm(): void {
    this.form = this.fb.group({
      pickerJobDistance: [null, [Validators.required]],
      riderJobDistance: [null, [Validators.required]],
      signUpCode: [null, [Validators.required]],
      appIosVersion: [null, [Validators.required]],
      appAndroidVersion: [null, [Validators.required]],
      searchRank: [null, [Validators.required]],
      subscriptionActiveTime: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.appSettingsStaffService.update(this.form.value).subscribe(() => {
        this.originalPickerJobDistance = this.form.value.pickerJobDistance;
        this.originalRiderJobDistance = this.form.value.riderJobDistance;
        this.originalSignUpCode = this.form.value.signUpCode;
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
      pickerJobDistance: this.originalPickerJobDistance,
      riderJobDistance: this.originalRiderJobDistance,
      signUpCode: this.originalSignUpCode,
      appIosVersion: this.originalAppIosVersion,
      appAndroidVersion: this.originalAppAndroidVersion,
      searchRank: this.originalSearchRank,
      subscriptionActiveTime: this.originalSubscriptionActiveTime,
    });
  }
}
