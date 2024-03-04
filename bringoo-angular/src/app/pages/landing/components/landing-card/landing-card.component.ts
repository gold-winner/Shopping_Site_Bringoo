import { Component, Input, OnInit } from '@angular/core';

import { landingCardType } from '../../landing.component';
@Component({
  selector: 'ui-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss'],
})
export class LandingCardComponent implements OnInit {
  @Input() data: landingCardType = {} as landingCardType;

  ngOnInit(): void {}
}
