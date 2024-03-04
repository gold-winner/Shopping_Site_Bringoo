import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DECIMAL_PATTERN_CONFIG } from '../config/decimal-pattern.config';

@UntilDestroy()
@Directive({
  selector: 'input[nz-input][type=number]',
})
export class DecimalNumberDirective implements AfterViewInit {
  input: HTMLInputElement;

  constructor(public ref: ElementRef) {
    this.input = this.ref.nativeElement;
  }

  ngAfterViewInit(): void {
    this.subscribeChangeValue();
  }

  subscribeChangeValue(): void {
    if (this.input.pattern === DECIMAL_PATTERN_CONFIG) {
      fromEvent(this.input, 'input')
        .pipe(
          untilDestroyed(this),
          tap(() => {
            if (this.input.value.indexOf('.') !== this.input.value.length - 1) {
              this.ref.nativeElement.value = this.input.value.toString().replace(/([,.]\d\d)\d+/, '$1');
            }
          }),
        )
        .subscribe();
    }
  }
}
