import { ChangeDetectorRef, Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select/select.types';

import { CustomControlComponent } from '../../classes/custom-control.component';

@UntilDestroy()
@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListSelectComponent),
      multi: true,
    },
  ],
})
export class ListSelectComponent extends CustomControlComponent implements OnInit {
  @Input() isRequired: boolean = true;
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  _list!: NzSelectOptionInterface[];

  @Input('list') set list(values: string[]) {
    this._list = values.map((value: string) => ({
      value,
      label: value,
    }));
  }

  constructor(private readonly ref: ChangeDetectorRef, protected readonly inj: Injector) {
    super(inj);
  }

  writeValue(val: string | string[]): void {
    if (this.type === 'tags' || this.type === 'multiple') {
      if (Array.isArray(val)) {
        this.control.setValue([...val]);
      } else {
        this.control.setValue(val ? [val] : []);
      }
    } else {
      this.control.setValue(val);
    }

    this.ref.markForCheck();
  }

  onSelectAll(): void {
    this.control.patchValue(this._list.map(({ value }: NzSelectOptionInterface) => value));
  }

  onClearAll(): void {
    this.control.patchValue([]);
  }
}
