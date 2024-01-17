import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerService } from './rural-producer.service';

import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateRuralProducerDto } from 'src/application/dto/rural-producer/create-rural-producer.dto';
import { RuralProducerRepository } from 'src/infrastructure/repository/rural-producer/rural-producer.repository';
import { RuralProducerEntity } from 'src/domain/entity/rural-producer/rural-producer.entity';
import { HumanDocument } from 'src/domain/class/human-document/human-document.class';

describe('RuralProducerService', () => {
  let ruralProducerService: RuralProducerService;
  let ruralProducerRepository: RuralProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuralProducerService,
        {
          provide: RuralProducerRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(savedRuralProducerEntityMock),
            findByDocument: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(savedRuralProducerEntityMock),
            findAll: jest
              .fn()
              .mockResolvedValue([savedRuralProducerEntityMock]),
            updateById: jest
              .fn()
              .mockResolvedValue(savedRuralProducerEntityMock),
            deleteById: jest
              .fn()
              .mockResolvedValue(savedRuralProducerEntityMock),
          },
        },
      ],
    }).compile();

    ruralProducerService =
      module.get<RuralProducerService>(RuralProducerService);
    ruralProducerRepository = module.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ruralProducerService).toBeDefined();
  });

  describe('OnSuccess', () => {
    it('should create a new ruralProducer when valid CreateRuralProducerDto is provided', async () => {
      await ruralProducerService.create(ruralProducerDtoMock);

      expect(ruralProducerRepository.findByDocument).toHaveBeenCalledWith(
        '62410074000153',
      );
      expect(ruralProducerRepository.create).toHaveBeenCalledWith(
        createRuralProducerEntityMock,
      );
    });

    it('should get a ruralProducer ruralProducer ID when valid ID is provided', async () => {
      const result = await ruralProducerService.findById(1);

      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(savedRuralProducerEntityMock);
    });

    it('should get all ruralProducer', async () => {
      const result = await ruralProducerService.findAll();

      expect(ruralProducerRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([savedRuralProducerEntityMock]);
    });

    it('should update a ruralProducer by ID when valid ID and ruralProducerDto are provided', async () => {
      const updateRuralProducerDtoMock = ruralProducerDtoMock;

      await ruralProducerService.updateById(updateRuralProducerDtoMock, 1);

      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.updateById).toHaveBeenCalledWith(
        updateRuralProducerDtoMock,
        1,
      );
    });

    it('should delete a ruralProducer by ID when valid ID is provided', async () => {
      await ruralProducerService.deleteById(1);

      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe('OnFailure', () => {
    it('should throw to created ruralProducer error when email already exists', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findByDocument')
        .mockResolvedValue(savedRuralProducerEntityMock);

      const promise = ruralProducerService.create(ruralProducerDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('Document already exists'),
      );
      expect(ruralProducerRepository.findByDocument).toHaveBeenCalledWith(
        '62410074000153',
      );
      expect(ruralProducerRepository.create).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to created RuralProducer', async () => {
      jest
        .spyOn(ruralProducerRepository, 'create')
        .mockRejectedValue(new Error('database error'));

      const promise = ruralProducerService.create(ruralProducerDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(ruralProducerRepository.findByDocument).toHaveBeenCalledWith(
        '62410074000153',
      );
      expect(ruralProducerRepository.create).toHaveBeenCalledWith(
        createRuralProducerEntityMock,
      );
    });

    it('should throw server error to find ruralProducer by id', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = ruralProducerService.findById(1);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw server error to find all ruralProducer ', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = ruralProducerService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(ruralProducerRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a ruralProducer error when invalid id is provided', async () => {
      jest.spyOn(ruralProducerRepository, 'findById').mockResolvedValue(null);
      const updateRuralProducerDtoMock = ruralProducerDtoMock;

      const promise = ruralProducerService.updateById(
        updateRuralProducerDtoMock,
        1,
      );

      await expect(promise).rejects.toThrow(
        new NotFoundException('RuralProducer not found'),
      );
      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a ruralProducer ', async () => {
      jest
        .spyOn(ruralProducerRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateRuralProducerMock = ruralProducerDtoMock;

      const promise = ruralProducerService.updateById(
        updateRuralProducerMock,
        1,
      );

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.updateById).toHaveBeenCalledWith(
        updateRuralProducerMock,
        1,
      );
    });
    it('should throw to delete ruralProducer error when invalid id is provided', async () => {
      jest.spyOn(ruralProducerRepository, 'findById').mockResolvedValue(null);

      const promise = ruralProducerService.deleteById(1);

      await expect(promise).rejects.toThrow(
        new NotFoundException('RuralProducer not found'),
      );
      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a ruralProducer ', async () => {
      jest
        .spyOn(ruralProducerRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = ruralProducerService.deleteById(1);

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(ruralProducerRepository.findById).toHaveBeenCalledWith(1);
      expect(ruralProducerRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });
});

const ruralProducerDtoMock: CreateRuralProducerDto = {
  document: '62.410.074/0001-53',
  nameProducer: 'John Doe',
  nameFarm: 'Farm 1',
  city: 'City 1',
  state: 'State 1',
  areaTotal: 100,
  areaAgricultural: 50,
  areaVegetation: 50,
  isValidAreaTotal: false,
  cultivationIds: [1],
};

const createRuralProducerEntityMock = new RuralProducerEntity({
  document: new HumanDocument('62410074000153'),
  nameProducer: new HumanName('John Doe'),
  nameFarm: 'Farm 1',
  city: 'City 1',
  state: 'State 1',
  areaTotal: 100,
  areaAgricultural: 50,
  areaVegetation: 50,
  cultivationIds: [1],
  status: ENTITY_STATUS.ACTIVE,
});

const savedRuralProducerEntityMock = new RuralProducerEntity({
  id: 1,
  document: new HumanDocument('62410074000153'),
  nameProducer: new HumanName('John Doe'),
  nameFarm: 'Farm 1',
  city: 'City 1',
  state: 'State 1',
  areaTotal: 100,
  areaAgricultural: 50,
  areaVegetation: 50,
  cultivationIds: [1],
  status: ENTITY_STATUS.ACTIVE,
});
