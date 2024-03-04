import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppManagerStoreServiceSubService } from '../../../../../../../shared/api/auth/app-manager-store-service-sub.service';
import { StoreServiceSubCodeEnum, StoreServiceSubEntity } from '../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-store-service-sub',
  templateUrl: './store-service-sub.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreServiceSubComponent {
  isLoading$: Observable<boolean> = this.service.isLoading$;
  storeId: string;
  storeServiceSubCodes: StoreServiceSubCodeEnum[] = Object.values(StoreServiceSubCodeEnum);
  storeServiceSubCodeStates!: Record<string, boolean>;
  subsRequest$!: Observable<StoreServiceSubEntity[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private readonly service: AppManagerStoreServiceSubService,
    private readonly notification: NzNotificationService,
  ) {
    this.storeId = this.activeRoute.parent?.snapshot.params['id'] || this.activeRoute.parent?.parent?.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getServiceSubsOptions();
  }

  getServiceSubsOptions(): void {
    this.subsRequest$ = this.service.getByStoreId(this.storeId).pipe(
      tap((subs: StoreServiceSubEntity[]) => {
        this.storeServiceSubCodeStates = {};

        for (const storeServiceSubCode of this.storeServiceSubCodes) {
          this.storeServiceSubCodeStates[`${storeServiceSubCode}`] = subs.some(
            (serviceSub: StoreServiceSubEntity) => serviceSub.storeServiceSubCode === storeServiceSubCode,
          );
        }
      }),
    );
  }

  toggleSub(subAction: any, storeServiceSubCode: StoreServiceSubCodeEnum): void {
    if (subAction) {
      this.enableSub(storeServiceSubCode);
    } else {
      this.disableSub(storeServiceSubCode);
    }
  }

  enableSub(storeServiceSubCode: StoreServiceSubCodeEnum): void {
    this.service.enable({ storeServiceSubCode, storeId: this.storeId }).subscribe(() => {
      this.notification.create('success', 'Enabled', storeServiceSubCode, {
        nzDuration: 2000,
        nzPlacement: 'bottomLeft',
      });
    });
  }

  disableSub(storeServiceSubCode: StoreServiceSubCodeEnum): void {
    this.service.disable({ storeServiceSubCode, storeId: this.storeId }).subscribe(() => {
      this.notification.create('warning', 'Disabled', storeServiceSubCode, {
        nzDuration: 2000,
        nzPlacement: 'bottomLeft',
      });
    });
  }
}
