import { DATE_FORMAT } from '../../date-format.enum';
import { AbstractDateFormat } from './date-format-strategy.abstract';

export class DateOnlyStrategy extends AbstractDateFormat {
  readonly type = DATE_FORMAT.DATE_ONLY;

  handle(date: Date): string {
    const { day, month, year } = this._getParts(date);
    return `${year}-${day}-${month}`;
  }
}
