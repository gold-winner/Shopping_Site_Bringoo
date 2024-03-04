import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[positiveNumber]',
})
export class PositiveNumberDirective {
  constructor(public ref: ElementRef) {
    fromEvent(this.ref.nativeElement, 'input').subscribe(() => {
      this.ref.nativeElement.value = this.ref.nativeElement.value < 0 ? -this.ref.nativeElement.value : this.ref.nativeElement.value;
    });
  }
}
