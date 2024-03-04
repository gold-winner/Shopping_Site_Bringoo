import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { LangCodeEnum, StoreEntity } from '../../../../../../shared/api/auth/data-contracts';
import { StoreDetailsService } from '../../../../services/store-details.service';

@UntilDestroy()
@Component({
  selector: 'app-store-assets',
  templateUrl: './store-assets.component.html',
  styleUrls: ['store-assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreAssetsComponent implements OnInit {
  form!: UntypedFormGroup;
  id: string;
  storeName$: Observable<string> = this.storeDetailsService.storeName$;
  isLoading$: Observable<boolean> = this.service.isLoading$;

  constructor(
    public readonly storeDetailsService: StoreDetailsService,
    private readonly service: CrudStoreService,
    private readonly activeRoute: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {
    this.id = this.route.parent?.snapshot.params['id'] || '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      logoUrl: [null],
      rectLogoUrl: [null],
      heroImgUrl: [null],
      promoImgUrl: [null],
      landingImgUrl: [null],
      primaryColor: [null],
      secondaryColor: [null],
      navbarColor: [null],
      isProductCardColorUsed: [null],
      productCardColor: [null],
      isProductCategoryCardColorUsed: [null],
      productCategoryCardColor: [null],
    });

    this.getStoreInformation();
  }

  getStoreInformation(): void {
    this.service
      .findOne(this.activeRoute.parent?.snapshot.params['id'], {
        lang: LangCodeEnum.ALL,
        fields: Object.keys(this.form.controls).join(','),
        softDelete: true,
      })
      .pipe(untilDestroyed(this), take(1))
      .subscribe((value: StoreEntity) => {
        this.form.patchValue(value);
      });
  }

  onSubmit(): void {
    this.service
      .update(this.activeRoute.parent?.snapshot.params['id'], this.form.value)
      .subscribe(() => this.notification.success('Store assets', 'Successfully updated'));
  }

  onCancel(): void {
    this.getStoreInformation();
  }
}
