import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Injector, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import {
  NutriScoreEnum,
  NutritionalDataUpdateInput,
  ProductAttributesGroceryUpdateInput,
} from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { validateIf } from '../../../../../../shared/form validators/validate-if.validator';

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-grocery-create-form',
  templateUrl: './products-attributes-grocery-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesGroceryCreateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesGroceryCreateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesGroceryCreateFormComponent implements ControlValueAccessor, AfterViewInit {
  form: FormGroup = new FormGroup({});
  patchedNutritionData!: NutritionalDataUpdateInput;
  decimalPattern: string = DECIMAL_PATTERN_CONFIG;
  @Input() isShowAnchor: boolean = true;

  private readonly isReadySubject: Subject<boolean> = new Subject<boolean>();
  isShowAnchor$: Observable<boolean> = this.isReadySubject.asObservable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  constructor(private fb: FormBuilder, protected readonly inj: Injector) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      nutriScore: [NutriScoreEnum.UNKNOWN, [Validators.required]],
      isAlcohol: [false, [Validators.required]],
      alcoholValue: [0, [validateIf('isAlcohol')]],
      isBio: [false, [Validators.required]],
      isFrozen: [false, [Validators.required]],
      isTobacco: [false, [Validators.required]],
      isVegan: [false, [Validators.required]],
      isVegetarian: [false, [Validators.required]],
      isGlutenFree: [false, [Validators.required]],
      isLactoseFree: [false, [Validators.required]],
      nutritional_data: [null],
      ingredients_i18n: [null],
      allergenic_information_i18n: [null],
      storageInstructions_i18n: [null],
    });

    this.form.controls.isAlcohol.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((isAlcohol: boolean) => this.onAlcoholChecked(isAlcohol));

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: ProductAttributesGroceryUpdateInput) => {
      this.onFormChanges(value);
    });
  }

  ngAfterViewInit(): void {
    if (this.isShowAnchor) {
      this.isReadySubject.next(true);
    }
  }

  onAlcoholChecked(isAlcohol: boolean): void {
    this.form.patchValue({ alcoholValue: isAlcohol ? 4.5 : 0 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: FormControl): null | ValidationErrors {
    this.form.markAllAsTouched();
    return this.form.valid ? null : { required: { valid: false } };
  }

  private onFormChanges(value: ProductAttributesGroceryUpdateInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: ProductAttributesGroceryUpdateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): ProductAttributesGroceryUpdateInput {
    return this.form.value;
  }

  registerOnChange(fn: (value: ProductAttributesGroceryUpdateInput) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: ProductAttributesGroceryUpdateInput): void {
    if (value) {
      this.value = value;
    }
  }
}
