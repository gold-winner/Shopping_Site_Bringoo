import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MultiLangV2InputComponent } from '../../../../controls/multi-lang-v2/multi-lang-v2-input.component';

@Component({
  selector: 'app-md-multi-lang-controller',
  templateUrl: 'md-multi-lang-controller.component.html',
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MdMultiLangControllerComponent),
      multi: true,
    },
  ],
})
export class MdMultiLangControllerComponent extends MultiLangV2InputComponent {
  @Input() imageUrlPath: string = '';
  @Input() customHeight?: number;
}
