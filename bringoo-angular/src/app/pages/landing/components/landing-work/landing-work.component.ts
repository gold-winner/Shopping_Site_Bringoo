import { Component, OnInit } from '@angular/core';

export type cardType = {
  imgUrl: string;
  description: string;
};

@Component({
  selector: 'ui-landing-work',
  templateUrl: './landing-work.component.html',
  styleUrls: ['./landing-work.component.scss'],
})
export class LandingWorkComponent implements OnInit {
  cardData: cardType[] = [];

  ngOnInit(): void {
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
