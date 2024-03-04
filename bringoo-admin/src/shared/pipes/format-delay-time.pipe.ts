import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDelayTime' })
export class FormatDelayTimePipe implements PipeTransform {
  transform(seconds: number): string {
    let negative: boolean = false;
    if (seconds < 0) {
      negative = true;
      seconds = Math.abs(seconds);
    }
    const hours: number = Math.trunc(seconds / 3600);
    const minutes: number = Math.trunc(seconds / 60) - hours * 60;
    seconds = Math.trunc(seconds) - (minutes + hours * 60) * 60;

    const formatTime: string =
      `${hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}` +
      `:${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}` +
      `:${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;

    return `${negative ? '– ' : ''}${formatTime}`;
  }
}
