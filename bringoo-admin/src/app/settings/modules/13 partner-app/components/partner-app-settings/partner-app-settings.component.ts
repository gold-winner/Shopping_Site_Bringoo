import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

import { AppSettingsPartnerService } from '../../../../../../shared/api/auth/app-settings-partner.service';
import { SettingsPartnerEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_COMMA_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { validateForm } from '../../../../../../shared/helpers/validate-form';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@Component({
  selector: 'app-13 partner-app-settings',
  templateUrl: './partner-app-settings.component.html',
  styleUrls: ['../../../../styles/section-with-scroll.scss'],
  host: { class: 'h-100p bg-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerAppSettingsComponent implements OnInit {
  form!: UntypedFormGroup;
  originalCommissionFeePercent: number | undefined;
  originalCommissionFeeMin: number | undefined;
  originalCommissionFeeMax: number | undefined;
  isLoading$: Observable<boolean> = this.appSettingsPartnerService.isLoading$;
  decimalCommaPattern: RegExp = DECIMAL_COMMA_PATTERN_CONFIG;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly appSettingsPartnerService: AppSettingsPartnerService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.setBreadCrumbs();

    this.appSettingsPartnerService
      .get()
      .subscribe(({ commissionFeePercent, commissionFeeMin, commissionFeeMax }: SettingsPartnerEntity) => {
        this.originalCommissionFeePercent = commissionFeePercent;
        this.originalCommissionFeeMin = commissionFeeMin;
        this.originalCommissionFeeMax = commissionFeeMax;

        this.form.setValue({
          commissionFeePercent,
          commissionFeeMin,
          commissionFeeMax,
        });
      });
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: 'settings/13 partner-app-settings',
        title: 'Partner App Settings',
      },
    ]);
  }

  buildForm(): void {
    this.form = this.fb.group({
      commissionFeePercent: [null, [Validators.required]],
      commissionFeeMin: [null, [Validators.required]],
      commissionFeeMax: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid) {
      this.appSettingsPartnerService.update(this.form.value).subscribe(() => {
        this.originalCommissionFeePercent = this.form.value.commissionFeePercent;
        this.originalCommissionFeeMin = this.form.value.commissionFeeMin;
        this.originalCommissionFeeMax = this.form.value.commissionFeeMax;

        this.notification.create('success', 'Saved', 'Data has been saved', {
          nzDuration: 2000,
          nzPlacement: 'bottomLeft',
        });
      });
    }
  }

  onCancel(): void {
    this.form.reset({
      commissionFeePercent: this.originalCommissionFeePercent,
      commissionFeeMin: this.originalCommissionFeeMin,
      commissionFeeMax: this.originalCommissionFeeMax,
    });
  }
}
