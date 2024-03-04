import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ProductDepositUpdateInput } from '../../api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-deposit-edit',
  templateUrl: './deposit-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class DepositEditComponent implements OnInit {
  @Input() form!: UntypedFormGroup;
  patchedDeposit!: ProductDepositUpdateInput;
  depositData: UntypedFormControl = new UntypedFormControl(false);

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.depositData.valueChanges.pipe(untilDestroyed(this)).subscribe((isDeposit: boolean) => {
      if (isDeposit) {
        this.form.removeControl('deposit');
        this.form.addControl(
          'deposit',
          this.fb.group({
            itemVatCode: [null, [Validators.required]],
            itemDepositValueGross: [null, [Validators.required]],
            boxVatCode: [null, [Validators.required]],
            boxDepositValueGross: [null, [Validators.required]],
          }),
        );

        if (this.patchedDeposit) {
          this.form.get('deposit')?.patchValue({ ...this.patchedDeposit });
        }
      } else {
        this.form.removeControl('deposit');
        this.form.addControl('deposit', this.fb.control(null));
      }
    });

    if (this.form.get('deposit')?.value) {
      this.patchedDeposit = {
        itemVatCode: this.form.get('deposit')?.value.itemVatCode,
        itemDepositValueGross: this.form.get('deposit')?.value.itemDepositValueGross,
        boxVatCode: this.form.get('deposit')?.value.boxVatCode,
        boxDepositValueGross: this.form.get('deposit')?.value.boxDepositValueGross,
      };

      this.depositData.patchValue(true);
    }
  }
}
