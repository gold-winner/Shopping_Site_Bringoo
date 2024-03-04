import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { StoreEntity, StoreStaffRestrictionEnum } from '../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-store-picker-driver-limitations-form',
  templateUrl: './store-picker-driver-limitations-form.component.html',
  styleUrls: ['./store-picker-driver-limitations-form.component.scss'],
})
export class StorePickerDriverLimitationsFormComponent implements OnInit {
  form: UntypedFormGroup = this.fb.group({
    pickerRestriction: [null, Validators.required],
    driverRestriction: [null, Validators.required],
  });

  storeStaffRestriction: StoreStaffRestrictionEnum[] = Object.values(StoreStaffRestrictionEnum);

  isLoading$: Observable<boolean> = this.service.isLoading$;

  reloadPage: Subject<boolean> = new Subject<boolean>();

  storeId: string = '';

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly service: CrudStoreService,
    private readonly route: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getStoreId();
    this.loadStaffLimitations();
  }

  getStoreId(): void {
    this.storeId = this.route.parent?.snapshot.params['id'];
  }

  loadStaffLimitations(): void {
    this.reloadPage
      .asObservable()
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        switchMap(
          (): Observable<StoreEntity> =>
            this.service.findOne(this.storeId, { fields: 'pickerRestriction,driverRestriction', softDelete: true }),
        ),
      )
      .subscribe((store: StoreEntity) => this.form.patchValue(store));

    this.reloadPage.next(true);
  }

  onSubmit(): void {
    this.service
      .update(this.storeId, {
        ...this.form.getRawValue(),
      })
      .subscribe(() => this.notification.success('Staff limitations update', 'Successfully updated.'));
  }

  onCancel(): void {
    this.reloadPage.next(true);
  }
}
