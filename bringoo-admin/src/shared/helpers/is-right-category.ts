import { NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { StoreCategorySettingsFilterType } from '../types/store-category-settings-filter.type';

export function IsRightCategory(filters: StoreCategorySettingsFilterType, node: NzTreeNodeOptions, treeNode: NzTreeComponent): boolean {
  const { vendorCategoryCode, search }: StoreCategorySettingsFilterType = filters;
  let parentForCurrentNode: NzTreeNode | null | undefined;
  if (node.isLeaf) {
    parentForCurrentNode = treeNode.getTreeNodeByKey(node.key)?.parentNode;
  }

  let isCurrentCategoryType: boolean = true;

  if (vendorCategoryCode && vendorCategoryCode.length > 0) {
    const isParentCorrespondCategoryType: boolean = Boolean(
      parentForCurrentNode && parentForCurrentNode.title.includes(`(${vendorCategoryCode})`),
    );

    if (!isParentCorrespondCategoryType) {
      isCurrentCategoryType = vendorCategoryCode.some((type: string) => node.title.includes(`(${type})`));
    }
  }

  let isIncludeSearch: boolean = true;

  if (search) {
    const isParentCorrespondSearchValue: boolean = Boolean(
      parentForCurrentNode && parentForCurrentNode.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (!isParentCorrespondSearchValue) {
      isIncludeSearch = node.title.toLowerCase().includes(search.toLowerCase());
    }
  }

  return isCurrentCategoryType && isIncludeSearch;
}
