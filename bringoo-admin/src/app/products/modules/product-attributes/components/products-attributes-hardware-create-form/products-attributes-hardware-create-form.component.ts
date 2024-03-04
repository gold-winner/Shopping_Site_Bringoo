import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
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

import { ProductAttributesHardwareUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-hardware-create-form',
  templateUrl: './products-attributes-hardware-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesHardwareCreateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesHardwareCreateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesHardwareCreateFormComponent implements ControlValueAccessor, AfterViewInit {
  form: FormGroup = new FormGroup({});
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
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
