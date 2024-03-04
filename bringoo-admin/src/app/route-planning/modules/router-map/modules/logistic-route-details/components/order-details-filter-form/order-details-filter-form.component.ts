import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../../../../shared/api/auth/crud-route.service';
import { RouteEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';

@UntilDestroy()
@Component({
  selector: 'app-order-details-filter-form',
  templateUrl: 'order-details-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsFilterFormComponent implements OnInit {
  form = new FormGroup({
    routeId: new FormControl<string | null>(null),
  });

  routeSelect: SelectOptions<RouteEntity> = {
    service: this.crudRouteService,
    fields: ['name', 'id'],
    sort: ['queue,ASC'],
    valueKey: 'id',
    getLabel(item: RouteEntity): string {
      return item.name || '---';
    },
    search(term: string): string[] {
      return [['name', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly crudRouteService: CrudRouteService,
    private readonly logisticRoutesService: LogisticRoutesService,
  ) {
    this.subOnFormChanges();
  }

  ngOnInit(): void {
    this.logisticRoutesService.activeRoute$
      .pipe(
        untilDestroyed(this),
        tap((routeId: string | null) => {
          if (routeId !== this.form.value.routeId) {
            this.form.patchValue({ routeId });
          }
        }),
      )
      .subscribe();
  }

  subOnFormChanges(): void {
    this.form
      .get('routeId')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((routeId: string | null) => {
        if (routeId !== this.logisticRoutesService.activeRouteId) {
          this.logisticRoutesService.setActiveRoute(routeId);
        }
      });
  }
}
