import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';

import { StaffRoleEnum } from '../../../../../../shared/api/auth/data-contracts';
import { BacklogSearchType } from '../../type/backlog-search.type';

@UntilDestroy()
@Component({
  selector: 'app-backlog-page-filters',
  templateUrl: 'backlog-page-filters.component.html',
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogPageFiltersComponent implements OnInit {
  @Output() filters: EventEmitter<BacklogSearchType> = new EventEmitter<BacklogSearchType>();

  staffRoles: StaffRoleEnum[] = [StaffRoleEnum.DRIVER];

  filterForm = new FormGroup({
    staffIds: new FormControl<string[]>([]),
    isComplete: new FormControl<boolean | null>(null),
    search: new FormControl<boolean | null>(null),
    storeIds: new FormControl<string[]>([]),
  });

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(untilDestroyed(this), debounceTime(500)).subscribe((data: any) => {
      this.filters.emit(data);
    });
  }
}
