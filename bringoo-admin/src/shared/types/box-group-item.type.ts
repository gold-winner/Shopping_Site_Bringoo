export type boxGroupItemType = { label?: string; desc?: string };
export interface IRadioGroup {
  value: TRadioValue;
  label: string;
}
export type TRadioValue = number | string | boolean;
