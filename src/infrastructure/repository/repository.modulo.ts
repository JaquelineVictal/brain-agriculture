import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AlertLogRepository } from './alert-log/alert-log.repository';
import { CameraRepository } from './camera/camera.repository';
import { CustomerRepository } from './customer/customer.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [CustomerRepository, CameraRepository, AlertLogRepository],
  exports: [CustomerRepository, CameraRepository, AlertLogRepository],
})
export class RepositoryModule {}
