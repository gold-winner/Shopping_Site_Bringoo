export interface CalendarDataType {
  name: string;
  series: CalendarSeries[];
}
export interface CalendarSeries {
  date: Date;
  name: string;
  value: number;
}
export interface CalendarColorThemeType {
  selectable: boolean;
  group: 'Ordinal' | 'Continuous';
  domain: string[];
}
