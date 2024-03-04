import { reportSection } from '../types/report-filter';

export const SALES: reportSection[] = [
  { label: 'Sales over time', path: 'sales-over-time' },
  { label: 'Sales by product', path: 'sales-product' },
  { label: 'Order per Store - Anonymous', path: 'order-per-store' },
  { label: 'Sales by product variant SKU', path: 'sales-product-sku' },
  { label: 'Sales by product vendor', path: 'sales-vendor' },
  { label: 'Sales by discount', path: 'sales-discount' },
  { label: 'Sales by traffic referrer', path: 'sales-traffic-referrer' },
  { label: 'Sales by billing location', path: 'sales-billing-location' },
  { label: 'Sales by checkout currency', path: 'sales-checkout-currency' },
  { label: 'Sales by channel', path: 'sales-channel' },
  { label: 'Sales by customer name', path: 'sales-customer-name' },
  { label: 'Average order value over time', path: 'sales-average-over-time' },
];
