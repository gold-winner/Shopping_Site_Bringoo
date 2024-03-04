import { ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts/lib/utils/color-sets';

export const CALENDAR_COLOR_THEMES: Map<string, Color> = new Map<string, Color>([
  [
    'customer-heat-map-light',
    {
      name: 'customer-heat-map-light',
      selectable: false,
      group: ScaleType.Ordinal,
      domain: ['rgba(200,200,200,0.03)', 'rgba(103,119,152,0.2)', 'rgba(103,119,152,0.6)', '#677798'],
    },
  ],
  [
    'customer-heat-map-dark',
    {
      name: 'customer-heat-map-dark',
      selectable: false,
      group: ScaleType.Ordinal,
      domain: ['rgba(0, 128, 0, 0.1)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 165, 0, 0.6)', 'rgba(255, 0, 0, 1)'],
    },
  ],
  [
    'customer-heat-map-only-zero',
    {
      name: 'customer-heat-map-only-zero',
      selectable: false,
      group: ScaleType.Ordinal,
      domain: ['rgba(103,119,152,0.1)'],
    },
  ],
]);
