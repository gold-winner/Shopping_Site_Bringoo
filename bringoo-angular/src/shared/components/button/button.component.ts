import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges, OnInit {
  @Input() color: 'primary' | 'secondary' | 'dark' | 'red' | 'white' | 'cart' | 'blue' | 'grey' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() radius: 'sm' | 'md' | 'lg' | 'xlg' | 'bt' | 'tb' = 'md';
  @Input() width: 'full' | 'inline' | 'square' = 'inline';
  @Input() disabled: boolean = false;
  @Input() fill: 'fill' | 'outline' | 'transparent' = 'fill';
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<Event>();

  classes: string[] = [];

  ngOnInit(): void {
    this.classes = this.getClasses();
  }

  ngOnChanges(): void {
    this.classes = this.getClasses();
  }

  private getClasses(): string[] {
    return ['ui-btn', `ui-btn_${this.color}`, `ui-btn_${this.size}-${this.width}`, `border-radius-${this.radius}`, this.fill];
  }
}
