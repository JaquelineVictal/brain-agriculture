import { Injectable } from '@nestjs/common';
import { CultivationEntity } from 'src/domain/entity/cultivation/cultivation.entity';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';
import { CultivationRepository } from 'src/infrastructure/repository/cultivation/cultivation.repository';
import { CreateCultivationDto } from 'src/application/dto/cultivation/create-cultivation.dto';
import { UpdateCultivationDto } from 'src/application/dto/cultivation/update-cultivation.dto';

@Injectable()
export class CultivationService {
  constructor(private readonly _repository: CultivationRepository) {}

  async create(
    createCultivationDto: CreateCultivationDto,
  ): Promise<CultivationEntity> {
    const createCultivationEntity = await CultivationEntity.create({
      ...createCultivationDto,
    });

    await this._existingCultivationByName(createCultivationEntity.name);

    return this._repository.create(createCultivationEntity);
  }

  async findById(cultivationId: number): Promise<CultivationEntity> {
    const findCultivation = await this._findCultivationById(cultivationId);
    return findCultivation;
  }

  async findAll(): Promise<CultivationEntity[]> {
    return this._repository.findAll();
  }

  async updateById(
    updateCultivationDto: UpdateCultivationDto,
    id: number,
  ): Promise<CultivationEntity> {
    await this._findCultivationById(id);

    return await this._repository.updateById(updateCultivationDto, id);
  }

  async deleteById(cultivationId: number): Promise<CultivationEntity> {
    await this._findCultivationById(cultivationId);

    return this._repository.deleteById(cultivationId);
  }

  private async _findCultivationById(
    cultivationId: number,
  ): Promise<CultivationEntity> {
    const findCultivation = await this._repository.findById(cultivationId);

    if (!findCultivation) {
      throw new NotFoundException('Cultivation not found');
    }
    return findCultivation;
  }

  private async _existingCultivationByName(name: string): Promise<void> {
    console.debug({ name });
    const existingCultivation = await this._repository.findByName(name);

    if (existingCultivation) {
      throw new ConflictException('Cultivation already exists');
    }
  }
}
