import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-match-string',
  templateUrl: 'search-match-string.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMatchStringComponent {
  @Input() value!: string;
  @Input() search!: string | null;
}
