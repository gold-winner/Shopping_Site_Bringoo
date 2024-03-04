import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-card-small',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss'],
})
export class CardSmallComponent {
  @Input() title1: string = '';
  @Input() title2: string = '';
  @Input() btnLabel: string = '';
  @Input() color: 'blue' | 'lightblue' | 'red' | 'green' = 'blue';
  @Input() imgUrl: string = '';
  @Output() onShowAllClick = new EventEmitter<Event>();
}
