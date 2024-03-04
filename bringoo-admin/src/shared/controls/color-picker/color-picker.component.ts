import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomControlComponent } from '../../classes/custom-control.component';
import { DEFAULT_COLORS } from '../../config/default-colors.config';

@Component({
  selector: 'app-color-picker',
  templateUrl: 'color-picker.component.html',
  styleUrls: ['color-picker.component.scss'],
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent extends CustomControlComponent {
  @Input() title: string = '';
  colors: string[] = DEFAULT_COLORS;
  maxColors: number[];

  constructor(protected readonly inj: Injector) {
    super(inj);

    this.maxColors = Array.from({ length: 27 })
      .fill(1)
      .map((_: unknown, index: number) => index);
  }

  onClickColor(color: string): void {
    this.control.patchValue(color);
  }
}
