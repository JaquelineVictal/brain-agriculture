import { Injectable } from '@nestjs/common';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';
import { CreateRuralProducerDto } from 'src/application/dto/rural-producer/create-rural-producer.dto';
import { UpdateRuralProducerDto } from 'src/application/dto/rural-producer/update-rural-producer.dto';
import { RuralProducerRepository } from 'src/infrastructure/repository/rural-producer/rural-producer.repository';
import { RuralProducerEntity } from 'src/domain/entity/rural-producer/rural-producer.entity';
import { HumanDocument } from 'src/domain/class/human-document/human-document.class';

@Injectable()
export class RuralProducerService {
  constructor(private readonly _repository: RuralProducerRepository) {}

  async create(
    createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<RuralProducerEntity> {
    const createRuralProducerEntity = await RuralProducerEntity.create({
      ...createRuralProducerDto,
    });

    await this._existingRuralProducerByDocument(
      createRuralProducerEntity.document,
    );

    return await this._repository.create(createRuralProducerEntity);
  }

  async findById(ruralProducerId: number): Promise<RuralProducerEntity> {
    const findRuralProducer =
      await this._findRuralProducerById(ruralProducerId);
    return findRuralProducer;
  }

  async findAll(): Promise<RuralProducerEntity[]> {
    return await this._repository.findAll();
  }

  async updateById(
    updateRuralProducerDto: UpdateRuralProducerDto,
    id: number,
  ): Promise<RuralProducerEntity> {
    await this._findRuralProducerById(id);

    return await this._repository.updateById(updateRuralProducerDto, id);
  }

  async deleteById(ruralProducerId: number): Promise<RuralProducerEntity> {
    await this._findRuralProducerById(ruralProducerId);

    return await this._repository.deleteById(ruralProducerId);
  }

  private async _findRuralProducerById(
    ruralProducerId: number,
  ): Promise<RuralProducerEntity> {
    const findRuralProducer = await this._repository.findById(ruralProducerId);

    if (!findRuralProducer) {
      throw new NotFoundException('RuralProducer not found');
    }
    return findRuralProducer;
  }

  private async _existingRuralProducerByDocument(
    document: HumanDocument,
  ): Promise<void> {
    const existingRuralProducer = await this._repository.findByDocument(
      document.value,
    );

    if (existingRuralProducer) {
      throw new ConflictException('Document already exists');
    }
  }
}
