import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

import { RuralProducerEntity } from 'src/domain/entity/rural-producer/rural-producer.entity';
import { UpdateRuralProducerDto } from 'src/application/dto/rural-producer/update-rural-producer.dto';
import { StateDistributionDto } from 'src/application/dto/dashboard/state-distribution.dto';
import { CultivationDistributionDto } from 'src/application/dto/dashboard/cultivation-distribution.dto';
import { LandUseDistributionDto } from 'src/application/dto/dashboard/land-use-distribution.dto';

@Injectable()
export class RuralProducerRepository {
  constructor(private database: DatabaseService) {}

  async create(
    ruralProducerEntity: RuralProducerEntity,
  ): Promise<RuralProducerEntity> {
    const saveNewRuralProducer = await this.database.ruralProducer.create({
      data: ruralProducerEntity.getPrismaModelCreate(),
    });

    const cultivationIds = ruralProducerEntity.getCultivationIds();

    if (cultivationIds.length > 0) {
      const ruralProducerCultivationData = cultivationIds.map(
        (cultivationId) => {
          return {
            cultivationId,
            ruralProducerId: saveNewRuralProducer.id,
          };
        },
      );

      await this.database.ruralProducerCultivation.createMany({
        data: ruralProducerCultivationData,
      });
    }

    return RuralProducerEntity.fromDatabase({
      ...saveNewRuralProducer,
      cultivationIds,
    });
  }

  async findById(id: number): Promise<RuralProducerEntity | null> {
    const ruralProducer = await this.database.ruralProducer.findUnique({
      include: { ruralProducerCultivation: true },
      where: { id },
    });

    if (!ruralProducer) return null;

    return RuralProducerEntity.fromDatabase(ruralProducer);
  }

  async findByDocument(document: string): Promise<RuralProducerEntity | null> {
    const ruralProducer = await this.database.ruralProducer.findUnique({
      where: { document },
    });

    if (!ruralProducer) return null;

    return RuralProducerEntity.fromDatabase(ruralProducer);
  }

  async findAll(): Promise<RuralProducerEntity[]> {
    const ruralProducer = await this.database.ruralProducer.findMany({
      include: { ruralProducerCultivation: true },
    });

    if (!ruralProducer.length) return [];

    return ruralProducer.map((ruralProducer) =>
      RuralProducerEntity.fromDatabase(ruralProducer),
    );
  }

  async updateById(
    data: UpdateRuralProducerDto,
    id: number,
  ): Promise<RuralProducerEntity> {
    const ruralProducer = await this.database.ruralProducer.update({
      data,
      where: { id },
    });

    const cultivationIds = data.cultivationIds;

    if (cultivationIds?.length > 0) {
      await this.updateRuralProducerCultivation(cultivationIds, id);
    }

    return RuralProducerEntity.fromDatabase({
      ...ruralProducer,
      cultivationIds,
    });
  }

  async deleteById(id: number): Promise<RuralProducerEntity> {
    const ruralProducer = await this.database.ruralProducer.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
    return RuralProducerEntity.fromDatabase(ruralProducer);
  }

  async existsById(id: number): Promise<boolean> {
    const ruralProducer = await this.database.ruralProducer.findFirst({
      where: { id },
    });

    return ruralProducer ? true : false;
  }

  async updateRuralProducerCultivation(
    cultivationIds: number[],
    ruralProducerId: number,
  ) {
    const ruralProducerCultivationData = cultivationIds.map((cultivationId) => {
      return {
        cultivationId,
        ruralProducerId,
      };
    });

    await this.database.ruralProducerCultivation.deleteMany({
      where: {
        ruralProducerId,
      },
    });

    await this.database.ruralProducerCultivation.createMany({
      data: ruralProducerCultivationData,
    });
  }

  async getTotalFarmsCount(): Promise<number> {
    return this.database.ruralProducer.count();
  }

  async getTotalFarmArea(): Promise<number> {
    const totalArea = await this.database.ruralProducer.aggregate({
      _sum: { areaTotal: true },
    });
    return totalArea._sum.areaTotal || 0;
  }

  async getStateDistribution(): Promise<StateDistributionDto[]> {
    const result = await this.database.ruralProducer.groupBy({
      by: ['state'],
      _count: true,
    });

    return result.map((result) => {
      return {
        state: result.state,
        count: result._count,
      };
    });
  }

  async getCultivationDistribution(): Promise<CultivationDistributionDto[]> {
    const result = await this.database.ruralProducerCultivation.groupBy({
      by: ['cultivationId'],
      _count: true,
    });

    return result.map((result) => {
      return {
        cultivationId: result.cultivationId,
        count: result._count,
      };
    });
  }

  async getLandUseDistribution(): Promise<LandUseDistributionDto> {
    const areas = await this.database.ruralProducer.aggregate({
      _sum: { areaTotal: true, areaAgricultural: true, areaVegetation: true },
    });
    return {
      areaTotal: areas._sum.areaTotal || 0,
      areaAgricultural: areas._sum.areaAgricultural || 0,
      areaVegetation: areas._sum.areaVegetation || 0,
    };
  }
}
