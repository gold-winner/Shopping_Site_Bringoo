import { reportSection } from '../types/report-filter';

export const PROFIT: reportSection[] = [
  { label: 'Profit over time', path: 'profit-over-time' },
  { label: 'Profit by product', path: 'profit-product' },
  { label: 'Profit by product variant SKU', path: 'profit-product-variant-sku' },
  { label: 'Profit by product vendor', path: 'profit-product-vendor' },
  { label: 'Profit by discount', path: 'profit-discount' },
  { label: 'Profit by traffic referrer', path: 'profit-traffic-referrer' },
  { label: 'Profit by billing location', path: 'profit-billing-location' },
  { label: 'Profit by checkout currency', path: 'profit-checkout-currency' },
  { label: 'Profit by channel', path: 'profit-channel' },
  { label: 'Profit by customer name', path: 'profit-customer-name' },
  { label: 'Average order value over time', path: 'profit-average-over-time' },
];
