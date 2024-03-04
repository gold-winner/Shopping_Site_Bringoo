import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { FindInput } from '../../../api/auth/data-contracts';

@UntilDestroy()
@Component({ template: '' })
export abstract class DynamicFilterFormComponent<Out = FindInput> implements OnInit {
  form = new UntypedFormGroup({});

  defaultFormValue: Partial<typeof this.form.value> = {};
  _defaultFilters: object = {};

  @Input() set defaultFilters(filters: object) {
    this._defaultFilters = filters;
    this.form.patchValue(filters);
  }

  @Input() set value(value: typeof this.form.value | undefined) {
    if (value) {
      this.form.patchValue(this.beforePatch(value));
      this.afterPatchValue();
    }
  }

  beforePatch(value: typeof this.form.value): typeof this.form.value {
    return value;
  }

  beforeShow(): void {}

  afterPatchValue(): void {}

  ngOnInit(): void {
    this.beforeInit();

    //emit default values (also emit values after 'set value')
    this.formValueChanges.emit(this.mapSearch(this.form.value));

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((filters: typeof this.form.value) => {
      this.formSubmit.emit(filters);
      this.formValueChanges.emit(this.mapSearch(filters));
    });
  }

  /**
   * @description filters mapper, transform values in needed format
   * @param value filter values
   */
  abstract mapSearch(value: typeof this.form.value): Out;

  beforeInit(): void {}

  @Output() formSubmit: EventEmitter<typeof this.form.value> = new EventEmitter<typeof this.form.value>();
  @Output() formValueChanges: EventEmitter<Out> = new EventEmitter<Out>();
}
