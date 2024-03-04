import { iconType } from '../components/icon/icon.type';

export interface MenuLinkModel {
  path: string;
  matchPathExact?: boolean;
  title: string;
  showInMenu: boolean;
  icon?: string;
  fIcon?: iconType;
  children?: MenuLinkModel[];
}
