export interface CardLink {
  title: string;
  path: string;
}
export interface SettingsCardModel {
  title: string;
  path: string;
  showInMenu: boolean;
  icon: string;
  links: CardLink[];
}
