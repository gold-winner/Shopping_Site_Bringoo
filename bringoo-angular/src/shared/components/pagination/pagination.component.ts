import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import IItem from '../dropdown/item.interface';

@Component({
  selector: 'ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 100;
  @Input() pageCount: number = 10;
  @Output() changePageSize = new EventEmitter<number>();
  @Output() clickPageItem = new EventEmitter<number>();
  pages: number[] = [];
  pageSizeData: IItem[] = [];
  selectedPageSize?: IItem = {} as IItem;
  start: number = 1;
  end: number = 10;

  pageItemClick(page: number): void {
    this.currentPage = page;
    this.start = this.pageSize * (this.currentPage - 1) + 1;
    if (this.total - (this.currentPage - 1) * 10 < 10) this.end = this.total;
    else this.end = this.pageSize * this.currentPage;
    this.clickPageItem.emit(this.currentPage);
  }

  pageChangeClick(direction: number): boolean {
    if (direction === -1 && this.currentPage === 1) {
      return false;
    }

    if (direction === 1 && this.currentPage + 1 > Math.ceil(this.total / this.pageSize)) {
      return false;
    }

    if (direction === -1) {
      this.currentPage = this.currentPage - 1;
      if (!this.pages.includes(this.currentPage)) {
        this.pages.pop();
        this.pages.unshift(this.currentPage);
      }
    } else {
      this.currentPage = this.currentPage + 1;
      if (!this.pages.includes(this.currentPage)) {
        this.pages.push(this.currentPage);
        this.pages.shift();
      }
    }
    this.clickPageItem.emit(this.currentPage);
    return true;
  }

  initPages(): void {
    const numbers: number[] = [1, 2, 3, 4, 5];
    this.pages = [];
    for (const num of numbers) {
      if (this.currentPage % 5 !== 0) {
        if (this.currentPage - (this.currentPage % 5) + num <= Math.ceil(this.total / this.pageSize)) {
          this.pages.push(this.currentPage - (this.currentPage % 5) + num);
        }
      } else if (this.currentPage % 5 === 0) {
        if (this.currentPage - (this.currentPage % 5) + num <= Math.ceil(this.total / this.pageSize)) {
          this.pages.push(this.currentPage - 5 + num);
        }
      }
    }
    this.start = this.pageSize * (this.currentPage - 1) + 1;
    if (this.total - (this.currentPage - 1) * this.pageSize < this.pageSize) this.end = this.total;
    else this.end = this.pageSize * this.currentPage;
  }

  onChangePageSize(item: IItem): void {
    this.pageSize = Number(item.id);
    this.initPages();
    this.changePageSize.emit(this.pageSize);
  }

  ngOnInit(): void {
    this.initPages();
    this.pageSizeData = [
      {
        id: 10,
        value: '10 / page',
      },
      {
        id: 20,
        value: '20 / page',
      },
    ];
    this.selectedPageSize = this.pageSizeData.find((p: IItem) => p.id === this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageSize || changes.total || changes.pageCount) {
      this.currentPage = 1;
      this.initPages();
    } else if (changes.currentPage) {
      this.initPages();
    }
  }
}
