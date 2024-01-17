import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repository/repository.modulo';
import { HashHandler } from './hash-handler/hash-handler.service';
import { ExceptionHandler } from './exception-handler/exception-handler.service';
import {
  ErrorToExceptionNormalizer,
  NumberToExceptionNormalizer,
  StringToExceptionNormalizer,
  UnknownToExceptionNormalizer,
} from './exception-handler/default-strategies';
import { UserService } from './user/user.service';
import { CultivationService } from './cultivation/cultivation.service';
import { RuralProducerService } from './rural-producer/rural-producer.service';
@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    UserService,
    HashHandler,
    ExceptionHandler,
    UnknownToExceptionNormalizer,
    ErrorToExceptionNormalizer,
    StringToExceptionNormalizer,
    NumberToExceptionNormalizer,
    CultivationService,
    RuralProducerService,
  ],
  exports: [
    UserService,
    HashHandler,
    ExceptionHandler,
    UnknownToExceptionNormalizer,
    ErrorToExceptionNormalizer,
    StringToExceptionNormalizer,
    NumberToExceptionNormalizer,
    CultivationService,
    RuralProducerService,
  ],
})
export class ServiceModule {}
