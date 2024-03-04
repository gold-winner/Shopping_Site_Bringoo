import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-array-list',
  templateUrl: './array-list.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArrayListComponent),
      multi: true,
    },
  ],
})
export class ArrayListComponent implements ControlValueAccessor, OnInit {
  form!: UntypedFormGroup;
  @Input() required: boolean = false;
  @Input() placeHolder: string = '';
  @Input() disabled: boolean = false;
  itemsCount: number = 1;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  constructor(private readonly fb: UntypedFormBuilder) {}

  onAddItem(): void {
    this.items.push(new UntypedFormControl('', [Validators.required]));
  }

  onDeleteItem(index: number): void {
    this.items.removeAt(index);
  }

  get items(): UntypedFormArray {
    return this.form.get('items') as UntypedFormArray;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  writeValue(values: string[]): void {
    this.buildForm();
    const lines: string[] = [...new Set(values)];
    lines.sort();
    if (lines.length > 1) {
      for (const v of lines) {
        this.items.push(this.fb.control(v));
      }
    }
    this.items.patchValue(lines);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: UntypedFormControl): null | ValidationErrors {
    return this.form.valid ? null : { required: { valid: false } };
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.required
      ? this.fb.group({
          items: this.fb.array([new UntypedFormControl(null, [Validators.required])]),
        })
      : this.fb.group({
          items: this.fb.array([new UntypedFormControl(null)]),
        });
    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: { items: string[] }) => {
      this.onChange(value.items);
    });
  }
}
