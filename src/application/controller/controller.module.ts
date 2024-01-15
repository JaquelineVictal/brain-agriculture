import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/domain/service/service.module';
import { CustomerController } from './customer/customer.controller';
import { CameraController } from './camera/camera.controller';
import { AlertLogsController } from './alert-log/alert-log.controller';
import { HttpErrorHandler } from '../services/error-handler/http-error-handler.service';
import { AuthModule } from 'src/infrastructure/auth';

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [CustomerController, CameraController, AlertLogsController],
  providers: [HttpErrorHandler],
  exports: [HttpErrorHandler],
})
export class ControllerModule {}
