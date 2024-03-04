import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card-recently',
  templateUrl: './card-recently.component.html',
  styleUrls: ['./card-recently.component.scss'],
})
export class CardRecentlyComponent {
  @Input() productType: string | undefined;
}
