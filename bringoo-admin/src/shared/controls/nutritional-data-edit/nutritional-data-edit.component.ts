import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { NutritionalDataUpdateInput } from '../../api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../config/decimal-pattern.config';

@UntilDestroy()
@Component({
  selector: 'app-nutritional-data-edit',
  templateUrl: './nutritional-data-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class NuntritionalDataEditComponent implements OnInit {
  @Input() form!: UntypedFormGroup;
  patchedNutritionData!: NutritionalDataUpdateInput;
  nutritionData: UntypedFormControl = new UntypedFormControl(false);
  decimalPattern: string = DECIMAL_PATTERN_CONFIG;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.nutritionData.valueChanges.pipe(untilDestroyed(this)).subscribe((hasData: boolean) => {
      if (hasData) {
        this.form.removeControl('nutritional_data');
        this.form.addControl(
          'nutritional_data',
          this.fb.group({
            energyTotal: [0, [Validators.required]],
            calories: [0, [Validators.required]],

            fatTotal: [0, [Validators.required]],
            fatSaturates: [0, [Validators.required]],

            carbohydrateTotal: [0, [Validators.required]],
            carbohydrateSugars: [0, [Validators.required]],

            fibres: [0, [Validators.required]],
            protein: [0, [Validators.required]],

            salt: [0, [Validators.required]],
          }),
        );

        if (this.patchedNutritionData) {
          this.form.get('nutritional_data')?.patchValue({ ...this.patchedNutritionData });
        }
      } else {
        this.form.removeControl('nutritional_data');
        this.form.addControl('nutritional_data', this.fb.control(null));
      }
    });

    if (this.form.get('nutritional_data')?.value) {
      this.patchedNutritionData = {
        energyTotal: this.form.get('nutritional_data')?.value.energyTotal,
        calories: this.form.get('nutritional_data')?.value.calories,
        fatTotal: this.form.get('nutritional_data')?.value.fatTotal,
        fatSaturates: this.form.get('nutritional_data')?.value.fatSaturates,
        carbohydrateTotal: this.form.get('nutritional_data')?.value.carbohydrateTotal,
        carbohydrateSugars: this.form.get('nutritional_data')?.value.carbohydrateSugars,
        fibres: this.form.get('nutritional_data')?.value.fibres,
        protein: this.form.get('nutritional_data')?.value.protein,
        salt: this.form.get('nutritional_data')?.value.salt,
      };

      this.nutritionData.patchValue(true);
    }
  }
}
