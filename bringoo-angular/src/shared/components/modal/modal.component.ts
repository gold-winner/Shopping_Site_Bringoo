import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AppStore } from 'src/shared/api/app-store';
import { ProductLinkDetailsDto } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() opened: any = null;
  @Input() smallSize: boolean = false;
  @Input() isProduct: boolean = false;
  @Input() productModal: string | undefined;
  @Output() onClose = new EventEmitter<Event>();
  title: string = '';

  constructor(public readonly appStore: AppStore, private ref: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productModal) {
      if (this.productModal) {
        this.title = '';
        this.appStore.productDetailsByLink(this.productModal).subscribe(
          (res: ProductLinkDetailsDto) => {
            this.title = `${res.categoryName} > ${res.subcategoryName}`;
            this.ref.detectChanges();
          },
          (err: any) => {
            if (err.status === 401) window.location.href = '/';
          },
        );
      }
    }
  }
}
