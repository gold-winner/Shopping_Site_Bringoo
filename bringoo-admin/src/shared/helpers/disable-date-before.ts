export function disableDateBefore(date: Date): (current: Date) => boolean {
  return (current: Date): boolean => current.getTime() < date.getTime();
}
