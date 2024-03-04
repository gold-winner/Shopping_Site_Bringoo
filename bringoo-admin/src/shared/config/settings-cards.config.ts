import { SettingsCardModel } from '../models/settings-card.model';

export const SETTINGS_CARDS: SettingsCardModel[] = [
  {
    title: 'General',
    path: '/settings/general',
    icon: 'setting',
    links: [
      {
        path: 'language',
        title: '- Language Setup',
      },
      {
        path: 'country',
        title: '- Country Setup',
      },
      {
        path: 'nationality',
        title: '- Nationality Setup',
      },
      {
        path: 'parameter',
        title: '- General Parameter',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Financial Management',
    path: '/settings/financial-management',
    icon: 'dollar',
    links: [
      {
        path: 'vat',
        title: '- VAT Setup',
      },
      {
        path: 'payment',
        title: '- Payment Method Setup',
      },
      {
        path: 'currency',
        title: '- Currency Setup',
      },
      {
        path: 'deposit-type',
        title: '- Deposit Type Setup',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Loyalty Program',
    path: '/settings/loyalty-program',
    icon: 'like',
    links: [
      {
        path: 'loyalty-program',
        title: '- Loyalty Program Setup',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Product Management',
    path: '/settings/product-management',
    icon: 'coffee',
    links: [
      {
        path: 'weight',
        title: '- Weight Setup',
      },
      {
        path: 'nutrition-type',
        title: '- Nutrition Type Setup',
      },
      {
        path: 'product-unit',
        title: '- Product Unit Setup',
      },
      {
        path: 'product-category',
        title: '- Product Category Setup',
      },
      {
        path: 'recall-reason',
        title: '- Recall Reason',
      },
      {
        path: 'product-legal',
        title: '- Product Legal',
      },
      {
        path: 'dangerous-goods',
        title: '- Dangerous Goods',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Vendor Management',
    path: '/settings/vendor-management',
    icon: 'contacts',
    links: [
      {
        path: 'vendor-type',
        title: '- Vendor Type Setup',
      },
      {
        path: 'store-region',
        title: '- Store Region',
      },
      {
        path: 'vendor-category',
        title: '- Vendor Category Setup',
      },
    ],
    showInMenu: true,
  },
  //todo not implemented on backend
  // {
  //   title: 'Shipment and Delivery',
  //   path: '/settings/shipment-delivery',
  //   icon: 'car',
  //   links: [
  //     {
  //       path: 'shipment',
  //       title: '- Shipment',
  //     },
  //     {
  //       path: 'delivery',
  //       title: '- Delivery',
  //     },
  //   ],
  //   showInMenu: true,
  // },
  {
    title: 'Communication & Email',
    path: '/settings/communication-email',
    icon: 'mail',
    links: [
      {
        path: 'email-templates',
        title: '- Email Templates',
      },
      {
        path: 'notification-management',
        title: '- Notification Management',
      },
    ],
    showInMenu: true,
  },
  {
    title: "FAQ's",
    path: '/settings/faq',
    icon: 'question-circle',
    links: [
      {
        path: 'faq-topic',
        title: '- FAQ Topic',
      },
      {
        path: 'faq-item',
        title: '- FAQ Item',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'User Management',
    path: '/settings/user-management',
    icon: 'user',
    links: [
      {
        path: 'manager-roles',
        title: '- Manager Roles',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Checkout and Orders',
    path: '/settings/checkout-orders',
    icon: 'check-circle',
    links: [
      {
        path: 'checkout-setup',
        title: '- Checkout Setup',
      },
      {
        path: 'replacement-options',
        title: '- Replacement Options',
      },
      {
        path: 'cancel-reason',
        title: '- Cancel reason',
      },
    ],
    showInMenu: true,
  },
  //todo not implemented
  // {
  //   title: 'Payment',
  //   path: '/settings/payment',
  //   icon: 'pay-circle',
  //   links: [
  //     {
  //       path: 'payment-setup',
  //       title: '- Payment Setup',
  //     },
  //   ],
  //   showInMenu: true,
  // },
  {
    title: 'Legal',
    path: '/settings/legal',
    icon: 'file-protect',
    links: [
      {
        path: 'terms-condition',
        title: '- Terms and Condition',
      },
      // {
      //   path: 'refund-policy',
      //   title: '- Refund Policy',
      // },
      {
        path: 'privacy-policy',
        title: '- Privacy Policy',
      },
      // {
      //   path: 'shipping-policy',
      //   title: '- Shipping Policy',
      // },
    ],
    showInMenu: true,
  },
  {
    title: 'Customer App',
    path: '/settings/customer-app',
    icon: 'mobile',
    links: [
      {
        path: 'settings',
        title: '- Settings',
      },
      {
        path: 'max-weight',
        title: '- Cart Max Weight',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Staff App',
    path: '/settings/staff-app',
    icon: 'group',
    links: [
      {
        path: 'settings',
        title: '- Settings',
      },
      {
        path: 'job-cancel-reason',
        title: '- Job Cancel Reason',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Partner App',
    path: '/settings/partner-app',
    icon: 'solution',
    links: [
      {
        path: 'settings',
        title: '- Settings',
      },
    ],
    showInMenu: true,
  },
  {
    title: 'Restrictions',
    path: '/settings/restrictions',
    icon: 'safety-certificate',
    links: [
      {
        path: 'country-allowed',
        title: '- Countries allowed',
      },
      {
        path: 'email-blocked',
        title: '- Email domains Blocked',
      },
    ],
    showInMenu: true,
  },
];
