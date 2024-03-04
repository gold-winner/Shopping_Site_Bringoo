import { reportSection } from '../types/report-filter';

export const MARKETING: reportSection[] = [
  { label: 'Store Performance', path: 'store-performance' },
  { label: 'Sessions attributed to marketing', path: 'sessions-marketing' },
  { label: 'Sales attributed to marketing', path: 'sales-marketing' },
  { label: 'Conversion by first interaction', path: 'conversion-first-interaction' },
  { label: 'Conversion by last interaction', path: 'conversion-last-interaction' },
  { label: 'Attribution model comparison', path: 'attribution-model-comparison' },
];
