import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AlertLogRepository } from './alert-log/alert-log.repository';
import { CameraRepository } from './camera/camera.repository';
import { CustomerRepository } from './customer/customer.repository';
import { UserRepository } from './user/user.repository';
import { CultivationRepository } from './cultivation/cultivation.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CustomerRepository,
    CameraRepository,
    AlertLogRepository,
    UserRepository,
    CultivationRepository,
  ],
  exports: [
    CustomerRepository,
    CameraRepository,
    AlertLogRepository,
    UserRepository,
    CultivationRepository,
  ],
})
export class RepositoryModule {}
