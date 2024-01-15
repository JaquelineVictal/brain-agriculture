import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { TNullable } from 'src/domain/types/nullable.type';
import { IExceptionHandlerStrategy } from './exception-handler-strategy.contract';

export interface IExceptionHandler {
  normalize(
    exception: unknown,
    strategies?: TNullable<IExceptionHandlerStrategy[]>,
  ): AbstractException;
}
