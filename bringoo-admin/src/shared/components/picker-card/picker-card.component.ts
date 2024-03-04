import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StaffEntity } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-staff-card',
  templateUrl: './picker-card.component.html',
  styleUrls: ['./picker-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerCardComponent implements OnInit {
  @Input() isEdited: boolean = false;
  @Input() label: string = '';
  @Output() edit: EventEmitter<StaffEntity> = new EventEmitter<StaffEntity>();
  @Input() staff?: StaffEntity | null;
  @Input() type: 'picker' | 'driver' = 'picker';

  onEdit(): void {
    this.edit.emit();
  }

  ngOnInit(): void {}
}
