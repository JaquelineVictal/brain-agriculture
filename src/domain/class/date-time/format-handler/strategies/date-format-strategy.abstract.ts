import { DATE_FORMAT } from '../../date-format.enum';

export abstract class AbstractDateFormat {
  readonly type: DATE_FORMAT;
  abstract handle(date: Date): string;

  protected _getParts(date: Date) {
    const [dateString, timeString] = date.toISOString().split('T');

    const { year, month, day } = this._extractDate(dateString);
    const { hours, minutes, seconds, milliseconds } =
      this._extractTime(timeString);
    return { year, month, day, hours, minutes, seconds, milliseconds };
  }

  private _extractTime(time: string) {
    const [hours, minutes, secondAndMs] = time.split(':');
    const [seconds, millisecondsWithZ] = secondAndMs.split('.');
    const milliseconds = millisecondsWithZ.substring(0, 3);

    return { hours, minutes, seconds, milliseconds };
  }

  private _extractDate(date: string) {
    const [year, month, day] = date.split('-');
    return { year, month, day };
  }
}
