import { TNullable } from 'src/domain/types/nullable.type';
import { ENV } from './env.enum';

export class EnvUtils {
  private constructor() {}

  static getString(target: ENV, defaultValue?: string) {
    const value = this._getValue(process.env[target], defaultValue);
    if (this._isNullable(value)) throw new Error();
    return value;
  }

  static getNumber(target: ENV, defaultValue?: number) {
    const value = this._getValue(Number(process.env[target]), defaultValue);
    if (Number.isNaN(value)) throw new Error();
    return value;
  }

  private static _getValue<T>(value: T, defaultValue: T): TNullable<T> {
    return this._isNullable(value) ? defaultValue : value;
  }

  private static _isNullable(value: unknown) {
    return value === null || value === undefined;
  }
}
