import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { REPORTS_PATH } from '../../reports.router.module';
import { reportSection } from '../../types/report-filter';

@Component({
  selector: 'app-reports-filters',
  templateUrl: './reports-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsFiltersComponent {
  @Input() filters: reportSection[] = [];
  @Input() value: string | number | null = '';
  status: boolean = false;

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() label: string = '';

  filtersPath: string[] = REPORTS_PATH;

  onShowMore(): void {
    this.status = !this.status;
  }
}
