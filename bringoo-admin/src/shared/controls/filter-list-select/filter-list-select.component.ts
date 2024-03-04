import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomControlComponent } from '../../classes/custom-control.component';

@Component({
  selector: 'app-filter-list-select',
  templateUrl: 'filter-list-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterListSelectComponent),
      multi: true,
    },
  ],
})
export class FilterListSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = '';
  @Input() label: string = '';
  @Input() items: string[] = [];
}
