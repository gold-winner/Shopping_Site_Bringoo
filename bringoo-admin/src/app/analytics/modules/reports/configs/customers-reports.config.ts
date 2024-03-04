import { reportSection } from '../types/report-filter';

export const CUSTOMERS: reportSection[] = [
  { label: 'Customers over time', path: 'customers-over-time' },
  { label: 'Cohorts Sales & Users', path: 'customers-orders' },
  { label: 'First-time vs returning customer sales', path: 'first-time-vs-returning-customer-sales' },
  { label: 'Customers by location', path: 'customers-by-location' },
  { label: 'Returning customers', path: 'returning-customers' },
  { label: 'One-time customers', path: 'one-time-customers' },
  { label: 'At-risk customers', path: 'at-risk-customers' },
  { label: 'Loyal customers', path: 'loyal-customers' },
];
