import { Test, TestingModule } from '@nestjs/testing';
import { CultivationService } from './cultivation.service';
import { CultivationEntity } from 'src/domain/entity/cultivation/cultivation.entity';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CultivationRepository } from 'src/infrastructure/repository/cultivation/cultivation.repository';
import { CreateCultivationDto } from 'src/application/dto/cultivation/create-cultivation.dto';

describe('CultivationService', () => {
  let cultivationService: CultivationService;
  let cultivationRepository: CultivationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivationService,
        {
          provide: CultivationRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(savedCultivationEntityMock),
            findByName: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(savedCultivationEntityMock),
            findAll: jest.fn().mockResolvedValue([savedCultivationEntityMock]),
            updateById: jest.fn().mockResolvedValue(savedCultivationEntityMock),
            deleteById: jest.fn().mockResolvedValue(savedCultivationEntityMock),
          },
        },
      ],
    }).compile();

    cultivationService = module.get<CultivationService>(CultivationService);
    cultivationRepository = module.get<CultivationRepository>(
      CultivationRepository,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cultivationService).toBeDefined();
  });

  describe('OnSuccess', () => {
    it('should create a new cultivation when valid CreateCultivationDto is provided', async () => {
      await cultivationService.create(cultivationDtoMock);

      expect(cultivationRepository.findByName).toHaveBeenCalledWith('Corn');
      expect(cultivationRepository.create).toHaveBeenCalledWith(
        createCultivationEntityMock,
      );
    });

    it('should get a cultivation cultivation ID when valid ID is provided', async () => {
      const result = await cultivationService.findById(1);

      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(savedCultivationEntityMock);
    });

    it('should get all cultivation', async () => {
      const result = await cultivationService.findAll();

      expect(cultivationRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([savedCultivationEntityMock]);
    });

    it('should update a cultivation by ID when valid ID and cultivationDto are provided', async () => {
      const updateCultivationDtoMock = cultivationDtoMock;

      await cultivationService.updateById(updateCultivationDtoMock, 1);

      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.updateById).toHaveBeenCalledWith(
        updateCultivationDtoMock,
        1,
      );
    });

    it('should delete a cultivation by ID when valid ID is provided', async () => {
      await cultivationService.deleteById(1);

      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe('OnFailure', () => {
    it('should throw to created cultivation error when email already exists', async () => {
      jest
        .spyOn(cultivationRepository, 'findByName')
        .mockResolvedValue(savedCultivationEntityMock);

      const promise = cultivationService.create(cultivationDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('Cultivation already exists'),
      );
      expect(cultivationRepository.findByName).toHaveBeenCalledWith('Corn');
      expect(cultivationRepository.create).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to created Cultivation', async () => {
      jest
        .spyOn(cultivationRepository, 'create')
        .mockRejectedValue(new Error('database error'));

      const promise = cultivationService.create(cultivationDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(cultivationRepository.findByName).toHaveBeenCalledWith('Corn');
      expect(cultivationRepository.create).toHaveBeenCalledWith(
        createCultivationEntityMock,
      );
    });

    it('should throw server error to find cultivation by id', async () => {
      jest
        .spyOn(cultivationRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = cultivationService.findById(1);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw server error to find all cultivation ', async () => {
      jest
        .spyOn(cultivationRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = cultivationService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cultivationRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a cultivation error when invalid id is provided', async () => {
      jest.spyOn(cultivationRepository, 'findById').mockResolvedValue(null);
      const updateCultivationDtoMock = cultivationDtoMock;

      const promise = cultivationService.updateById(
        updateCultivationDtoMock,
        1,
      );

      await expect(promise).rejects.toThrow(
        new NotFoundException('Cultivation not found'),
      );
      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a cultivation ', async () => {
      jest
        .spyOn(cultivationRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateCultivationMock = cultivationDtoMock;

      const promise = cultivationService.updateById(updateCultivationMock, 1);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.updateById).toHaveBeenCalledWith(
        updateCultivationMock,
        1,
      );
    });
    it('should throw to delete cultivation error when invalid id is provided', async () => {
      jest.spyOn(cultivationRepository, 'findById').mockResolvedValue(null);

      const promise = cultivationService.deleteById(1);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Cultivation not found'),
      );
      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a cultivation ', async () => {
      jest
        .spyOn(cultivationRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = cultivationService.deleteById(1);

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(cultivationRepository.findById).toHaveBeenCalledWith(1);
      expect(cultivationRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });
});

const cultivationDtoMock: CreateCultivationDto = {
  name: 'Corn',
};

const createCultivationEntityMock = new CultivationEntity({
  name: 'Corn',
  status: ENTITY_STATUS.ACTIVE,
});

const savedCultivationEntityMock = new CultivationEntity({
  id: 1,
  name: 'Corn',
  status: ENTITY_STATUS.ACTIVE,
});
