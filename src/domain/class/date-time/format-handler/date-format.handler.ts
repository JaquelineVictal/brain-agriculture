import { TMappedDateFormatters, mappedDateFormatters } from './strategies';
import { DATE_FORMAT } from '../date-format.enum';

export abstract class DateFormatHandler {
  private static readonly _mappedFormatters: TMappedDateFormatters =
    mappedDateFormatters;

  static getFormatter(format: DATE_FORMAT) {
    return DateFormatHandler._mappedFormatters.get(format);
  }

  static format(date: Date, format: DATE_FORMAT): string {
    const formatter = DateFormatHandler.getFormatter(format);
    if (!formatter)
      throw new Error(`Formatter ${format} not found for date ${date}`);
    return formatter.handle(date);
  }
}
