import { EXCEPTION_CODE } from './exception-code.enum';

const forbiddenKeys = ['_issuedAt', '_message', '_name', '_trace', '_code'];

export abstract class AbstractException extends Error {
  private readonly _details: Map<string, unknown> = new Map();
  private readonly _forbiddenKeys = new Set<string>(forbiddenKeys);
  readonly issuedAt = new Date();
  abstract readonly code: EXCEPTION_CODE;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    this._details.set('_issuedAt', this.issuedAt.getTime());
    this._details.set('_name', this.name);
    this._details.set('_message', this.message);
    this._details.set('_stack', this.stack);
  }

  add(key: string, value: unknown) {
    if (this._forbiddenKeys.has(key))
      throw new Error(`Invalid key ${key} on throw exception ${this.name}`);

    this._details.set(key, value);
  }

  details(): Record<string, unknown> {
    const details = Object.fromEntries(Array.from(this._details.entries()));
    details['_code'] = this.code;

    return details;
  }
}
