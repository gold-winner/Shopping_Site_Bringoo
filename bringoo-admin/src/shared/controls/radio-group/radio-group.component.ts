import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CustomControlComponent } from '../../classes/custom-control.component';
import { IRadioGroup, TRadioValue } from '../../types/box-group-item.type';

@UntilDestroy()
@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent extends CustomControlComponent<number> {
  @Input() label!: string;
  @Input() type: 'block' | 'inline' = 'block';
  @Input() size: 'md' | 'lg' = 'md';
  @Input() required: boolean = false;
  private _list: IRadioGroup[] = [];

  @Input() set list(value: IRadioGroup[]) {
    this._list = value;
  }

  get list(): IRadioGroup[] {
    return this._list;
  }

  @Output() value: EventEmitter<any> = new EventEmitter<any>();

  formControl: UntypedFormControl = new UntypedFormControl();

  ngOnInit(): void {
    if (this.required) {
      this.formControl.setValidators(Validators.required);
    }

    this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value: TRadioValue) => {
      this.value.emit(value);
      this.onChange(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: UntypedFormControl): null | ValidationErrors {
    return this.formControl.valid ? null : { required: { valid: false } };
  }
}
