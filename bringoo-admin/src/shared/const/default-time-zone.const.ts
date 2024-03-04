/**
 * @description const for frontend timeZone formatting
 */
export const defaultTimeZoneConst: {
  /**
   * @description if you change it, need to change other values
   */
  timeZone: string;
  fromUtc: number;
  toUtc: number;
} = {
  timeZone: 'UTC+1',
  fromUtc: +1,
  toUtc: -1,
};
