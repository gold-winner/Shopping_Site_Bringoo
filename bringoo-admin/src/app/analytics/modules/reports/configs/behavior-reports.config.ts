import { reportSection } from '../types/report-filter';

export const BEHAVIOR: reportSection[] = [
  { label: 'Online store conversion over time', path: 'online-store-conversion' },
  { label: 'Top online store searches', path: 'search-trends' },
  { label: 'Top online store searches with no results', path: 'search-trends', query: { type: 'noResults' } },
  { label: 'Product recommendation conversions over time', path: 'product-recommendation-conversions' },
  { label: 'Sessions by landing page', path: 'sessions-by-landing-page' },
  { label: 'Sessions by device', path: 'sessions-by-device' },
  { label: 'Online store cart analysis', path: 'online-store-cart-analysis' },
  { label: 'Online store speed', path: 'online-store-speed' },
];
