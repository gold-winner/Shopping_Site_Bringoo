import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

import { DEFAULT_CURRENCY_SYMBOL } from '../../../../../../shared/const/default-currency-symbol.const';

@Component({
  selector: 'app-voucher-summary',
  templateUrl: './voucher-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherSummaryComponent {
  private _voucher!: any;
  defaultCurrency: string = DEFAULT_CURRENCY_SYMBOL;

  @Input() set voucher(value: any) {
    this._voucher = value;
    const startDate: any = value.dateStart;
    this.activeToday = differenceInCalendarDays(startDate, new Date()) === 0;
  }

  get voucher(): any {
    return this._voucher;
  }

  getField(field: string): any {
    const settings: any = { ...this._voucher, ...this._voucher.discount, ...this._voucher.freeShipping };

    if (settings && field in settings) {
      return settings[field] ?? '';
    }
    return '';
  }

  getArray(field: string): string[] {
    const settings: any = { ...this._voucher.discount, ...this._voucher.freeShipping };

    if (settings && field in settings) {
      return settings[field] ?? [];
    }

    return [];
  }

  activeToday: boolean = false;
}
