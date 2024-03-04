import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { OrderStatusEnum } from '../../../../../../../../../shared/api/auth/data-contracts';
import { OrdersFilterFormComponent } from '../../../../../../../../../shared/components/orders-filter-form/orders-filter-form.component';
import { NavigationService } from '../../../../../../../../../shared/services/navigation.service';

@UntilDestroy()
@Component({
  selector: 'app-filter-form',
  templateUrl: '../../../../../../../../../shared/components/orders-filter-form/orders-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent extends OrdersFilterFormComponent {
  orderStatusItems: string[] = Object.keys(OrderStatusEnum);

  constructor(readonly fb: UntypedFormBuilder, readonly route: ActivatedRoute, private readonly navigationService: NavigationService) {
    super(fb, route);
    this.observeOnStoreId();
  }

  observeOnStoreId(): void {
    this.navigationService.navigationEnd$
      .pipe(
        untilDestroyed(this),
        map(() => this.route.snapshot.queryParams['storeId']),
        distinctUntilChanged(),
      )
      .subscribe((storeId: string) => {
        this.form.patchValue({ storeId });
      });
  }
}
