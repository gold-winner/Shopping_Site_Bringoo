import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-search-insert',
  templateUrl: './search-insert.component.html',
  styleUrls: ['search-insert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInsertComponent implements OnInit {
  @Output('searchValue') searching: EventEmitter<string> = new EventEmitter<string>();
  @Output('insertNew') insertNew: EventEmitter<null> = new EventEmitter<null>();
  searchValue: UntypedFormControl = new UntypedFormControl('', [Validators.maxLength(30)]);
  ngOnInit(): void {
    this.initFilterSubscription();
  }

  private initFilterSubscription(): void {
    this.searchValue.valueChanges.pipe(untilDestroyed(this), debounceTime(500), distinctUntilChanged()).subscribe((note: string) => {
      this.searching.emit(note);
    });
  }

  OnInsertNew(): void {
    this.insertNew.emit();
  }
}
