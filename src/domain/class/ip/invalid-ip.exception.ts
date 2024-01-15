import { EXCEPTION_CODE } from '../abstract-exception/exception-code.enum';
import { AbstractException } from '../abstract-exception/exception.abstract';

export class InvalidIpException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(ip: string) {
    super(`ip ${ip} is invalid`);
    this.add('ip', ip);
  }
}
