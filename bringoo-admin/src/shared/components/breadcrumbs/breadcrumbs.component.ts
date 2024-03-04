import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { BreadCrumbModel } from '../../models/bread-crumb-model.model';
import { BreadCrumbService } from '../../services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: 'breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex align-items-center' },
})
export class BreadcrumbsComponent {
  @Input() startPath: string = '';
  breadCrumbs$!: Observable<BreadCrumbModel[]>;

  constructor(private readonly breadCrumbService: BreadCrumbService) {
    this.breadCrumbs$ = this.breadCrumbService.breadcrumbs$;
  }
}
