import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SettingsCardModel } from '../../models/settings-card.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input('searches') searches: string = '';
  @Input('cards') cards: SettingsCardModel[] = [];
}
