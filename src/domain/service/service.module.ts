import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repository/repository.modulo';
import { CustomerService } from './customer/customer.service';
import { CameraService } from './camera/camera.service';
import { AlertLogService } from './alert-log/alert-log.service';
import { HashHandler } from './hash-handler/hash-handler.service';
import { ExceptionHandler } from './exception-handler/exception-handler.service';
import {
  ErrorToExceptionNormalizer,
  NumberToExceptionNormalizer,
  StringToExceptionNormalizer,
  UnknownToExceptionNormalizer,
} from './exception-handler/default-strategies';
import { UserService } from './user/user.service';
@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [
    UserService,
    CustomerService,
    CameraService,
    AlertLogService,
    HashHandler,
    ExceptionHandler,
    UnknownToExceptionNormalizer,
    ErrorToExceptionNormalizer,
    StringToExceptionNormalizer,
    NumberToExceptionNormalizer,
  ],
  exports: [
    UserService,
    CustomerService,
    CameraService,
    AlertLogService,
    HashHandler,
    ExceptionHandler,
    UnknownToExceptionNormalizer,
    ErrorToExceptionNormalizer,
    StringToExceptionNormalizer,
    NumberToExceptionNormalizer,
  ],
})
export class ServiceModule {}
