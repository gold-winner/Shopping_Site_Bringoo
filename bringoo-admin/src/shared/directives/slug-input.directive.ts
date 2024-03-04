import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

import { mlautsReplace } from '../helpers/mlauts-replacement';

@Directive({
  selector: '[appSlugInput]',
})
export class SlugInputDirective {
  constructor(public ref: ElementRef) {
    fromEvent(this.ref.nativeElement, 'input').subscribe(() => {
      this.ref.nativeElement.value = SlugInputDirective.generateSlug(this.ref.nativeElement.value);
    });
  }

  static generateSlug(name: string): string {
    return mlautsReplace(name)
      .replace(/([\W_])/g, '-')
      .toLowerCase();
  }
}
