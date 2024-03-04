import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CrudCustomerService } from '../../../../../../shared/api/auth/crud-customer.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { CrudVoucherService } from '../../../../../../shared/api/auth/crud-voucher.service';
import { CustomerEntity, LangCodeEnum, Pageable, StoreEntity, VoucherEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherDetailComponent implements OnInit {
  join: string[] = ['discount', 'freeShipping', 'manager', 'manager.settings'];
  dateFormat: string = DATE_FORMAT;
  voucherId: string = this.route.snapshot.params['id'];
  voucher$: BehaviorSubject<VoucherEntity> = new BehaviorSubject({} as VoucherEntity);

  customers$: Observable<CustomerEntity[]> = this.voucher$.pipe(
    switchMap((voucher: VoucherEntity) => {
      if (!voucher || !voucher.customerIds) {
        return [];
      }

      return this.crudCustomerService
        .find({
          join: ['settings'],
          s: JSON.stringify({
            $and: [{ id: { $in: voucher.customerIds } }],
          }),
        })
        .pipe(map(({ items }: Pageable & { items?: CustomerEntity[] }) => items || []));
    }),
  );

  stores$: Observable<StoreEntity[]> = this.voucher$.pipe(
    switchMap((voucher: VoucherEntity) => {
      if (!voucher || !voucher.storeIds) {
        return [];
      }

      return this.crudStoreService
        .find({
          s: JSON.stringify({
            $and: [{ id: { $in: voucher.storeIds } }],
          }),
        })
        .pipe(map(({ items }: Pageable & { items?: StoreEntity[] }) => items || []));
    }),
  );

  constructor(
    public readonly crudService: CrudVoucherService,
    public readonly crudStoreService: CrudStoreService,
    public readonly crudCustomerService: CrudCustomerService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadVoucher();
  }

  loadVoucher(): void {
    this.crudService
      .findOne(this.voucherId, {
        lang: LangCodeEnum.ALL,
        join: this.join,
      })
      .subscribe((voucher: VoucherEntity) => {
        this.voucher$.next(voucher);
      });
  }
}
