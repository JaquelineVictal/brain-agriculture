import { DATE_FORMAT } from '../../date-format.enum';
import { AbstractDateFormat } from './date-format-strategy.abstract';

export class DefaultDateFormatStrategy extends AbstractDateFormat {
  readonly type = DATE_FORMAT.DEFAULT;
  handle(date: Date): string {
    const { year, month, day, hours, minutes, seconds } = this._getParts(date);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
