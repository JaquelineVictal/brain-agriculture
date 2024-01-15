import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';

export interface IExceptionHandlerStrategy<T = any> {
  match(exception: unknown): boolean;
  handle(exception: T): AbstractException;
}
