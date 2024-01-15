import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { IExceptionHandlerStrategy } from '../../exception-handler-strategy.contract';
import { ErrorToException } from './error.exception';

export class ErrorToExceptionNormalizer
  implements IExceptionHandlerStrategy<Error>
{
  match(error: unknown): boolean {
    return error instanceof Error;
  }

  handle(error: Error): AbstractException {
    return new ErrorToException(error);
  }
}
