import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
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

import { ProductAttributesPharmacyCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<ProductAttributesPharmacyCreateInput>;

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-pharma-create-form',
  templateUrl: './products-attributes-pharma-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesPharmaCreateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesPharmaCreateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesPharmaCreateFormComponent implements ControlValueAccessor, AfterViewInit {
  form: FormGroup<FormType> = new FormGroup<FormType>({
    pzn: new FormControl<ProductAttributesPharmacyCreateInput['pzn'] | null>(null, [
      Validators.required,
      Validators.pattern(/^(\d|[A-Z]|%|\+|\$|\/|\.|-| ){7,8}$/g),
    ]),
    dar_i18n: new FormControl<ProductAttributesPharmacyCreateInput['dar_i18n'] | null>(null, [Validators.required]),
    packingStandard_i18n: new FormControl<ProductAttributesPharmacyCreateInput['dar_i18n'] | null>(null, [Validators.required]),
    activeSubstance_i18n: new FormControl<ProductAttributesPharmacyCreateInput['dar_i18n'] | null>(null, [Validators.required]),
    monoPreparation: new FormControl<boolean | null>(false, [Validators.required]),
    recipeAble: new FormControl<boolean | null>(false, [Validators.required]),
    pharmaciesRequired: new FormControl<boolean | null>(false, [Validators.required]),
  });

  decimalPattern: string = DECIMAL_PATTERN_CONFIG;
  @Input() isShowAnchor: boolean = true;

  private readonly isReadySubject: Subject<boolean> = new Subject<boolean>();
  isShowAnchor$: Observable<boolean> = this.isReadySubject.asObservable();

  ngAfterViewInit(): void {
    if (this.isShowAnchor) {
      this.isReadySubject.next(true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  constructor() {
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

  private onFormChanges(value: ProductAttributesPharmacyCreateInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: ProductAttributesPharmacyCreateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): ProductAttributesPharmacyCreateInput {
    return this.form.value as ProductAttributesPharmacyCreateInput;
  }

  registerOnChange(fn: (value: ProductAttributesPharmacyCreateInput) => void): void {
    this.onChange = fn;
  }

  writeValue(value: ProductAttributesPharmacyCreateInput): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
