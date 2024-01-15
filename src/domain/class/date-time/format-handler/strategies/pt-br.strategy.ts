import { DATE_FORMAT } from '../../date-format.enum';
import { AbstractDateFormat } from './date-format-strategy.abstract';

export class PtBrDateFormatStrategy extends AbstractDateFormat {
  type = DATE_FORMAT.PT_BR;

  handle(date: Date): string {
    const { year, month, day, hours, minutes, seconds } = this._getParts(date);
    return `${day}/${month}/${year} ${hours}:${minutes}${seconds}`;
  }
}
