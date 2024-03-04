import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-survey-creator-control',
  templateUrl: 'survey-creator-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SurveyCreatorControlComponent),
      multi: true,
    },
  ],
})
export class SurveyCreatorControlComponent {
  subject: Subject<object> = new Subject<object>();
  @Input() height: number = 500;

  onUpdateModelSave(model: object): void {
    this.onChange(model);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouched(): void {}

  writeValue(val: object): void {
    this.subject.next(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
