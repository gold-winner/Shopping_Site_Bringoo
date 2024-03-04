import { ChangeDetectionStrategy, Component, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { CrudVendorTypeService } from '../../api/auth/crud-vendor-type.service';
import { Pageable, VendorTypeEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';

interface VendorTypeSubject {
  page: number;
  items: VendorTypeEntity[];
}

@UntilDestroy()
@Component({
  selector: 'app-vendor-type-select',
  templateUrl: './vendor-type-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VendorTypeSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorTypeSelectComponent extends CustomControlComponent implements OnInit {
  fields: string[] = ['code'];
  limits: number = 2;
  page: number = 1;

  vendorTypesSubject: BehaviorSubject<VendorTypeSubject> = new BehaviorSubject<VendorTypeSubject>({
    page: 1,
    items: [],
  });

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isEnd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loadMore(): void {
    this.isLoading.next(true);
    if (!this.isEnd.getValue()) {
      this.vendorType
        .find({
          fields: this.fields.join(','),
          page: this.vendorTypesSubject.getValue().page,
          limit: this.limits,
        })
        .pipe(untilDestroyed(this))
        .subscribe((data: Pageable & { items?: VendorTypeEntity[] }) => {
          if (data.items) this.loadVendorType({ items: data.items, page: data.page + 1 });
          if (data.page === data.pageCount) this.isEnd.next(true);
        });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadMore();
  }

  loadVendorType(value: { page: number; items: VendorTypeEntity[] }): void {
    const types: VendorTypeSubject = {
      ...this.vendorTypesSubject.getValue(),
      page: value.page,
      items: [...this.vendorTypesSubject.getValue().items, ...value.items],
    };
    this.vendorTypesSubject.next(types);
    this.isLoading.next(false);
  }

  constructor(private vendorType: CrudVendorTypeService, protected readonly inj: Injector) {
    super(inj);
  }
}
