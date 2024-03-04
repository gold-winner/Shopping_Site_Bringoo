import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudStaffService } from '../../api/auth/crud-staff.service';
import { Pageable, StaffEntity, StaffRoleEnum } from '../../api/auth/data-contracts';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-staff-with-avatars',
  templateUrl: 'filter-staff-with-avatars.component.html',
  styleUrls: ['filter-staff-with-avatars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStaffWithAvatarsComponent),
      multi: true,
    },
  ],
})
export class FilterStaffWithAvatarsComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Staff';
  @Input() maxHeight: number = 500;
  defaultVisibleAvatars: number = 4;
  @Input() roles: StaffRoleEnum[] = [StaffRoleEnum.DRIVER, StaffRoleEnum.PICKER_DRIVER, StaffRoleEnum.PICKER, StaffRoleEnum.UNASSIGNED];
  private readonly staffs: BehaviorSubject<StaffEntity[]> = new BehaviorSubject<StaffEntity[]>([]);
  staffs$: Observable<StaffEntity[]> = this.staffs.asObservable();
  total: number = 0;
  selectedStaffs: Set<string> = new Set<string>();

  colorList: string[] = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  fields: string = ['id', 'role'].join(',');
  join: string[] = ['settings||firstName,lastName,photoUrl'];
  sort: string[] = ['settings.firstName,DESC', 'settings.lastName,DESC'];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouched(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(ids: string[]): void {
    this.selectedStaffs.clear();

    if (ids.length > 0) {
      for (const id of ids) {
        this.selectedStaffs.add(id);
      }
    }
  }

  constructor(private readonly crudStaff: CrudStaffService) {}

  ngOnInit(): void {
    this.crudStaff
      .find({
        s: JSON.stringify({
          role: { [CondOperator.IN]: this.roles },
        }),
        limit: this.defaultVisibleAvatars,
        page: 1,
        fields: this.fields,
        join: this.join,
        sort: this.sort,
      })
      .pipe(
        map(({ items, total }: Pageable & { items?: StaffEntity[] }) => {
          this.total = total;
          return items ?? [];
        }),
      )
      .subscribe((staffs: StaffEntity[]) => this.staffs.next([...staffs]));
  }

  onChangeSelect(id: string, status: boolean): void {
    this.selectedStaffs[status ? 'add' : 'delete'](id);
    this.onChange([...this.selectedStaffs.values()]);
  }

  changeVisible(status: boolean): void {
    if (status && this.staffs.getValue().length !== this.total) {
      this.crudStaff
        .find({
          s: JSON.stringify({
            role: { [CondOperator.IN]: this.roles },
          }),
          join: this.join,
          fields: this.fields,
          sort: this.sort,
          page: 1,
          limit: this.total,
        })
        .pipe(
          map(({ items, total }: Pageable & { items?: StaffEntity[] }) => {
            this.total = total;
            return items ?? [];
          }),
        )
        .subscribe((staffs: StaffEntity[]) => this.staffs.next(staffs));
    }
  }
}
