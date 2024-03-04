import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../models/user';
import { UserApiService } from '../../services/user.api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  total = 1;
  dataList: User[] = [];
  loading$: Observable<boolean> = this.loadingService.isLoading$;
  pageSize = 10;
  pageIndex = 1;

  selectedItem: User | undefined;

  nameSearch = false;
  nameSearchTerm: string = '';

  createVisible = false;
  updateVisible = false;

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>,
  ): void {
    // eslint-disable-next-line @typescript-eslint/typedef
    this.userApiService.getPage(pageIndex, pageSize, sortField, sortOrder, filter).subscribe((data) => {
      this.total = 200; // mock the total data here
      this.dataList = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    // eslint-disable-next-line @typescript-eslint/typedef
    const currentSort = sort.find((item) => item.value !== null);
    // eslint-disable-next-line @typescript-eslint/typedef
    const sortField = (currentSort && currentSort.key) || null;
    // eslint-disable-next-line @typescript-eslint/typedef
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private userApiService: UserApiService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }

  onShowCreateForm(): void {
    this.createVisible = true;
  }

  onCloseDrawer(): void {
    this.createVisible = false;
    this.updateVisible = false;
  }

  onCreate(user: User): void {
    this.userApiService.create(user);
  }

  onUpdate(user: User): void {
    this.userApiService.update(user);
  }

  onShowUpdateForm(user: User): void {
    this.selectedItem = user;
    this.updateVisible = true;
  }

  search(): void {}

  reset(): void {
    this.nameSearchTerm = '';
  }
}
