import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ProductAttributesPharmacyUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<ProductAttributesPharmacyUpdateInput>;

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-pharma-update-form',
  templateUrl: './products-attributes-pharma-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesPharmaUpdateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesPharmaUpdateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesPharmaUpdateFormComponent implements ControlValueAccessor, AfterViewInit {
  form: FormGroup<FormType> = new FormGroup<FormType>({
    pzn: new FormControl<ProductAttributesPharmacyUpdateInput['pzn'] | null>(null, [
      Validators.required,
      Validators.pattern(/^(\d|[A-Z]|%|\+|\$|\/|\.|-| ){7,8}$/g),
    ]),
    dar_i18n: new FormControl<ProductAttributesPharmacyUpdateInput['dar_i18n'] | null>(null, [Validators.required]),
    packingStandard_i18n: new FormControl<ProductAttributesPharmacyUpdateInput['dar_i18n'] | null>(null, [Validators.required]),
    activeSubstance_i18n: new FormControl<ProductAttributesPharmacyUpdateInput['dar_i18n'] | null>(null, [Validators.required]),
    monoPreparation: new FormControl<boolean | null>(false, [Validators.required]),
    recipeAble: new FormControl<boolean | null>(false, [Validators.required]),
    pharmaciesRequired: new FormControl<boolean | null>(false, [Validators.required]),
  });

  decimalPattern: string = DECIMAL_PATTERN_CONFIG;

  private readonly isReadySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isReady$: Observable<boolean> = this.isReadySubject.asObservable();

  ngAfterViewInit(): void {
    this.isReadySubject.next(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: any) => {
      this.onFormChanges(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: FormControl): null | ValidationErrors {
    this.form.markAllAsTouched();
    return this.form.valid ? null : { required: { valid: false } };
  }

  private onFormChanges(value: ProductAttributesPharmacyUpdateInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: ProductAttributesPharmacyUpdateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): ProductAttributesPharmacyUpdateInput {
    return this.form.value as ProductAttributesPharmacyUpdateInput;
  }

  registerOnChange(fn: (value: ProductAttributesPharmacyUpdateInput) => void): void {
    this.onChange = fn;
  }

  writeValue(value: ProductAttributesPharmacyUpdateInput): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset({});
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
