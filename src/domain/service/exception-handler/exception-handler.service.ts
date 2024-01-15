import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { IExceptionHandler } from './exception-handler.contract';

import { Injectable } from '@nestjs/common';
import { TNullable } from 'src/domain/types/nullable.type';
import {
  ErrorToExceptionNormalizer,
  NumberToExceptionNormalizer,
  StringToExceptionNormalizer,
  UnknownToExceptionNormalizer,
} from './default-strategies';
import { IExceptionHandlerStrategy } from './exception-handler-strategy.contract';

@Injectable()
export class ExceptionHandler implements IExceptionHandler {
  constructor(
    private readonly _unknownToExceptionNormalizer: UnknownToExceptionNormalizer,
    private readonly _errorToExceptionNormalizer: ErrorToExceptionNormalizer,
    private readonly _stringToExceptionNormalizer: StringToExceptionNormalizer,
    private readonly _numberToExceptionNormalizer: NumberToExceptionNormalizer,
  ) {}

  normalize(
    error: unknown,
    strategies?: TNullable<IExceptionHandlerStrategy[]>,
  ): AbstractException {
    if (error instanceof AbstractException) return error;

    const strategy = this._getNormalizer(error, strategies);
    return strategy.handle(error);
  }

  private _getNormalizer(
    exception: unknown,
    strategies: TNullable<IExceptionHandlerStrategy[]> = [],
  ): IExceptionHandlerStrategy {
    const normalizer = [
      ...strategies,
      this._errorToExceptionNormalizer,
      this._stringToExceptionNormalizer,
      this._numberToExceptionNormalizer,
      this._unknownToExceptionNormalizer,
    ].find((normalizer) => normalizer.match(exception));

    return normalizer;
  }
}
