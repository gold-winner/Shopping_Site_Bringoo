import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex' },
})
export class InputSearchComponent implements OnInit {
  @Output() searchable: EventEmitter<string> = new EventEmitter<string>();
  searchValue: UntypedFormControl = new UntypedFormControl('', [Validators.maxLength(30)]);

  ngOnInit(): void {
    this.initFilterSubscription();
  }

  private initFilterSubscription(): void {
    this.searchValue.valueChanges.pipe(untilDestroyed(this), debounceTime(500), distinctUntilChanged()).subscribe((note: string) => {
      this.searchable.emit(note);
    });
  }

  ngOnDestroy(): void {}
}
