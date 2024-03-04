import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AppstoreOutline,
  BellOutline,
  CarryOutOutline,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DashboardOutline,
  DeleteOutline,
  FileDoneOutline,
  FlagOutline,
  FormOutline,
  HomeOutline,
  LockOutline,
  MailOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  MessageOutline,
  PlusOutline,
  SettingOutline,
  ShoppingOutline,
  StopTwoTone,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [
  AppstoreOutline,
  BellOutline,
  CarryOutOutline,
  DashboardOutline,
  DeleteOutline,
  FileDoneOutline,
  FlagOutline,
  FormOutline,
  HomeOutline,
  LockOutline,
  MailOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  MessageOutline,
  PlusOutline,
  SettingOutline,
  ShoppingOutline,
  UserOutline,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  StopTwoTone,
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
