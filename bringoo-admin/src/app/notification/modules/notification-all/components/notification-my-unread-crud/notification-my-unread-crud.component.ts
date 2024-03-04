import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { AppManagerPushNotificationHistoryService } from '../../../../../../shared/api/auth/app-manager-push-notification-history.service';
import { CrudPushNotificationHistoryService } from '../../../../../../shared/api/auth/crud-push-notification-history.service';
import { PushNotificationHistoryEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { PushNotificationService } from '../../../../../push-notification/services';
import { NotificationMyUnreadFilterFormComponent } from '../notification-my-unread-filter-form/notification-my-unread-filter-form.component';

@Component({
  selector: 'app-notification-my-unread-crud',
  templateUrl: './notification-my-unread-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMyUnreadCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = NotificationMyUnreadFilterFormComponent;
  reloadPage: symbol | undefined;

  fields: CrudFields<PushNotificationHistoryEntity> = ['title', 'body', 'create_date', 'data'];

  config: CrudConfig = {
    title: 'My unread notifications',
    plural: 'My unread notifications',
    single: 'My unread notification',
    formWidth: 600,
    formBundleWidth: 600,
    isDeleteButtonVisible: false,
    isDetailButtonVisible: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    actionsList: [
      {
        label: 'Mark as readed',
        action: (setOfChecked: Set<string>): void => {
          this.appManagerPushNotificationHistoryService
            .markHistoriesAsReaded({ ids: [...setOfChecked] })
            .pipe(switchMap(() => this.pushNotificationService.updateNotReadedNotifications()))
            .subscribe(() => {
              this.reloadPage = Symbol('reload');
              this.changeDetection.detectChanges();
            });
        },
      },
    ],
  };

  columns: CrudColumn<PushNotificationHistoryEntity>[] = [
    {
      label: 'Title',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.title;
      },
      type: 'text',
    },
    {
      label: 'Message',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.body;
      },
      type: 'text',
    },
    {
      label: 'Link',
      isSortable: false,
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return ` ${item?.data?.orderNumber ? item?.data?.orderNumber : 'Order'}`;
      },
      type: 'link',
      link(item: PushNotificationHistoryEntity): any {
        return `../../../orders/all/detail/${item?.data?.orderId}`;
      },
    },
    {
      label: 'Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: PushNotificationHistoryEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(
    public readonly service: CrudPushNotificationHistoryService,
    private readonly appManagerPushNotificationHistoryService: AppManagerPushNotificationHistoryService,
    private readonly pushNotificationService: PushNotificationService,
    private changeDetection: ChangeDetectorRef,
  ) {
    this.pushNotificationService.updateNotReadedNotifications().subscribe();
  }
}
