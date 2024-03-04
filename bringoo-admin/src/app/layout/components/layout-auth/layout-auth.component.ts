import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-layout-auth',
  templateUrl: './layout-auth.component.html',
  styleUrls: ['./layout-auth.component.scss'],
  host: { class: 'h-100p' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuthComponent {
  isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  constructor(private readonly loadingService: LoadingService) {}
}
