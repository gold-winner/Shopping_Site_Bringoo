import { Component, OnInit } from '@angular/core';

import { cardType } from '../landing-work/landing-work.component';

@Component({
  selector: 'ui-landing-partners',
  templateUrl: './landing-partners.component.html',
  styleUrls: ['./landing-partners.component.scss'],
})
export class LandingPartnersComponent implements OnInit {
  images: string[] = [];
  cardData: cardType[] = [];

  ngOnInit(): void {
    this.images = ['fruits.png', 'fruits.png', 'fruits.png', 'fruits.png', 'fruits.png'];
    this.cardData = [
      {
        imgUrl: 'how-we-work1.png',
        description: 'Wähle ein Geschäft <br>in Deiner Nähe',
      },
      {
        imgUrl: 'how-we-work2.png',
        description: 'Wähle Deine <br>Produkte',
      },
      {
        imgUrl: 'how-we-work3.png',
        description: 'Wir holen Deine <br>Produkte',
      },
      {
        imgUrl: 'how-we-work4.png',
        description: 'Wir liefern in <br>45 Minuten',
      },
    ];
  }
}
