import { EXCEPTION_CODE } from '../abstract-exception/exception-code.enum';
import { AbstractException } from '../abstract-exception/exception.abstract';

export class InvalidEmailException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(email: string) {
    super(`email ${email} is invalid`);
    this.add('email', email);
  }
}
