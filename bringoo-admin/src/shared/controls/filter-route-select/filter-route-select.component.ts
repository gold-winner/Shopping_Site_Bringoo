import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudRouteService } from '../../api/auth/crud-route.service';
import { RouteEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-route-select',
  templateUrl: 'filter-route-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterRouteSelectComponent),
      multi: true,
    },
  ],
})
export class FilterRouteSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Route';
  @Input() label: string = 'Route filter';
  @Input() onlyActive: boolean = false;
  @Input() required: boolean = false;

  routeSelect: SelectOptions<RouteEntity> = {
    service: this.crudRouteService,
    fields: ['name', 'code', 'id'],
    sort: ['name,ASC'],
    valueKey: 'id',
    getLabel(item: RouteEntity): string {
      return item.name || item.code || '---';
    },
    search(term: string): string[] {
      return [
        ['name', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudRouteService: CrudRouteService, protected readonly inj: Injector) {
    super(inj);
  }

  ngOnInit(): void {
    this.setFilter();
    super.ngOnInit();
  }

  setFilter(): void {
    if (this.onlyActive) {
      this.routeSelect = {
        ...this.routeSelect,
        filter: [['isActive', CondOperator.EQUALS, 'true'].join('||')],
      };
    }
  }
}
