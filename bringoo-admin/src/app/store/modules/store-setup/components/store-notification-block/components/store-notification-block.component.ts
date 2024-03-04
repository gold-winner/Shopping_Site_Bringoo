import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppManagerStoreNotificationBlockService } from '../../../../../../../shared/api/auth/app-manager-store-notification-block.service';
import { PushNotificationCodeEnum, StoreNotificationBlockEntity } from '../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-store-notification-block',
  templateUrl: './store-notification-block.component.html',
  // styleUrls: ['store-notification-blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreNotificationBlocksComponent {
  isLoading$: Observable<boolean> = this.service.isLoading$;
  storeId: string;
  notificationCodes: PushNotificationCodeEnum[] = Object.values(PushNotificationCodeEnum);
  notificationCodeStates!: Record<string, boolean>;
  blocksRequest$!: Observable<StoreNotificationBlockEntity[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: AppManagerStoreNotificationBlockService,
    private readonly notification: NzNotificationService,
  ) {
    this.storeId = this.activeRoute.parent?.snapshot.params['id'] || this.activeRoute.parent?.parent?.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBlockOptions();
  }

  getBlockOptions(): void {
    this.blocksRequest$ = this.service.getByStoreId(this.storeId).pipe(
      tap((blocks: StoreNotificationBlockEntity[]) => {
        this.notificationCodeStates = {};

        for (const notificationCode of this.notificationCodes) {
          this.notificationCodeStates[`${notificationCode}_instant`] = blocks.some(
            (block: StoreNotificationBlockEntity) => block.isInstantDelivery && block.notificationCode === notificationCode,
          );

          this.notificationCodeStates[`${notificationCode}_prescheduled`] = blocks.some(
            (block: StoreNotificationBlockEntity) => !block.isInstantDelivery && block.notificationCode === notificationCode,
          );
        }
      }),
    );
  }

  toggleBlock(blockAction: any, notificationCode: PushNotificationCodeEnum, isInstantDelivery: boolean): void {
    if (blockAction) {
      this.enableBlock(notificationCode, isInstantDelivery);
    } else {
      this.disableBlock(notificationCode, isInstantDelivery);
    }
  }

  enableBlock(notificationCode: PushNotificationCodeEnum, isInstantDelivery: boolean): void {
    this.service.enable({ notificationCode, isInstantDelivery, storeId: this.storeId }).subscribe(() => {
      this.notification.create('warning', 'Blocked', `${notificationCode}: ${isInstantDelivery ? 'Instant' : 'Prescheduled'}`, {
        nzDuration: 2000,
        nzPlacement: 'bottomLeft',
      });
    });
  }

  disableBlock(notificationCode: PushNotificationCodeEnum, isInstantDelivery: boolean): void {
    this.service.disable({ notificationCode, isInstantDelivery, storeId: this.storeId }).subscribe(() => {
      this.notification.create('success', 'Allowed', `${notificationCode}: ${isInstantDelivery ? 'Instant' : 'Prescheduled'}`, {
        nzDuration: 2000,
        nzPlacement: 'bottomLeft',
      });
    });
  }
}
