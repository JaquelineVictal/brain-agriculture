import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IErrorHandler } from './error-handler.contract';
import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { ExceptionHttpStatusMapper } from './http-status.mapper';
import { ExceptionHandler } from 'src/domain/service/exception-handler/exception-handler.service';

@Injectable()
export class HttpErrorHandler implements IErrorHandler<HttpException> {
  constructor(private readonly _exceptionHandler: ExceptionHandler) {}

  handle(error: unknown): HttpException {
    const exception = this._exceptionHandler.normalize(error);
    const message = this._getMessage(exception.message, exception.code);
    const status = this._getStatus(exception.code);

    return new HttpException(message, status);
  }

  private _getStatus(exceptionCode: EXCEPTION_CODE): HttpStatus {
    const status = ExceptionHttpStatusMapper.get(exceptionCode);
    return status ? status : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private _getMessage(message: string, exceptionCode: EXCEPTION_CODE) {
    if (exceptionCode === EXCEPTION_CODE.UNKNOWN)
      return 'An issue occurred, sorry for the inconvenience.';

    return message;
  }
}
