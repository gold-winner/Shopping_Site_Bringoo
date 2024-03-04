import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomControlComponent } from '../../classes/custom-control.component';
import { boxGroupItemType } from '../../types/box-group-item.type';

@Component({
  selector: 'app-checkbox-group-fancy',
  templateUrl: './checkbox-group-fancy.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupFancyComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupFancyComponent extends CustomControlComponent<(number | string)[]> {
  @Input('boxList') boxList: boxGroupItemType[] = [];
  @Input('namesList') namesList: string[] = [];
  @Input('type') type: 'box' | 'name' = 'box';
  @Input('inline') inline: boolean = false;
  @Input('borders') borders: boolean = true;
}
