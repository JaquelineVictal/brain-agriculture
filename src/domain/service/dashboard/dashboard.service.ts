import { Injectable } from '@nestjs/common';
import { CultivationDistributionDto } from 'src/application/dto/dashboard/cultivation-distribution.dto';
import { LandUseDistributionDto } from 'src/application/dto/dashboard/land-use-distribution.dto';
import { StateDistributionDto } from 'src/application/dto/dashboard/state-distribution.dto';

import { CultivationRepository } from 'src/infrastructure/repository/cultivation/cultivation.repository';
import { RuralProducerRepository } from 'src/infrastructure/repository/rural-producer/rural-producer.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly _cultivationRepository: CultivationRepository,
    private readonly _ruralProducerRepository: RuralProducerRepository,
  ) {}

  async getTotalFarmsCount(): Promise<number> {
    return this._ruralProducerRepository.getTotalFarmsCount();
  }

  async getTotalFarmArea(): Promise<number> {
    return this._ruralProducerRepository.getTotalFarmArea();
  }

  async getStateDistribution(): Promise<StateDistributionDto[]> {
    return this._ruralProducerRepository.getStateDistribution();
  }

  async getCultivationDistribution(): Promise<CultivationDistributionDto[]> {
    return this._ruralProducerRepository.getCultivationDistribution();
  }

  async getLandUseDistribution(): Promise<LandUseDistributionDto> {
    return this._ruralProducerRepository.getLandUseDistribution();
  }
}
