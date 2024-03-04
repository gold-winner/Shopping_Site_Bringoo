import { Pipe, PipeTransform } from '@angular/core';

import { CardLink, SettingsCardModel } from '../models/settings-card.model';

@Pipe({ name: 'cardsFilter' })
export class CardsPipe implements PipeTransform {
  transform(value: SettingsCardModel[], str: string): SettingsCardModel[] {
    if (str) {
      return value.filter((value: SettingsCardModel) => {
        const result: boolean =
          value.title.toLowerCase().includes(str.toLowerCase()) ||
          value.links.some((v: CardLink) => v.title.toLowerCase().includes(str.toLowerCase()));
        return result;
      });
    }
    return value;
  }
}
