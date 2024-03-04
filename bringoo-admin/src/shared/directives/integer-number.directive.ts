import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[integerNumber]',
})
export class IntegerNumberDirective {
  constructor(public ref: ElementRef) {
    fromEvent(this.ref.nativeElement, 'input').subscribe(() => {
      this.ref.nativeElement.value = Number.parseInt(this.ref.nativeElement.value);
    });
  }
}
