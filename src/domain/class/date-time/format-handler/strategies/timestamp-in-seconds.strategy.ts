import { DATE_FORMAT } from '../../date-format.enum';
import { AbstractDateFormat } from './date-format-strategy.abstract';

export class TimestampInSecondsStrategy extends AbstractDateFormat {
  type = DATE_FORMAT.TIMESTAMP_IN_SECONDS;

  handle(date: Date): string {
    const timestamp = date.getTime();
    return `${timestamp / 1000}`;
  }
}
