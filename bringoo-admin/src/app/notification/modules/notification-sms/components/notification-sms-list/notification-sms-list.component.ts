import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { AppManagerSmsService } from '../../../../../../shared/api/auth/app-manager-sms.service';
import { PageableSmsTemplateDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-notification-sms-list',
  templateUrl: './notification-sms-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block p-8 h-100p' },
})
export class NotificationSmsListComponent implements OnInit {
  isLoading$: Observable<boolean> = this.service.isLoading$;
  smsTemplates$!: Observable<PageableSmsTemplateDto>;

  constructor(public readonly service: AppManagerSmsService) {}

  ngOnInit(): void {
    this.smsTemplates$ = this.service.getSmsTemplates();
  }
}
