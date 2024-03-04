import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';

@Component({
  template: `
    <ng-template #errorTip let-control="$implicit">
      <app-error-tip [control]="control" [label]="label"></app-error-tip>
    </ng-template>
  `,
})
export class FormControlValidationTemplate {
  @ViewChild('errorTip', { static: true }) public errorTip!: TemplateRef<{ $implicit: AbstractControl<any, any> | NgModel }>;
  @Input() label!: string;
}
