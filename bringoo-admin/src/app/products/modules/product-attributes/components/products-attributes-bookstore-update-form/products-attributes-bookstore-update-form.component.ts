import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CoverTypeEnum, ProductAttributesBookstoreUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { LanguageNamesConfig } from '../../../../../../shared/config/language-names.config';
import { ToFormGroupType } from '../../../../../../shared/types/to-form-group.type';

type formType = ToFormGroupType<ProductAttributesBookstoreUpdateInput>;

@UntilDestroy()
@Component({
  selector: 'app-products-attributes-bookstore-update-form',
  templateUrl: './products-attributes-bookstore-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsAttributesBookstoreUpdateFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductsAttributesBookstoreUpdateFormComponent),
      multi: true,
    },
  ],
})
export class ProductsAttributesBookstoreUpdateFormComponent implements ControlValueAccessor, AfterViewInit {
  coverTypes: string[] = Object.values(CoverTypeEnum);
  gradleLevelPattern: RegExp = /^\d*-\d*$/g;
  languages: string[] = LanguageNamesConfig;

  form: FormGroup<formType> = new FormGroup<formType>({
    bookAuthor: new FormControl(null),
    bookPublisher: new FormControl(null),
    bookLanguage: new FormControl(null),
    bookCoverType: new FormControl(null),
    bookTotalPages: new FormControl(null),
    bookISBN_10: new FormControl(null),
    bookISBN_13: new FormControl(null),
    bookReadingAge: new FormControl(null),
    bookGradleLevel: new FormControl(null),
    width: new FormControl(null),
    height: new FormControl(null),
    length: new FormControl(null),
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

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: typeof this.form.value) => {
      this.onFormChanges(value as ProductAttributesBookstoreUpdateInput);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: FormControl): null | ValidationErrors {
    this.form.markAllAsTouched();
    return this.form.valid ? null : { required: { valid: false } };
  }

  private onFormChanges(value: ProductAttributesBookstoreUpdateInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: ProductAttributesBookstoreUpdateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): ProductAttributesBookstoreUpdateInput {
    return this.form.value as ProductAttributesBookstoreUpdateInput;
  }

  registerOnChange(fn: (value: ProductAttributesBookstoreUpdateInput) => void): void {
    this.onChange = fn;
  }

  writeValue(value: ProductAttributesBookstoreUpdateInput): void {
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
