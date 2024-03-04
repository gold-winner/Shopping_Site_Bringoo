import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { BreadCrumbService } from '../../../../../../../../shared/services/bread-crumb.service';

@UntilDestroy()
@Component({
  selector: 'app-product-subcategory-filter-form',
  templateUrl: './product-subcategory-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSubcategoryFilterFormComponent extends DynamicFilterFormComponent implements AfterViewInit {
  private categoryCode: string = 'Subcategory';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private route: ActivatedRoute, private breadCrumbService: BreadCrumbService) {
    super();
  }

  beforeInit(): void {
    if (this.route.parent?.snapshot.url[0].path) {
      this.categoryCode = this.route.parent?.snapshot.url[0].path;
    }
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    if (!search) {
      return { s: JSON.stringify({ categoryCode: this.categoryCode }) };
    }
    return {
      s: JSON.stringify({
        $and: [
          { categoryCode: this.categoryCode },
          {
            $or: [
              {
                name_i18n: { $contL: search },
              },
              {
                code: { $contL: search },
              },
            ],
          },
        ],
      }),
    };
  }

  ngAfterViewInit(): void {
    this.addBreadCrumbs();
  }

  addBreadCrumbs(): void {
    this.breadCrumbService.addBreadCrumbs([
      {
        path: `settings/product-management/product-category/${this.categoryCode}`,
        title: this.categoryCode,
      },
    ]);
  }
}
