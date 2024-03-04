import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, pairwise, switchMap } from 'rxjs/operators';

import { AppManagerCustomerService } from '../../../../../../shared/api/auth/app-manager-customer.service';
import { CrudCustomerService } from '../../../../../../shared/api/auth/crud-customer.service';
import { CrudCustomerBanService } from '../../../../../../shared/api/auth/crud-customer-ban.service';
import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import {
  CustomerAddressEntity,
  CustomerEntity,
  CustomerNotificationSettingsInput,
  LangCodeEnum,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetailComponent implements OnInit {
  dateTimeFormat: string = DATE_TIME_FORMAT;
  form: UntypedFormGroup = this.fb.group({
    customerTags: [null],
  });

  customerLanguageController: UntypedFormControl = new UntypedFormControl(null);
  customerResetPasswordModal: boolean = false;
  customerErasePersonalDataModal: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private service: CrudCustomerService,
    private orderService: CrudOrderService,
    private crudCustomerBanService: CrudCustomerBanService,
    private breadCrumbService: BreadCrumbService,
    private readonly fb: UntypedFormBuilder,
    private readonly nzNotification: NzNotificationService,
    private readonly appManagerCustomerService: AppManagerCustomerService,
  ) {
    this.getId();
  }

  updateCustomer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  customer$: Observable<CustomerEntity> = this.updateCustomer.asObservable().pipe(
    filter(Boolean),
    untilDestroyed(this),
    switchMap(() => {
      return this.service.findOne(this.id, {
        join: ['settings', 'notificationSettings', 'addresses', 'emailCodes'],
        softDelete: true,
      });
    }),
    catchError((error: any) => {
      this.goToCustomersPage();
      return throwError(error);
    }),
  );

  notificationSettings: string[] = ['newProductArrivals', 'sales', 'deliveryStatusChange'];

  totalIncome$!: Observable<number>;

  isActive: boolean = false;

  isDeleteModalVisible: boolean = false;
  id: string = '';
  totalCount: number = 0;

  openPanel: 'overview' | 'info' | 'note' | undefined;

  submitEvent: symbol = Symbol('k');

  ngOnInit(): void {
    this.setBreadCrumbs();
    this.changeCustomerLanguage();
    this.totalIncome$ = this.orderService.findTotalIncomeByCustomer(this.id);

    this.service
      .findOne(this.id, { fields: 'customerTags', join: ['settings'], lang: LangCodeEnum.ALL, softDelete: true })
      .subscribe((findValue: CustomerEntity) => {
        const customerTags: string[] = findValue?.customerTags?.length ? findValue.customerTags : [];
        this.form.setValue({ customerTags });
        this.customerLanguageController.setValue(findValue.settings?.customerLanguageCode);
      });
  }

  private getId(): void {
    this.id = this.route.snapshot.params['id'];
  }

  updateBanState(): void {
    this.crudCustomerBanService.isCustomerBanned(this.id).subscribe((res: any) => {
      this.isActive = res.isActive;
    });
  }

  changeCustomerLanguage(): void {
    this.customerLanguageController.valueChanges
      .pipe(
        untilDestroyed(this),
        pairwise(),
        filter(([prevCode, curCode]: [LangCodeEnum, LangCodeEnum]) => prevCode !== curCode && !!prevCode),
        map((codes: [LangCodeEnum, LangCodeEnum]) => codes[1]),
        switchMap((lang: LangCodeEnum) => this.service.update(this.id, { settings: { customerLanguageCode: lang } })),
      )
      .subscribe(() => this.nzNotification.success('Updated customer language', 'Language successfully updated.'));
  }

  setBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: `users/customers/details/${this.id}`,
        title: 'Customer detail',
      },
    ]);
  }

  getMainAddressStr(address?: CustomerAddressEntity[]): string {
    const defaultAddress: CustomerAddressEntity | undefined = address?.find((value: CustomerAddressEntity) => value.isDefault);
    return defaultAddress
      ? `${defaultAddress.streetName} ${defaultAddress.streetNumber}, ${defaultAddress?.zipCode}, ${defaultAddress?.city}`
      : 'No address';
  }

  goToCustomersPage(): void {
    this.router.navigate(['/users/customers']);
  }

  notificationSettingsChange(customerEntity: CustomerEntity, key: string, value: string): void {
    const notificationSettings: CustomerNotificationSettingsInput = {
      newProductArrivals: customerEntity?.notificationSettings?.newProductArrivals || false,
      sales: customerEntity?.notificationSettings?.sales || false,
      deliveryStatusChange: customerEntity?.notificationSettings?.deliveryStatusChange || false,
      [key]: value,
    };

    this.service.update(this.id, { notificationSettings }).subscribe(() => {
      Object.assign(customerEntity.notificationSettings ?? {}, notificationSettings);
    });
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

  onOkDelete(): void {
    this.service.delete(this.id).subscribe(() => {
      this.goToCustomersPage();
    });
  }

  onCancelDelete(): void {
    this.isDeleteModalVisible = false;
  }

  onSaveTags(): void {
    const customerTags: string[] = this.form.get('customerTags')?.value || null;
    this.service.update(this.id, { customerTags }).subscribe(
      () => {
        this.nzNotification.success('Updated customer tags', 'Tags successfully updated.');
        this.updateCustomer.next(true);
      },
      () => this.nzNotification.error('Updated customer tags', 'Tags update error'),
    );
  }

  onCustomerResetPassword(email: string): void {
    this.appManagerCustomerService
      .sendResetPasswordEmail({ email })
      .subscribe(() => this.nzNotification.success('Send reset password email', 'Email has been sent.'));
    this.onHideResetPasswordModal();
  }

  onShowResetPasswordModal(): void {
    this.customerResetPasswordModal = true;
  }

  onHideResetPasswordModal(): void {
    this.customerResetPasswordModal = false;
  }

  onCustomerEraseData(id: string): void {
    this.appManagerCustomerService.deleteAccount(id).subscribe(() => {
      this.nzNotification.success('Erase personal data', 'Personal data has been deleted.');
      this.updateCustomer.next(true);
    });
    this.onHideErasePersonalDataModal();
  }

  onShowErasePersonalDataModal(): void {
    this.customerErasePersonalDataModal = true;
  }

  onHideErasePersonalDataModal(): void {
    this.customerErasePersonalDataModal = false;
  }
}
