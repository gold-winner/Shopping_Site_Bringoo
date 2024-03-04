import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import {
  AclActionDto,
  AclActionInput,
  AclDto,
  AclResourceDto,
  AclResourceInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { ManagerAclService } from '../../../../../../../../shared/api/auth/manager-acl.service';

@UntilDestroy()
@Component({
  selector: 'app-permission-settings',
  templateUrl: 'permission-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionSettingsComponent implements OnInit {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  searchControl: UntypedFormControl = new UntypedFormControl(null);
  search$: Observable<string> = this.searchControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged());

  node$!: Observable<NzTreeNodeOptions[]>;
  isLoading$: Observable<boolean> = this.managerAcl.isLoading$;

  openPanel: boolean = false;
  defaultCheckedKeys: string[] = [];
  roleCode: string = '';

  constructor(
    private readonly managerAcl: ManagerAclService,
    private readonly notification: NzNotificationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.node$ = this.route.queryParams.pipe(
      filter((params: Params) => params.roleCode),
      map((params: Params): string => params.roleCode),
      tap(() => (this.openPanel = true)),
      tap((roleCode: string) => (this.roleCode = roleCode)),
      switchMap((roleCode: string): Observable<AclDto> => this.managerAcl.getAclTree(roleCode)),
      map(({ resources }: AclDto): NzTreeNodeOptions[] => this.buildNzTreeNode(resources)),
    );
  }

  buildNzTreeNode(items: AclResourceDto[]): NzTreeNodeOptions[] {
    const checkedKeys: string[] = [];
    const rootNode: NzTreeNodeOptions[] = items.map(
      (node: AclResourceDto): NzTreeNodeOptions => {
        const actionNode: NzTreeNodeOptions[] | undefined = node.actions.map(
          (action: AclActionDto): NzTreeNodeOptions => {
            return {
              title: action.description ?? '',
              key: action.code ?? '',
              isLeaf: true,
              checked: !!(action.allowed && checkedKeys.push(action.code)),
            };
          },
        );
        return {
          title: node.description ?? '',
          key: node.code ?? '',
          expanded: true,
          children: actionNode,
        };
      },
    );

    this.defaultCheckedKeys = [...checkedKeys];
    return rootNode;
  }

  onClose(): void {
    this.openPanel = false;
    this.clearQueryParams();
  }

  clearQueryParams(): void {
    this.router.navigate([], { queryParams: {}, replaceUrl: true }).then();
  }

  onSubmit(): void {
    const aclInput: AclResourceInput[] = this.nzTreeComponent.getTreeNodes().map(
      (node: NzTreeNode): AclResourceInput => {
        const child: AclActionInput[] = node.getChildren().map(
          (child: NzTreeNode): AclActionInput => ({
            code: child.key,
            allowed: child.isChecked,
          }),
        );
        return {
          code: node.key,
          actions: child,
        };
      },
    );

    this.openPanel = false;
    this.managerAcl.saveAclTree(this.roleCode, { resources: aclInput }).subscribe(() => {
      this.notification.success('Permission saved', `New permission settings for ${this.roleCode}`);
      this.onClose();
    });
  }
}
