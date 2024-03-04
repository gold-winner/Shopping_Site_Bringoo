import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss'],
})
export class CardStepComponent {
  @Input() title1: string = '';
  @Input() title2: string = '';
  @Input() content1: string = '';
  @Input() content2: string = '';
  @Input() no: string = '';
}
