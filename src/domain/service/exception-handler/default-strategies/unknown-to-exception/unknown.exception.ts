import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';

export class UnknownException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;
  constructor(error: unknown) {
    super(`Unknown Exception\n${String(error)}`);
    this.add('error', error);
    this.add('type', typeof error);
  }
}
