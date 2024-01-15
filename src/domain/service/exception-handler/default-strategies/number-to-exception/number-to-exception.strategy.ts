import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { NumberCodeException } from './number-code.exception';
import { IExceptionHandlerStrategy } from '../../exception-handler-strategy.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberToExceptionNormalizer
  implements IExceptionHandlerStrategy<number>
{
  match(error: unknown): boolean {
    return typeof error === 'number';
  }

  handle(error: number): AbstractException {
    return new NumberCodeException(error);
  }
}
