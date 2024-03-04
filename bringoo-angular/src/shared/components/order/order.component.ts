import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() status: string = 'pending';
  @Input() selected: boolean = false;
  @Input() id: string = '';
  @Output() onSelect = new EventEmitter<Event>();

  titleColor: string = '';
  title: string = '';

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (this.status === 'pending') {
      this.titleColor = 'text-green';
      this.title = 'Pending Delivery';
    } else if (this.status === 'delivered') {
      this.titleColor = 'text-blue';
      this.title = 'Delivered';
    } else {
      this.titleColor = 'text-red';
      this.title = 'Not Submit';
    }
  }
}
