import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { IExceptionHandlerStrategy } from '../../exception-handler-strategy.contract';
import { UnknownException } from './unknown.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnknownToExceptionNormalizer
  implements IExceptionHandlerStrategy<string>
{
  match(): boolean {
    return true;
  }

  handle(error: string): AbstractException {
    return new UnknownException(error);
  }
}
