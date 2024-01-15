import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorToException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;

  constructor(error: Error) {
    super(error.message);
    this.stack = error.stack;
    this.name = error.name;
  }
}
