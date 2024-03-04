import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NgControl, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { uuid } from '../helpers/uuid';

@UntilDestroy()
@Component({
  template: '',
})
export abstract class CustomControlComponent<T = any> implements ControlValueAccessor, OnInit, AfterViewInit {
  control: UntypedFormControl = new UntypedFormControl();
  @Input()
  cid: string = uuid();

  @Input() set disabled(status: boolean) {
    this.control[status ? 'enable' : 'disable']();
  }

  @Input() placeHolder: string = '';
  @Input() hideLabel: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() bold: boolean = false;

  constructor(protected readonly inj: Injector) {}

  ngAfterViewInit(): void {
    const parentControl: NgControl = this.inj.get(NgControl, new FormControl());
    if (parentControl instanceof FormControlName && parentControl.control?.validator) {
      this.control.validator = parentControl.control.validator;
    }
    this.serverValidation(parentControl);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouched(): void {}

  writeValue(val: T): void {
    this.control.setValue(val, { emitModelToViewChange: true, emitViewToModelChange: true, emitEvent: true });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value: T) => {
      this.onChange(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(control: FormControl): null | ValidationErrors {
    if (control.errors) {
      this.control.setErrors(control.errors);
    }
    return null;
  }

  serverValidation(parentControl: NgControl): void {
    parentControl.statusChanges?.subscribe(() => {
      if (parentControl.hasError('server')) {
        this.control.setErrors(parentControl.errors);
        this.control.markAsTouched({ onlySelf: true });
      } else {
        if (this.control.hasError('server')) {
          this.control.setErrors(null);
          this.control.markAsTouched({ onlySelf: true });
          this.control.updateValueAndValidity();
        }
      }
    });
  }
}
