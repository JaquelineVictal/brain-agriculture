import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

import { RuralProducerEntity } from 'src/domain/entity/rural-producer/rural-producer.entity';
import { UpdateRuralProducerDto } from 'src/application/dto/rural-producer/update-rural-producer.dto';

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
    const ruralProducer = await this.database.ruralProducer.findMany();

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
      const ruralProducerCultivationData = cultivationIds.map(
        (cultivationId) => {
          return {
            cultivationId,
            ruralProducerId: id,
          };
        },
      );

      await this.database.ruralProducerCultivation.deleteMany({
        where: {
          ruralProducerId: id,
        },
      });

      await this.database.ruralProducerCultivation.createMany({
        data: ruralProducerCultivationData,
      });
    }

    return RuralProducerEntity.fromDatabase(ruralProducer);
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
}
