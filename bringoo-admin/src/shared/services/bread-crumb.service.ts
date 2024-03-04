import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BreadCrumbModel } from '../models/bread-crumb-model.model';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private readonly breadcrumbsSubject: BehaviorSubject<BreadCrumbModel[]> = new BehaviorSubject<BreadCrumbModel[]>([]);

  public breadcrumbs$: Observable<BreadCrumbModel[]> = this.breadcrumbsSubject.asObservable();

  private isCustom: boolean = false;

  get custom(): boolean {
    return this.isCustom;
  }

  addBreadCrumbs(breadcrumbs: BreadCrumbModel[]): void {
    const breadCrumbs: BreadCrumbModel[] = [...this.breadcrumbsSubject.getValue(), ...breadcrumbs];
    this.breadcrumbsSubject.next(breadCrumbs);
  }

  get breadCrumbs(): BreadCrumbModel[] {
    return this.breadcrumbsSubject.value;
  }

  resetBreadCrumbs(breadcrumbs: BreadCrumbModel[], isCustom: boolean = false): void {
    if (this.isCustom) {
      this.isCustom = !this.isCustom;
    } else {
      this.isCustom = isCustom;
      this.breadcrumbsSubject.next(breadcrumbs);
    }
  }
}
