import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { iconType } from '../../../shared/components/icon/icon.type';
interface IMenu {
  icon: iconType;
  label: string;
  path: string;
}
@Component({
  selector: 'ui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  selectedMenu = {} as IMenu | undefined;
  menuList: IMenu[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.menuList = [
      {
        icon: 'user',
        label: 'My Profile',
        path: 'profile',
      },
      {
        icon: 'heart',
        label: 'Favoriten',
        path: 'favorite',
      },
      {
        icon: 'shopping-bag',
        label: 'My order history',
        path: 'history',
      },
      {
        icon: 'filter',
        label: 'My products filters',
        path: 'products-filter',
      },
      {
        icon: 'bell',
        label: 'Notification',
        path: 'notification',
      },
      {
        icon: 'lock',
        label: 'Change Password',
        path: 'change-password',
      },
      {
        icon: 'chat',
        label: 'Contact us',
        path: 'contact',
      },
      {
        icon: 'help',
        label: "FAQ's",
        path: 'faq',
      },
    ];

    this.selectedMenu = this.menuList.find((x: IMenu) => x.path === this.activatedRoute.snapshot?.routeConfig?.path);
  }
}
