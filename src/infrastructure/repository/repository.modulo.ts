import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user/user.repository';
import { CultivationRepository } from './cultivation/cultivation.repository';
import { RuralProducerRepository } from './rural-producer/rural-producer.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserRepository, CultivationRepository, RuralProducerRepository],
  exports: [UserRepository, CultivationRepository, RuralProducerRepository],
})
export class RepositoryModule {}
