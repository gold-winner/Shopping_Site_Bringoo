import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { CrudProductConsultationRequestService } from '../../../../../shared/api/auth/crud-product-consultation-request.service';
import { ProductConsultationRequestEntity } from '../../../../../shared/api/auth/data-contracts';
import { ProductConsultationService } from '../../../../../shared/api/auth/product-consultation.service';
import { DATE_TIME_FORMAT } from '../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'consultation-request-details',
  templateUrl: 'consultation-request-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .product-image {
        max-width: 50px;
        max-height: 50px;
      }
    `,
  ],
})
export class ConsultationRequestDetailsComponent extends DynamicForm<ProductConsultationRequestEntity> {
  dateTimeFormat: string = DATE_TIME_FORMAT;

  requestDetailsIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  requestDetailsData!: ProductConsultationRequestEntity;
  requestDetails$: Observable<ProductConsultationRequestEntity> = this.requestDetailsIdSubject.asObservable().pipe(
    filter<string>(Boolean),
    switchMap((id: string) =>
      this.crudService.findOne(id, {
        join: [
          'store||name_i18n,timeZone',
          'customer||id',
          'customer.settings||firstName,lastName',
          'product||name_i18n,imageUrls',
          'storeConsultant',
        ],
        fields: 'id',
      }),
    ),
  );

  isLoading$: Observable<boolean> = this.service.isLoading$;

  constructor(
    private readonly crudService: CrudProductConsultationRequestService,
    private readonly service: ProductConsultationService,
    private readonly notification: NzNotificationService,
    private nzImageService: NzImageService,
  ) {
    super();
  }

  beforePatch(value: ProductConsultationRequestEntity): ProductConsultationRequestEntity {
    this.requestDetailsData = value;
    this.requestDetailsIdSubject.next(value.id);
    return value;
  }

  onResendMessageToConsultant(): void {
    this.service
      .resendEmailToConsultant(this.requestDetailsData.id)
      .subscribe(() => this.notification.success('Resend Email', 'Email will be sent in the next 5 minutes'));
  }

  onImagePreview(originalUrl?: string): void {
    if (!originalUrl) {
      return;
    }
    this.nzImageService.preview(
      [
        {
          src: originalUrl,
        },
      ],
      { nzZoom: 1, nzRotate: 0 },
    );
  }
}
