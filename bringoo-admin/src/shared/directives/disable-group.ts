import { Directive, Input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Directive({
  selector: '[bringooDisableGroup]',
})
export class DisableGroupDirective {
  constructor(private controlContainer: ControlContainer) {}

  @Input() set bringooDisableGroup(condition: boolean | null | undefined) {
    const group: AbstractControl | null = this.controlContainer.control;

    if (condition) {
      group?.disable({ emitEvent: false });
    } else {
      group?.enable({ emitEvent: false });
    }
  }
}
