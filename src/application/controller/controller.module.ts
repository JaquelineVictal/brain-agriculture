import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/domain/service/service.module';
import { HttpErrorHandler } from '../services/error-handler/http-error-handler.service';
import { AuthModule } from 'src/infrastructure/auth';
import { UserController } from './user/user.controller';
import { CultivationController } from './cultivation/cultivation.controller';
import { RuralProducerController } from './rural-producer/rural-producer.controller';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [
    UserController,
    CultivationController,
    RuralProducerController,
    DashboardController,
  ],
  providers: [HttpErrorHandler],
  exports: [HttpErrorHandler],
})
export class ControllerModule {}
