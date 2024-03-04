import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-error-tip',
  templateUrl: 'error-tip-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorTipComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() label!: string;

  error$: BehaviorSubject<{ key: string; value: Record<string, any> } | null> = new BehaviorSubject<{
    key: string;
    value: Record<string, any>;
  } | null>(null);

  ngOnInit(): void {
    if (this.control) {
      this.initialError();
      this.controlChangesSubscribe();
    }
  }

  initialError(): void {
    this.error$.next(this.getError(this.control.errors));
  }

  controlChangesSubscribe(): void {
    this.control.valueChanges
      .pipe(
        untilDestroyed(this),
        map(() => this.control.errors),
        map(this.getError),
        tap((error: { key: string; value: Record<string, any> } | null) => this.error$.next(error)),
      )
      .subscribe();
  }

  getError(errors: ValidationErrors | null): { key: string; value: Record<string, any> } | null {
    if (!errors) return null;
    const key: string | undefined = Object.keys(errors).shift();
    if (!key) return null;

    return {
      key,
      value: errors[key],
    };
  }
}
