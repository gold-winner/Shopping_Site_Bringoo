import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomControlComponent } from '../../classes/custom-control.component';

@Component({
  selector: 'app-status-switch',
  templateUrl: './status-switch.component.html',
  styleUrls: ['status-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusSwitchComponent),
      multi: true,
    },
  ],
})
export class StatusSwitchComponent extends CustomControlComponent<boolean> {
  @Input('trueValue') trueValue: string = 'Active';
  @Input('falseValue') falseValue: string = 'Inactive';
}
