import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';

export class NotFoundException extends AbstractException {
  readonly code = EXCEPTION_CODE.CONFLICT;

  constructor(message: string) {
    super(message);
  }
}
