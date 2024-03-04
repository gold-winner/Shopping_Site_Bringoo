import { MenuLinkModel } from '../interfaces/menu-link.model';

export const SITEMAP_CONFIG: MenuLinkModel[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    showInMenu: true,
    icon: 'home',
  },
  {
    path: 'orders',
    title: 'Orders',
    showInMenu: true,
    icon: 'container',
    children: [
      {
        path: 'all',
        title: 'Orders',
        showInMenu: true,
      },
      {
        path: 'drafts',
        title: 'Drafts',
        showInMenu: true,
      },
      {
        path: 'abandoned-shopping-cart',
        title: 'Abandoned Shopping Cart',
        showInMenu: true,
      },
      {
        path: 'order-board',
        title: 'Order Board',
        showInMenu: true,
      },
      {
        path: 'invoices',
        title: 'Invoices',
        showInMenu: true,
      },
      {
        path: 'store-delivery-scheduler',
        title: 'Store Delivery Scheduler',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'store',
    title: 'Store',
    showInMenu: true,
    icon: 'shopping-cart',
    children: [
      {
        path: 'stores',
        title: 'Stores',
        showInMenu: true,
      },
      {
        path: 'corporations',
        title: 'Corporations',
        showInMenu: true,
      },
      {
        path: 'product-pricing',
        title: 'Product pricing',
        showInMenu: true,
      },
      {
        path: 'product-link',
        title: 'Product Link',
        showInMenu: true,
      },
      {
        path: 'product-price-request',
        title: 'Product Price Request',
        showInMenu: true,
      },
      {
        path: 'brand',
        title: 'Brand',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'partner',
    title: 'Partners',
    showInMenu: true,
    icon: 'gift',
    children: [
      {
        path: 'mollie',
        title: 'Mollie',
        showInMenu: true,
      },
      {
        path: 'consultation-request',
        title: 'Consultation Request',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'products',
    title: 'Products',
    showInMenu: true,
    icon: 'tag',
    children: [
      {
        path: 'all',
        title: 'Products',
        showInMenu: true,
      },
      {
        path: 'brands',
        title: 'Brands',
        showInMenu: true,
      },
      {
        path: 'requests',
        title: 'Requests',
        showInMenu: true,
      },
      {
        path: 'inventory',
        title: 'Inventory',
        showInMenu: true,
      },
      {
        path: 'transfers',
        title: 'Transfers',
        showInMenu: true,
      },
      {
        path: 'collections',
        title: 'Collections',
        showInMenu: true,
      },
      {
        path: 'gift_cards',
        title: 'Gift cards',
        showInMenu: true,
      },
      {
        path: 'recall',
        title: 'Recall',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'users',
    title: 'Users',
    showInMenu: true,
    icon: 'team',
    children: [
      {
        path: 'customers',
        title: 'Customers',
        showInMenu: true,
      },
      {
        path: 'managers',
        title: 'Managers',
        showInMenu: true,
      },
      {
        path: 'staff',
        title: 'Staff',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'analytics',
    title: 'Analytics',
    showInMenu: true,
    icon: 'pie-chart',
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        showInMenu: true,
      },
      {
        path: 'reports',
        title: 'Reports',
        showInMenu: true,
      },
      {
        path: 'live-view',
        title: 'Live View',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'operations',
    title: 'Operations',
    icon: 'car',
    showInMenu: true,
    children: [
      {
        path: 'staff-live-map',
        title: 'Staff Live Map',
        showInMenu: true,
      },
      {
        path: 'ops-team-dashboard',
        title: 'Ops Team Dashboard',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'inspection',
    title: 'Inspection',
    showInMenu: true,
    icon: 'pie-chart',
    children: [
      {
        path: 'tasks/opened',
        title: 'Opened tasks',
        showInMenu: true,
      },
      {
        path: 'tasks/closed',
        title: 'Closed tasks',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'marketing',
    title: 'Marketing',
    showInMenu: true,
    icon: 'fund-view',
    children: [
      {
        path: 'rating-app',
        title: 'App Rating',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'route-planning',
    title: 'Route Planning',
    fIcon: 'maps-route',
    showInMenu: true,
    children: [
      {
        title: 'Route Map',
        path: 'route-map',
        showInMenu: true,
      },
      {
        title: 'Backlog',
        path: 'backlog',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'vouchers',
    title: 'Vouchers',
    showInMenu: true,
    icon: 'percentage',
  },
  {
    path: 'notifications',
    title: 'Notifications',
    showInMenu: true,
    icon: 'notification',
    children: [
      {
        path: 'all',
        matchPathExact: true,
        title: 'All custom notification',
        showInMenu: true,
      },
      {
        path: 'all/my-unread',
        title: 'My unread history',
        showInMenu: true,
      },
      {
        path: 'custom-schedule',
        title: 'Custom Schedule',
        showInMenu: true,
      },
      {
        path: 'sms',
        title: 'Sms templates',
        showInMenu: true,
      },
    ],
  },
  {
    path: 'apps',
    title: 'Apps',
    showInMenu: true,
    icon: 'appstore',
  },
  {
    path: 'surveys',
    title: 'Surveys',
    showInMenu: true,
    icon: 'question-circle',
  },
  {
    path: 'settings',
    title: 'Settings',
    showInMenu: true,
    icon: 'setting',
  },
];
