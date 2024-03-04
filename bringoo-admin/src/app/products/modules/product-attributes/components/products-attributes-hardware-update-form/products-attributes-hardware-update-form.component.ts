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

import { ProductAttributesHardwareUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-hardware-update-form',
  templateUrl: './products-attributes-hardware-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesHardwareUpdateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesHardwareUpdateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesHardwareUpdateFormComponent implements ControlValueAccessor, AfterViewInit {
  form: FormGroup = new FormGroup({});
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
    this.form = this.fb.group({
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      length: [null, [Validators.required]],
    });

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: ProductAttributesHardwareUpdateInput) => {
      this.onFormChanges(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: FormControl): null | ValidationErrors {
    this.form.markAllAsTouched();
    return this.form.valid ? null : { required: { valid: false } };
  }

  private onFormChanges(value: ProductAttributesHardwareUpdateInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: ProductAttributesHardwareUpdateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): ProductAttributesHardwareUpdateInput {
    return this.form.value;
  }

  registerOnChange(fn: (value: ProductAttributesHardwareUpdateInput) => void): void {
    this.onChange = fn;
  }

  writeValue(value: ProductAttributesHardwareUpdateInput): void {
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
