import { reportSection } from '../types/report-filter';

export const INVENTORY: reportSection[] = [
  { label: 'Product Refunds', path: 'product-refunds' },
  { label: 'Show products out of stock', path: 'products-out-of-stock' },
  { label: 'Percent of inventory sold', path: 'inventory-percent-sold' },
  { label: 'ABC analysis by product', path: 'inventory-abc-analysis-product' },
  { label: 'Average inventory sold per day', path: 'inventory-average-inventory-sold' },
  { label: 'Month-end inventory snapshot', path: 'inventory-month-end-snapshot' },
  { label: 'Month-end inventory value', path: 'inventory-month-end-value' },
];
