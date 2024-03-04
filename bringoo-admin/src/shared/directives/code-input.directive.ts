import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

import { mlautsReplace } from '../helpers/mlauts-replacement';

@Directive({
  selector: '[appCodeInput]',
})
export class CodeInputDirective {
  constructor(public ref: ElementRef) {
    fromEvent(this.ref.nativeElement, 'input').subscribe(() => {
      this.ref.nativeElement.value = CodeInputDirective.generateCode(this.ref.nativeElement.value);
    });
  }

  static generateCode(name: string): string {
    return mlautsReplace(name)
      .replace(/([\W_])/g, '_')
      .toUpperCase();
  }
}
