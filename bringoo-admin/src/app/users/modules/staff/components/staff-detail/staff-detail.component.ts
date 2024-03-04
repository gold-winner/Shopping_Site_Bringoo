import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, pairwise, switchMap, take, tap } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { CrudStaffService } from '../../../../../../shared/api/auth/crud-staff.service';
import { LangCodeEnum, StaffEntity, StaffSettingsEntity } from '../../../../../../shared/api/auth/data-contracts';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-customer-detail',
  templateUrl: './staff-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffDetailComponent implements OnInit {
  updateStaff: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  fields: string = ['deleted_date', 'lastLoginDate', 'email', 'note', 'role', 'isPhoneNumberVerified', 'isExternalEmployee'].join(',');
  _staffSettings!: StaffSettingsEntity;

  staff$: Observable<StaffEntity> = this.updateStaff.asObservable().pipe(
    filter(Boolean),
    untilDestroyed(this),
    switchMap(
      (): Observable<StaffEntity> => {
        return this.service.findOne(this.route.snapshot.params['id'], {
          join: ['settings', 'addresses'],
          fields: this.fields,
          softDelete: true,
        });
      },
    ),
    catchError((error: any) => {
      this.goToStaffPage();
      return throwError(error);
    }),
    tap((v: StaffEntity) => {
      this.roleForm.patchValue(v);
      if (v.settings) {
        this._staffSettings = { ...v.settings };
        this.associateJobsControl.patchValue(v.settings.allowAssociateJobs);
      }
      this.staffLanguageController.setValue(v.settings?.staffLanguageCode);
    }),
  );

  ordersRevenue$: Observable<number>;

  totalCount: number = 0;

  isDeleteModalVisible: boolean = false;
  staffId: string = '';

  roleForm: UntypedFormGroup = this.fb.group({
    role: [null],
    isExternalEmployee: [null],
  });

  associateJobsControl: UntypedFormControl = this.fb.control(false);
  staffLanguageController: UntypedFormControl = this.fb.control(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrudStaffService,
    private breadCrumbService: BreadCrumbService,
    private readonly ordersService: CrudOrderService,
    private fb: UntypedFormBuilder,
    private readonly nzNotification: NzNotificationService,
  ) {
    this.staffId = this.route.snapshot.params['id'];
    this.ordersRevenue$ = this.ordersService.findTotalIncomeByStaff(this.staffId);
  }

  openPanel: 'overview' | 'info' | 'note' | undefined;

  submitEvent: symbol = Symbol('k');

  ngOnInit(): void {
    this.setBreadCrumbs();
    this.changeStaffLanguage();
  }

  onSaveChanges(): void {
    this.service.update(this.staffId, this.roleForm.value).subscribe((value: StaffEntity) => {
      this.nzNotification.success('Account Type & Employee Type', 'Successfully update.');
      this.roleForm.setValue(value);
    });
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: `users/staff/details/${this.staffId}`,
        title: 'Staff setup',
      },
    ]);
  }

  changeStaffLanguage(): void {
    this.staffLanguageController.valueChanges
      .pipe(
        pairwise(),
        filter(([prevCode, curCode]: [LangCodeEnum, LangCodeEnum]) => prevCode !== curCode && !!prevCode),
        map((codes: [LangCodeEnum, LangCodeEnum]) => codes[1]),
        switchMap((lang: LangCodeEnum) =>
          this.service.update(this.staffId, { settings: { ...this._staffSettings, staffLanguageCode: lang } }),
        ),
      )
      .subscribe(() => this.nzNotification.success('Updated staff language', 'Language successfully updated.'));
  }

  goToStaffPage(): void {
    this.router.navigate(['/users/staff']).then();
  }

  onSubmit(): void {
    if (this.openPanel) {
      this.submitEvent = Symbol(this.openPanel);
    }
    this.onCloseDrawer();
  }

  onCloseDrawer(): void {
    this.openPanel = undefined;
  }

  associateJobChange(allowAssociateJobs: boolean): void {
    this.service
      .update(this.staffId, {
        settings: {
          ...this._staffSettings,
          allowAssociateJobs,
        },
      })
      .pipe(
        take(1),
        catchError((error: any) => {
          this.updateStaff.next(true);
          this.nzNotification.error('Associate Jobs Update.', 'Error on update.');
          return throwError(error);
        }),
      )
      .subscribe(() => this.nzNotification.success('Associate Jobs Update.', 'Successfully update.'));
  }

  onOkDelete(): void {
    this.service
      .delete(this.staffId)
      .pipe(untilDestroyed(this), take(1))
      .subscribe(() => {
        this.updateStaff.next(true);
        this.onCloseDrawer();
      });
  }

  onRecover(): void {
    this.service
      .recover(this.staffId)
      .pipe(untilDestroyed(this), take(1))
      .subscribe(() => this.updateStaff.next(true));
  }

  onCancelDelete(): void {
    this.isDeleteModalVisible = false;
  }
}
