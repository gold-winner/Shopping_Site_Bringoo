import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductUnitEntity } from '../../api/auth/data-contracts';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  checked = false;
  indeterminate = false;
  page: number = 1;

  @Input('listOfData') listOfData: ReadonlyArray<ProductUnitEntity> = [];
  @Input('total') total!: number;
  @Input('limit') limit!: number;
  @Output('Edit') Edit: EventEmitter<string> = new EventEmitter<string>();
  setOfCheckedId = new Set<string>();

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    // const listOfEnabledData: ReadonlyArray<ProductUnitEntity> = this.listOfData;
    // this.checked = listOfEnabledData.every((prod: ProductUnitEntity) => this.setOfCheckedId.has(prod.id!));
    // this.indeterminate = listOfEnabledData.some((prod: ProductUnitEntity) => this.setOfCheckedId.has(prod.id!)) && !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAllChecked(checked: boolean): void {
    this.refreshCheckedStatus();
  }

  onEdit(id: string): void {
    this.Edit.emit(id);
  }

  ngOnInit(): void {}
}
