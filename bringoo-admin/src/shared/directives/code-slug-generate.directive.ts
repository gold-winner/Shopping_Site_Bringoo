import { AfterViewInit, Directive, Injector, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { I18NInput } from '../api/auth/data-contracts';
import { CodeInputDirective } from './code-input.directive';
import { SlugInputDirective } from './slug-input.directive';

@Directive({
  selector: '[code-slug-generate]',
})
export class CodeSlugGenerate implements AfterViewInit, OnDestroy {
  @Input() originalControlName: string | null = null;
  @Input() generatorType!: 'slug' | 'code';

  sub!: Subscription;

  constructor(private readonly inj: Injector) {}

  ngAfterViewInit(): void {
    const formControlName: FormControlName = (this.inj.get(NgControl) as unknown) as FormControlName;
    if (this.originalControlName) {
      const originalControl: AbstractControl | undefined | null = formControlName.control.parent?.get(this.originalControlName);
      if (originalControl) {
        this.originalChanges(originalControl, formControlName.control);
      }
    }
  }

  originalChanges(originalControl: AbstractControl, formControl: FormControl): void {
    originalControl.valueChanges
      ?.pipe(
        filter<I18NInput>(Boolean),
        map((names: I18NInput) => (names?.EN ? this.codeAndSlugGenerator(names.EN) : '')),
      )
      .subscribe((generatedValue: string) => {
        formControl.patchValue(generatedValue);
      });
  }

  codeAndSlugGenerator(name: string): string {
    if (this.generatorType === 'slug') {
      return SlugInputDirective.generateSlug(name);
    }
    return CodeInputDirective.generateCode(name);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
