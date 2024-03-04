import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { CrudManagerRoleService } from '../../api/auth/crud-manager-role.service';
import { ManagerRoleEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-manager-role-select',
  templateUrl: 'manager-role-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ManagerRoleSelectComponent),
      multi: true,
    },
  ],
})
export class ManagerRoleSelectComponent extends CustomControlComponent<string> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Manager Role';
  @Input() label: string = 'Manager Role';
  private _required: boolean = false;
  @Input() set required(value: boolean) {
    this._required = value;
    if (value) {
      this.control.setValidators(Validators.required);
    } else {
      this.control.clearValidators();
    }
  }

  get required(): boolean {
    return this._required;
  }

  roleSelectOptions: SelectOptions<ManagerRoleEntity> = {
    service: this.service,
    fields: ['code'],
    filter: [['isActive', CondOperator.EQUALS, true].join('||')],
    valueKey: 'code',
    getLabel(item: ManagerRoleEntity): string {
      return item.code || '---';
    },
    search(term: string): string[] {
      return [['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  constructor(private service: CrudManagerRoleService, protected readonly inj: Injector) {
    super(inj);
  }
}
