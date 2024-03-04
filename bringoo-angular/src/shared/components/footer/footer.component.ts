import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Output() onScrollTopClick = new EventEmitter<Event>();
}
