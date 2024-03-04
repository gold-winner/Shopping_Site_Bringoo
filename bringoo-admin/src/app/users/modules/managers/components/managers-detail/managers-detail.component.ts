import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

import { CrudManagerService } from '../../../../../../shared/api/auth/crud-manager.service';
import { ManagerEntity } from '../../../../../../shared/api/auth/data-contracts';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-manager-detail',
  templateUrl: './managers-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersDetailComponent implements OnInit {
  updateManager: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  manager$: Observable<ManagerEntity> = this.updateManager.asObservable().pipe(
    filter(Boolean),
    untilDestroyed(this),
    switchMap(() => {
      return this.service.findOne(this.route.snapshot.params['id'], { join: ['settings', 'addresses'] });
    }),
    tap((v: ManagerEntity) =>
      this.form.reset({
        role: v.role,
      }),
    ),
    catchError((error: any) => {
      this.goToManagersPage();
      return throwError(error);
    }),
  );

  isDeleteModalVisible: boolean = false;
  form = new FormGroup({
    role: new FormControl<string | null>(null),
  });

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private service: CrudManagerService,
    private breadCrumbService: BreadCrumbService,
    private readonly notification: NzNotificationService,
  ) {}

  openPanel: 'overview' | 'info' | 'note' | null = null;

  submitEvent: symbol = Symbol('k');

  ngOnInit(): void {
    this.setBreadCrumbs();
  }

  onChangeRole(): void {
    if (this.form.controls.role.dirty) {
      this.service.update(this.route.snapshot.params['id'], { role: this.form.value.role ?? '' }).subscribe((value: ManagerEntity) => {
        this.notification.success('Manager Role', 'Updated.');
        this.form.controls.role.reset(value.role);
        this.form.controls.role.markAsPristine();
      });
    }
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: `users/managers/details/${this.route.snapshot.params['id']}`,
        title: 'Manager detail',
      },
    ]);
  }

  goToManagersPage(): void {
    this.router.navigate(['/users/managers']);
  }

  onSubmit(): void {
    if (this.openPanel) {
      this.submitEvent = Symbol(this.openPanel);
    }
    this.onCloseDrawer();
  }

  onCloseDrawer(): void {
    this.zone.run(() => (this.openPanel = null));
  }

  onOkDelete(): void {
    this.service.delete(this.route.snapshot.params['id']).subscribe(() => {
      this.goToManagersPage();
    });
  }

  onCancelDelete(): void {
    this.isDeleteModalVisible = false;
  }
}
