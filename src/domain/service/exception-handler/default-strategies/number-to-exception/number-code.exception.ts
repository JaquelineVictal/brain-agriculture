import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';

export class NumberCodeException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;
  constructor(message: number) {
    super(`error returned a number ${message}`);
  }
}
