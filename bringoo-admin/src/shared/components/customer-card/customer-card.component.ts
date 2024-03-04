import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CustomerEntity } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCardComponent implements OnInit {
  @Input() isEdited: boolean = false;
  @Input() placeHolder: string = '';
  @Output() edit: EventEmitter<CustomerEntity> = new EventEmitter<CustomerEntity>();
  @Input() customer!: CustomerEntity | undefined;

  onEdit(): void {
    this.edit.emit();
  }

  ngOnInit(): void {}
}
