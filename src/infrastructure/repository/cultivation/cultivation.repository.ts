import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

import { Prisma } from '@prisma/client';
import { CultivationEntity } from 'src/domain/entity/cultivation/cultivation.entity';

@Injectable()
export class CultivationRepository {
  constructor(private database: DatabaseService) {}

  async create(
    cultivationEntity: CultivationEntity,
  ): Promise<CultivationEntity> {
    const saveNewCultivation = await this.database.cultivation.create({
      data: cultivationEntity.getPrismaModelCreate(),
    });

    return CultivationEntity.fromDatabase(saveNewCultivation);
  }

  async findById(id: number): Promise<CultivationEntity | null> {
    const cultivation = await this.database.cultivation.findUnique({
      where: { id },
    });

    if (!cultivation) return null;

    return CultivationEntity.fromDatabase(cultivation);
  }

  async findByName(name: string): Promise<CultivationEntity | null> {
    const cultivation = await this.database.cultivation.findUnique({
      where: { name },
    });

    if (!cultivation) return null;

    return CultivationEntity.fromDatabase(cultivation);
  }

  async findAll(): Promise<CultivationEntity[]> {
    const cultivation = await this.database.cultivation.findMany();

    if (!cultivation.length) return [];

    return cultivation.map((cultivation) =>
      CultivationEntity.fromDatabase(cultivation),
    );
  }

  async updateById(
    data: Prisma.CultivationUpdateInput,
    id: number,
  ): Promise<CultivationEntity> {
    const cultivation = await this.database.cultivation.update({
      data,
      where: { id },
    });

    return CultivationEntity.fromDatabase(cultivation);
  }

  async deleteById(id: number): Promise<CultivationEntity> {
    const cultivation = await this.database.cultivation.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
    return CultivationEntity.fromDatabase(cultivation);
  }

  async existsById(id: number): Promise<boolean> {
    const cultivation = await this.database.cultivation.findFirst({
      where: { id },
    });

    return cultivation ? true : false;
  }
}
