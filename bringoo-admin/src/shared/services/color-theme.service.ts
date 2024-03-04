import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { addDays } from 'date-fns';
import Cookies from 'js-cookie';
import { ThemeService } from 'ng2-charts';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThemeTypeEnum } from '../enums/theme-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  previousTheme: ThemeTypeEnum | null = null;

  private _currentTheme: BehaviorSubject<ThemeTypeEnum> = new BehaviorSubject<ThemeTypeEnum>(ThemeTypeEnum.dark);

  get currentTheme(): ThemeTypeEnum {
    return this._currentTheme.getValue();
  }

  themeChange$: Observable<ThemeTypeEnum> = this._currentTheme.asObservable();

  chartLight: ChartConfiguration['options'] & any = {
    elements: {
      bar: {
        backgroundColor: 'rgba(192, 201, 219, 1)',
        hoverBackgroundColor: 'rgba(103, 119, 152, 1)',
      },
    },
    plugins: {
      datalabels: {
        color: 'rgba(67,79,164,0.5)',
      },
    },
  };

  chartDark: ChartConfiguration['options'] & any = {
    scales: {
      y: {
        grid: {
          color: '#393C4E',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: '#393C4E',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    legend: {
      labels: { fontColor: '#fff' },
    },
    elements: {
      bar: {
        backgroundColor: 'rgba(81,86,119,0.60)',
        hoverBackgroundColor: 'rgba(103, 119, 152, 1)',
      },
    },
    plugins: {
      datalabels: {
        color: '#fff',
      },
    },
  };

  constructor(private readonly chartTheme: ThemeService) {}

  initTheme(): void {
    this.getThemeFromCookie();
    this.loadTheme(true).then();
  }

  getThemeFromCookie(): void {
    const theme: string | null = Cookies.get('theme') ?? null;
    const currentTheme: ThemeTypeEnum = theme && Object.keys(ThemeTypeEnum).includes(theme) ? (theme as ThemeTypeEnum) : ThemeTypeEnum.dark;
    this._currentTheme.next(currentTheme);
  }

  private removeUnusedTheme(theme: ThemeTypeEnum): void {
    document.documentElement.classList.remove(theme);
    // eslint-disable-next-line unicorn/prefer-query-selector
    const removedThemeStyle: HTMLElement | null = document.getElementById(theme);
    if (removedThemeStyle) {
      removedThemeStyle.remove();
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve: (value: Event | PromiseLike<Event>) => void, reject: (reason?: any) => void) => {
      const style: HTMLLinkElement | null = document.createElement('link');
      const link: HTMLLinkElement = document.head.querySelectorAll('link').item(0);
      style.href = href;
      style.rel = 'stylesheet';
      style.id = id;
      style.addEventListener('load', resolve);
      style.addEventListener('error', reject);
      document.head.insertBefore(style, link);
      this.chartTheme.setColorschemesOptions(this._currentTheme.getValue() === ThemeTypeEnum.dark ? this.chartDark : this.chartLight);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme: ThemeTypeEnum = this._currentTheme.getValue();
    Cookies.set('theme', theme, { expires: addDays(new Date(), 365) });
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve: (value: Event | PromiseLike<Event>) => void, reject: (reason?: any) => void) => {
      this.loadCss(`${theme}.css`, theme).then(
        (e: Event) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          if (this.previousTheme) {
            this.removeUnusedTheme(this.previousTheme);
          }
          resolve(e);
        },
        (error: any) => reject(error),
      );
    });
  }

  public toggleTheme(theme: ThemeTypeEnum): Promise<Event | void> {
    if (this._currentTheme.getValue() === theme) {
      this.setPreviousTheme(theme);
      return new Promise((resolve: () => void) => resolve());
    }

    this.setPreviousTheme(theme);
    return this.loadTheme(false);
  }

  setPreviousTheme(theme: ThemeTypeEnum): void {
    this.previousTheme = this._currentTheme.getValue();
    this._currentTheme.next(theme);
  }
}
