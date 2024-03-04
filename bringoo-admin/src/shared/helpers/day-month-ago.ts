export function getDayMonthAgo(dateFrom: Date): Date {
  const date: Date = new Date(dateFrom);
  date.setDate(date.getDate() - 30);
  return date;
}
