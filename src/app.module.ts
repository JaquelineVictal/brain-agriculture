import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './infrastructure/auth';
import { ControllerModule } from './application/controller/controller.module';

@Module({
  imports: [DatabaseModule, ControllerModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
