export function StringToNumberHelper(number: string = ''): number {
  const numb: number = Number.parseFloat(number.replace(',', '.'));
  return Number.isNaN(numb) ? 0 : numb;
}
