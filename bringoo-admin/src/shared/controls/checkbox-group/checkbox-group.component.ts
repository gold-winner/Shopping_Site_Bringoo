import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';

import { CustomControlComponent } from '../../classes/custom-control.component';

@UntilDestroy()
@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent extends CustomControlComponent<string[]> {
  @Input() items!: string[];
  value: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  value$: Observable<string[]> = this.value.asObservable();

  writeValue(val: string[]): void {
    this.control.setValue(val, { emitModelToViewChange: true, emitViewToModelChange: true, emitEvent: true });
    this.value.next(val);
  }
}
