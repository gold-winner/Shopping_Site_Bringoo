import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private readonly router: Router, private readonly ngZone: NgZone) {}
  goToDash(): void {
    this.ngZone.run(() => this.router.navigate(['dashboard']));
  }
}
