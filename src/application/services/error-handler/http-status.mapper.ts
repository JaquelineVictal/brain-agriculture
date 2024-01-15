import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';

export const ExceptionHttpStatusMapper = new Map<EXCEPTION_CODE, HttpStatus>([
  [EXCEPTION_CODE.INVALID_INPUT, HttpStatus.BAD_REQUEST],
  [EXCEPTION_CODE.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR],
  [EXCEPTION_CODE.FORBIDDEN, HttpStatus.FORBIDDEN],
  [EXCEPTION_CODE.CONFLICT, HttpStatus.CONFLICT],
  [EXCEPTION_CODE.NOT_FOUND, HttpStatus.NOT_FOUND],
]);
