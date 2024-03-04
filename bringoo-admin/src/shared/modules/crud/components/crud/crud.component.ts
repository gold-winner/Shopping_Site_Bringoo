import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, switchMap, take, tap } from 'rxjs/operators';

import { FindInput, ImportDto, InputError, LangCodeEnum, Pageable } from '../../../../api/auth/data-contracts';
import { saveBlobAsFile } from '../../../../helpers/file-saver';
import { CrudApiService } from '../../../../interfaces/crud-api-service';
import { DynamicFilterFormComponent } from '../../classes/dynamic-filter-form.component';
import { DynamicForm } from '../../classes/dynamic-form.component';
import { CrudColumn } from '../../interfaces/crud-column';
import { CrudConfig } from '../../interfaces/crud-config';
import { DynamicFormInputs } from '../../interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../interfaces/dynamic-form-outputs';
import { CrudFields } from '../../types/crud-select.type';

@UntilDestroy()
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudComponent<T extends { id: string }> implements OnInit {
  constructor(
    private readonly router: Router,
    private nzImageService: NzImageService,
    private readonly route: ActivatedRoute,
    private elRef: ElementRef<HTMLElement>,
  ) {
    this.onRouteSamePage();
  }

  queryNameWithEditId: string = 'edit_entity_id';

  @ViewChild('filterFormContainer') filterFormContainer?: ElementRef;
  @ViewChild('titleContainer') titleContainer?: ElementRef;
  paginationContainer?: HTMLElement;

  nzBodyStyle: NgStyleInterface = {
    position: 'relative',
  };

  nzScroll: BehaviorSubject<{ x: string; y: string }> = new BehaviorSubject<{ x: string; y: string }>({
    x: 'auto',
    y: 'auto',
  });

  @Input() set reloadData(i: symbol | undefined) {
    if (i) {
      this.reloadPage();
    }
  }

  @Input() showCheckboxes: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() topMargin: boolean = true;
  @Input() horizontalPadding: number = 8;
  @Input() customImportParams: Record<string, string> | undefined;
  @Input() exportFileName: string | undefined;

  @Input() set service(s: CrudApiService<T>) {
    this._service = s;
    this.isLoading$ = s.isLoading$;
    s.errors$.pipe(untilDestroyed(this)).subscribe((errors: InputError[]) => {
      switch (this.openPanel) {
        case 'create': {
          this.createFormInputs = { errors };
          break;
        }
        case 'update': {
          this.updateFormInputs = { errors };
          break;
        }
        case 'patchBundle': {
          this.updateManyFormInputs = { errors };
          break;
        }
      }
    });
  }

  @Input() set config(config: CrudConfig) {
    this.crudConfig = {
      ...this.crudConfig,
      ...config,
    };
  }

  @Input() set cleatSelectedItems(symbol: Symbol | null) {
    if (symbol) {
      this.onClearSelection();
    }
  }

  @Input() createForm!: Type<DynamicForm>;
  @Input() updateForm!: Type<DynamicForm>;
  @Input() detailForm!: Type<DynamicForm>;
  @Input() updateManyForm!: Type<DynamicForm>;
  @Input() filterForm!: Type<DynamicFilterFormComponent>;
  @Input() fields: CrudFields<T> = [];
  @Input() join: string[] = [];
  @Input() joinForForms: string[] = [];
  @Input() columns!: CrudColumn<T>[];
  @Input() nameField: string = 'name_i18n';
  @Input() isSingleSelect: boolean = false;

  @Output() filterChanges: EventEmitter<FindInput> = new EventEmitter<FindInput>();
  @Output() onAction: EventEmitter<string> = new EventEmitter<string>();

  _customFilters: any;
  @Input() set customFilters(value: any) {
    if (value) {
      this._customFilters = value;
      const { s, ...filters } = this.searchSubject.getValue();
      let newS: string | null = null;

      if (s) {
        const sValue: any = JSON.parse(s);
        newS = JSON.stringify(sValue.$and[0]);
      }

      this.filter({ ...filters, ...(newS && { s: newS }), page: 1 });
    }
  }

  _defaultFilters: object = {};
  @Input() set defaultFilters(filters: object) {
    this._defaultFilters = filters;
    this.filterFormInputs = {
      value: { ...this.route.snapshot.queryParams },
      ...(filters && { defaultFilters: filters }),
    };
  }

  @Input() set defaultCheckedIds(ids: string[]) {
    this.setOfChecked = new Set(ids);
  }

  crudConfig: Required<CrudConfig> = {
    isCreateButtonVisible: true,
    isEditButtonVisible: true,
    isEditSubmitButtonVisible: true,
    isDeleteButtonVisible: true,
    isActionColumnVisible: true,
    isShowDefaultActions: true,
    isDetailButtonVisible: false,
    showReloadButton: true,
    isDragged: false,
    actionsList: [],
    onCreate: (input: any): Observable<any> | undefined => {
      return this._service.create ? this._service.create(input).pipe(untilDestroyed(this), take(1)) : undefined;
    },
    formWidth: 600,
    formBundleWidth: 600,
    single: 's',
    plural: 'p',
    title: '',
    subTitle: '',
    nzScrollX: '900px',
    useTableHeightCalculation: true,
    fixedActionColumn: true,
    fixedCheckboxColumn: true,
    patchUrlQueryFromFilterForm: true,
  };

  init: boolean = false;
  isFindOneAllowed: boolean = false;
  isCreateAllowed: boolean = false;
  isUpdateAllowed: boolean = false;
  isUpdateManyAllowed: boolean = false;
  isDeleteAllowed: boolean = false;
  isDeleteManyAllowed: boolean = false;
  isImportAllowed: boolean = false;
  isExportAllowed: boolean = false;

  startImport: symbol | undefined;
  importDto: ImportDto | null = null;

  searchSubject: BehaviorSubject<FindInput> = new BehaviorSubject<FindInput>({
    limit: 20,
    page: 1,
    fields: this.fields.join(','),
    join: this.join,
  });

  isDeleteModalVisible: boolean = false;
  isDeleteManyModalVisible: boolean = false;

  private _service!: CrudApiService<T>;
  private deletedId: string = '';
  private detailId: string = '';
  deletedName: string = '';
  detailName: string = '';
  private updateId: string = '';
  private updateIds: string[] = [];
  updateName: string = '';

  //global table config
  @Input() nzPageSizeOptions: number[] = [10, 20, 30, 50, 100];
  total: number = 0;
  page: number = 1;
  @Input() limit: number = 20;

  @Output() totalCount: EventEmitter<number> = new EventEmitter<number>();
  @Output('checkboxes') checkboxes: EventEmitter<string[]> = new EventEmitter<string[]>();
  setOfChecked: Set<string> = new Set<string>();
  checkedPage: boolean = false;

  items: T[] = [];
  draggedStartId: string = '';
  draggedDropId: string = '';
  @Output() draggedEnd: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();

  isLoading$: Observable<boolean> | undefined;

  openPanel: 'update' | 'patchBundle' | 'create' | 'import' | 'detail' | undefined;

  ngOnInit(): void {
    this.subscribeOnSearchParams();

    this.isCreateAllowed = typeof this._service.create === 'function' || !!this.crudConfig.onCreate;
    this.isFindOneAllowed = typeof this._service.findOne === 'function';
    this.isUpdateAllowed = typeof this._service.update === 'function';
    this.isUpdateManyAllowed = typeof this._service.updateMany === 'function' && Boolean(this.updateManyForm);
    this.isDeleteAllowed = typeof this._service.delete === 'function';
    this.isDeleteManyAllowed = typeof this._service.deleteMany === 'function';
    this.isImportAllowed = typeof this._service.import === 'function';
    this.isExportAllowed = typeof this._service.export === 'function';
    this.queryNameWithEditId = `${this.queryNameWithEditId}_${this.crudConfig.title.toLowerCase().replace(/ /g, '_')}`;

    this.init = true;

    this.filterFormInputs = {
      value: { ...this.route.snapshot.queryParams },
      ...(this._defaultFilters && { defaultFilters: this._defaultFilters }),
    };
    this.openUpdateFormByLink();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resizeTable();
  }

  resizeTable: () => void = (): void => {
    if (!this.paginationContainer) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.paginationContainer = this.elRef.nativeElement.querySelector('.ant-table-pagination')!;
    }

    const crud_container: HTMLDivElement = this.elRef.nativeElement.querySelector('.crud-container') as HTMLDivElement;

    const styles: CSSStyleDeclaration = window.getComputedStyle(crud_container);
    const crudTopPadding: number = Number.parseFloat(styles.getPropertyValue('padding-top'));
    const crudBottomPadding: number = Number.parseFloat(styles.getPropertyValue('padding-bottom'));

    const filterContainerHeight: number = this.filterFormContainer?.nativeElement.offsetHeight;
    const titleContainerHeight: number = this.titleContainer?.nativeElement.offsetHeight;
    const paginationContainerHeight: number = (this.paginationContainer?.offsetHeight ?? 24) + 16 * 2;
    const table_headerHeight: number = (crud_container.querySelector('.ant-table-header') as HTMLDivElement).offsetHeight;

    const maxHeight: number = crud_container.offsetHeight - crudTopPadding - crudBottomPadding;
    const tableHeight: number = maxHeight - (filterContainerHeight + titleContainerHeight + paginationContainerHeight + table_headerHeight);

    this.nzScroll.next({
      x: this.crudConfig.nzScrollX,
      y: this.crudConfig.useTableHeightCalculation ? `${tableHeight}px` : 'auto',
    });
  };

  createFormInputs: DynamicFormInputs = {
    value: null,
  };

  createFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: T): void => this.createItem(value),
    formValueChanges: (value: T): void => alert(value),
  };

  updateFormInputs: DynamicFormInputs = {
    value: null,
  };

  detailFormInputs: DynamicFormInputs = {
    value: null,
  };

  filterFormInputs: DynamicFormInputs = {
    value: null,
  };

  updateFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: T): void => this.updateItem(value),
    formValueChanges: (value: T): void => alert(value),
  };

  updateManyFormInputs: DynamicFormInputs = {
    value: null,
  };

  updateManyFormOutputs: DynamicFormOutputs = {
    formSubmit: (value: T): void => this.updateMany(value),
    formValueChanges: (value: T): void => alert(value),
  };

  filterFormOutputs: DynamicFormOutputs = {
    formValueChanges: (value: FindInput): void => this.filter(value),
    formSubmit: (value: FindInput): void => this.filterFormChange(value),
  };

  filterFormChange(value: any): void {
    if (this.crudConfig.patchUrlQueryFromFilterForm) {
      this.router.navigate([], { queryParams: value, queryParamsHandling: 'merge', replaceUrl: false });
    }
  }

  private createItem(input: any): void {
    this.crudConfig
      ?.onCreate(input)
      ?.pipe(untilDestroyed(this), take(1))
      .subscribe(() => {
        this.reloadPage();
        this.openPanel = undefined;
        this.onAction.emit('create');
      });
  }

  private updateItem(input: Record<string, any>): void {
    if (this._service.update) {
      this._service
        .update(this.updateId, input)
        .pipe(untilDestroyed(this), take(1))
        .subscribe(() => {
          this.reloadPage();
          this.setOfChecked.delete(this.updateId);
          this.openPanel = undefined;
          this.onAction.emit('update');
          this.router.navigate([], { queryParams: { [this.queryNameWithEditId]: undefined }, queryParamsHandling: 'merge' });
        });
    }
  }

  private updateMany(input: Record<string, any>): void {
    if (this._service.updateMany) {
      this._service
        .updateMany({ ids: this.updateIds }, input)
        .pipe(untilDestroyed(this), take(1))
        .subscribe(() => {
          this.reloadPage();
          this.setOfChecked.clear();
          this.openPanel = undefined;
          this.onAction.emit('updateMany');
        });
    }
  }

  onImport(formData: FormData): void {
    const customImportParams: Record<string, string> = this.customImportParams || {};

    for (const key of Object.keys(customImportParams)) {
      formData.append(key, customImportParams[key]);
    }

    if (this._service.import) {
      this._service
        .import(formData as any)
        .pipe(
          untilDestroyed(this),
          take(1),
          tap((response: ImportDto) => {
            this.importDto = response;
          }),
        )
        .subscribe();
    }
  }

  onClearSelection(): void {
    this.checkedPage = false;
    this.setOfChecked.clear();
    this.checkboxes.emit([]);
  }

  onExport(fileExt: string, exportAll: boolean = false): void {
    this._service.export &&
      this._service
        .export({
          ...(this.setOfChecked.size > 0 && !exportAll && { ids: [...this.setOfChecked] }),
          fileExt,
          ...(this.customImportParams && { ...this.customImportParams }),
        })
        .pipe(
          untilDestroyed(this),
          take(1),
          tap((response: any) => {
            saveBlobAsFile(
              response,
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
              `${this.exportFileName || `${this.crudConfig.plural.replace(/ +/, '-').toLowerCase()}-export`}.${fileExt.toLowerCase()}`,
            );
          }),
        )
        .subscribe();
  }

  private filter({ filter, or, s, softDelete, sort }: FindInput): void {
    if (this._customFilters) {
      const newS: Object = JSON.parse(s || '{}');
      s = JSON.stringify({ $and: [{ ...newS }, { ...this._customFilters }] });
    }

    const search: FindInput = {
      ...(filter && { filter }),
      ...(or && { or }),
      ...(s && { s }),
      ...(softDelete && { softDelete }),
      ...(sort && { sort }),
      page: 1,
      fields: this.fields.join(','),
      limit: this.searchSubject.getValue().limit,
      join: this.join,
    };

    this.searchSubject.next(search);
  }

  onDelete(item: T): void {
    this.deletedId = item.id;
    // @ts-ignore
    if (this.nameField && item[this.nameField]) {
      // @ts-ignore
      this.deletedName = item[this.nameField];
    }

    this.isDeleteModalVisible = true;
  }

  onShowDetailForm(item: T): void {
    this.detailFormInputs = { value: null, submit: undefined, show: Symbol('true') };
    this.openPanel = 'detail';

    // @ts-ignore
    if (this.nameField && item[this.nameField]) {
      // @ts-ignore
      this.detailName = item[this.nameField];
    }

    this.detailId = item['id'];
    this.loadOne(this.detailId);
  }

  onOkDelete(): void {
    if (this._service.delete) {
      this._service
        .delete(this.deletedId)
        .pipe(untilDestroyed(this), take(1), filter(Boolean))
        .subscribe(() => {
          this.isDeleteModalVisible = false;
          this.setOfChecked.delete(this.deletedId);
          this.reloadPage();
          this.onAction.emit('delete');
        });
    }
  }

  onDeleteManyModalShow(): void {
    if (this.setOfChecked.size > 0) {
      this.isDeleteManyModalVisible = true;
    }
  }

  onOkDeleteMany(): void {
    if (this._service.deleteMany) {
      this._service.deleteMany({ ids: [...this.setOfChecked.values()] }).subscribe(() => {
        this.reloadPage();
        this.checkedPage = false;
        this.isDeleteManyModalVisible = false;
        this.setOfChecked.clear();
        this.onAction.emit('deleteMany');
      });
    }
  }

  loadOne(id: string): void {
    if (this._service.findOne) {
      this._service
        .findOne(id, { lang: LangCodeEnum.ALL, ...(this.joinForForms && { join: this.joinForForms }) })
        .pipe(untilDestroyed(this), take(1))
        .subscribe((value: T) => {
          this.updateFormInputs = { value };
          this.detailFormInputs = { value };
        });
    }
  }

  onCancelDelete(): void {
    this.isDeleteModalVisible = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const sort: string[] = params.sort
      .flatMap(({ key, value }: { key: string; value: NzTableSortOrder }): string | string[] => {
        if (key.includes(',')) {
          return !value ? '' : key.split(',').map((field: string) => `${field},${value === 'ascend' ? 'ASC' : 'DESC'}`);
        }
        return value ? `${key},${value === 'ascend' ? 'ASC' : 'DESC'}` : '';
      })
      .filter((v: string) => v !== '');

    const search: FindInput = {
      ...this.searchSubject.getValue(),
      ...(sort.length > 0 && { sort }),
      page: params.pageIndex,
      limit: params.pageSize,
      fields: this.fields.join(','),
      join: this.join,
    };
    this.limit = params.pageSize;
    this.searchSubject.next(search);
  }

  subscribeOnSearchParams(): void {
    if (this._service.find) {
      this.searchSubject
        .pipe(
          debounceTime(500),
          untilDestroyed(this),
          tap((findInput: FindInput) => {
            this.filterChanges.emit(findInput);
          }),
          switchMap((findInput: FindInput) => {
            return this._service.find({ ...findInput });
          }),
        )
        .subscribe(({ items, ...page }: Pageable & { items?: T[] }) => {
          if (this.init) {
            this.resizeTable();
            this.init = false;
          }
          this.items = items ? items : [];
          this.total = page.total;
          this.page = page.page;
          this.totalCount.emit(this.total);
        });
    }
  }

  onShowCreateForm(): void {
    this.openPanel = 'create';
    this.createFormInputs = { value: null, submit: undefined, show: Symbol('true') };
  }

  onShowUpdateForm(item: T): void {
    this.updateFormInputs = { value: null, submit: undefined, show: Symbol('true') };
    this.openPanel = 'update';

    // @ts-ignore
    if (this.nameField && item[this.nameField]) {
      // @ts-ignore
      this.updateName = item[this.nameField];
    }

    this.updateId = item['id'];
    this.loadOne(this.updateId);
    this.router.navigate([], { queryParams: { [this.queryNameWithEditId]: this.updateId }, queryParamsHandling: 'merge' });
  }

  onShowUpdateManyForm(ids: Set<string>): void {
    if (ids.size === 0) {
      return;
    }
    this.updateManyFormInputs = { value: null, submit: undefined, show: Symbol('true') };
    this.openPanel = 'patchBundle';
    this.updateIds = [...ids];
  }

  onShowImportForm(): void {
    this.openPanel = 'import';
  }

  onCreateButtonClick(): void {
    this.createFormInputs = { submit: Symbol('create') };
  }

  onUpdateButtonClick(): void {
    this.updateFormInputs = { submit: Symbol('update') };
  }

  onUpdateManyButtonClick(): void {
    this.updateManyFormInputs = { submit: Symbol('patchBundle'), show: undefined };
  }

  onItemChecked(value: string, status: boolean): void {
    if (status) {
      if (this.isSingleSelect) {
        this.setOfChecked.clear();
      }
      this.setOfChecked.add(value);
    } else {
      this.setOfChecked.delete(value);
    }
    this.checkboxes.emit([...this.setOfChecked.values()]);
  }

  reloadPage(): void {
    this.searchSubject.next(this.searchSubject.getValue());
    this.setOfChecked.clear();
  }

  onAllChecked(status: boolean): void {
    if (this.isSingleSelect) {
      this.checkedPage = false;
      return;
    }

    if (status) {
      for (const v of this.items) {
        v.id && this.setOfChecked.add(v.id);
      }
    } else {
      for (const v of this.items) {
        v.id && this.setOfChecked.delete(v.id);
      }
    }
    this.checkboxes.emit([...this.setOfChecked.values()]);
  }

  onImportButtonClick(): void {
    this.startImport = Symbol('import');
  }

  onRouteSamePage(): void {
    // this.router.events
    //   .pipe(
    //     untilDestroyed(this),
    //     filter((event: Event) => event instanceof NavigationEnd),
    //     map((v: Event) => (v as NavigationEnd).url),
    //     pairwise(),
    //     filter(([previousUrl, currentUrl]: string[]) => previousUrl === currentUrl),
    //   )
    //   .subscribe(() => {
    //     this.reloadPage();
    //   });
  }

  onCloseDrawer(): void {
    this.openPanel = undefined;
    this.router.navigate([], { queryParams: { [this.queryNameWithEditId]: undefined }, queryParamsHandling: 'merge' });
  }

  onImagePreview(originalUrl?: string): void {
    if (!originalUrl) {
      return;
    }
    this.nzImageService.preview(
      [
        {
          src: originalUrl,
        },
      ],
      { nzZoom: 1, nzRotate: 0 },
    );
  }

  onStartDrag(index: string): void {
    this.draggedStartId = index;
  }

  onSortPredicate = (index: number): boolean => {
    this.draggedDropId = this.items[index].id;
    return false;
  };

  onDrop(): void {
    if (this.draggedStartId !== this.draggedDropId) {
      this.draggedEnd.emit([this.draggedStartId, this.draggedDropId]);
    }
  }

  openUpdateFormByLink(): void {
    const id: string | undefined = this.route.snapshot.queryParams[this.queryNameWithEditId];

    if (id) {
      this.updateId = id;
      this.onShowUpdateForm({ id } as T);
    }
  }
}
