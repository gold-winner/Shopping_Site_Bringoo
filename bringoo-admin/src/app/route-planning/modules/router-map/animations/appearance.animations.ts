import { animate, state, style, transition, trigger } from '@angular/animations';

export const AppearanceAnimations: (width?: number) => any[] = (width: number = 300) => {
  return [
    trigger('expand', [
      state(
        'void',
        style({
          height: '54px',
          width: '64px',
          opacity: 0,
        }),
      ),
      state(
        '*',
        style({
          width: `${width}px`,
          height: '100%',
          opacity: 1,
        }),
      ),
      transition('void => *', [animate('0.5s ease')]),
      transition('* => void', [animate('0.5s ease')]),
    ]),
  ];
};
