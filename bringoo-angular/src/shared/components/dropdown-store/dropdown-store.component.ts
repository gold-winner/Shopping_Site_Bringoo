import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppStore } from 'src/shared/api/app-store';
import { AppStoreControllerStoreParams, StoreDto } from 'src/shared/api/data-contracts';

@Component({
  selector: 'ui-dropdown-store',
  templateUrl: './dropdown-store.component.html',
  styleUrls: ['./dropdown-store.component.scss'],
})
export class DropdownStoreComponent implements OnInit {
  @Input() defaultValue!: string;
  @Input() items: Array<any> = [];
  @Input() isDefault: boolean = true;
  @Input() radius: boolean = true;
  @Input() background: boolean = true;
  opened: boolean = false;
  selectedItem!: any;
  storeName: string = '';

  constructor(public readonly appStore: AppStore, private ref: ChangeDetectorRef) {}

  onSelect(id: string): void {
    this.selectedItem = this.items.find((x: any) => x.id === id);
    this.opened = false;
    const paramsStore: AppStoreControllerStoreParams = {
      id: this.selectedItem.id,
      zipCode: localStorage.getItem('postal') ?? '',
    };
    this.appStore.store(paramsStore).subscribe(
      (res: StoreDto) => {
        sessionStorage.setItem('store', JSON.stringify(res));
        this.storeName = JSON.parse(sessionStorage.getItem('store') ?? '')
          .name_public_short_i18n.toLowerCase()
          .split(' ')
          .join('_');
        const url: string = `/${this.storeName}/products`;
        window.location.href = url;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onToggle(): void {
    this.opened = !this.opened;
  }

  ngOnInit(): void {}
}
