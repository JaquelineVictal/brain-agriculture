import { randomUUID } from 'crypto';

export class Uuid {
  private static readonly _validateRegex = new RegExp(
    '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}',
  );

  constructor(public readonly value: string) {
    Uuid.validate(value);
  }

  public static create() {
    return new Uuid(randomUUID());
  }

  static validate(value: string): void {
    if (Uuid._validateRegex.test(value)) return;

    throw new TypeError('invalid uuid');
  }
}
