import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { IExceptionHandlerStrategy } from '../../exception-handler-strategy.contract';
import { TextException } from './text-exception.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StringToExceptionNormalizer
  implements IExceptionHandlerStrategy<string>
{
  match(error: unknown): boolean {
    return typeof error === 'string';
  }

  handle(error: string): AbstractException {
    return new TextException(error);
  }
}
