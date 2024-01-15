import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';

export class TextException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;
}
