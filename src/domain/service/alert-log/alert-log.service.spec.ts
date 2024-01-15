import { Test, TestingModule } from '@nestjs/testing';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Ip } from 'src/domain/class/ip/ip.class';
import { AlertLogRepository } from 'src/infrastructure/repository/alert-log/alert-log.repository';
import { AlertLogService } from './alert-log.service';
import { CameraService } from '../camera/camera.service';
import { CameraEntity } from 'src/domain/entity/camera/camera.entity';
import { AlertLogDto } from 'src/application/dto/alert-log/alert-log.dto';
import { AlertLogEntity } from 'src/domain/entity/alert-log/alert-log.entity';
import { DateTime } from 'src/domain/class/date-time/date-time.class';

jest.mock('src/domain/class/uuid/uuid.class', () => {
  return {
    Uuid: class MockedUuid {
      static create = () => {
        return new Uuid('45726886-7774-11ee-b962-0242ac120002');
      };
    },
  };
});

describe('AlertLogService', () => {
  let alertLogService: AlertLogService;
  let cameraService: CameraService;
  let alertLogRepository: AlertLogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertLogService,
        {
          provide: AlertLogRepository,
          useValue: {
            created: jest.fn().mockResolvedValue(createdAlertLogEntityMock),
            findById: jest.fn().mockResolvedValue(createdAlertLogEntityMock),
            findAll: jest.fn().mockResolvedValue([createdAlertLogEntityMock]),
            updateById: jest.fn().mockResolvedValue(createdAlertLogEntityMock),
            deleteById: jest.fn().mockResolvedValue(createdAlertLogEntityMock),
          },
        },
        {
          provide: CameraService,
          useValue: {
            findById: jest.fn().mockResolvedValue(createdCameraEntityMock),
          },
        },
      ],
    }).compile();

    alertLogService = module.get<AlertLogService>(AlertLogService);
    cameraService = module.get<CameraService>(CameraService);
    alertLogRepository = module.get<AlertLogRepository>(AlertLogRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(alertLogService).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new alertLog when valid alertLogDto is provided', async () => {
      await alertLogService.created(alertLogDtoMock);

      expect(alertLogRepository.created).toHaveBeenCalledWith(
        createdAlertLogEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should get a alertLog when valid ID is provided', async () => {
      const result = await alertLogService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(result).toEqual(createdAlertLogEntityMock);
    });

    it('should get all alertLog without filter', async () => {
      const result = await alertLogService.findAll({
        startDateTime: null,
        endDateTime: null,
        customerId: null,
      });

      expect(alertLogRepository.findAll).toHaveBeenCalledWith({
        startDateTime: null,
        endDateTime: null,
        customerId: null,
      });
      expect(result).toEqual([createdAlertLogEntityMock]);
    });

    it('should get all alertLog with filter', async () => {
      const result = await alertLogService.findAll({
        startDateTime: '2023-09-30 12:30:00',
        endDateTime: '2023-10-31 12:30:00',
        customerId: '45726886-7774-11ee-b962-0242ac120002',
      });

      expect(alertLogRepository.findAll).toHaveBeenCalledWith({
        startDateTime: DateTime.fromString('2023-09-30 12:30:00'),
        endDateTime: DateTime.fromString('2023-10-31 12:30:00'),
        customerId: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      });
      expect(result).toEqual([createdAlertLogEntityMock]);
    });

    it('should update a alertLog by ID when valid ID and alertLogDto are provided', async () => {
      const _findAlertLogById = jest.spyOn(
        alertLogService as any,
        '_findAlertById',
      );
      const findByIdCamera = jest.spyOn(cameraService as any, 'findById');

      const updateAlertLogDtoMock = alertLogDtoMock;
      updateAlertLogDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      await alertLogService.updateById(updateAlertLogDtoMock);

      expect(_findAlertLogById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(findByIdCamera).toHaveBeenCalledWith(
        '45726886-7774-11ee-b962-0242ac120002',
      );
      expect(alertLogRepository.updateById).toHaveBeenCalledWith(
        createdAlertLogEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should delete a alertLog by ID when valid ID is provided', async () => {
      await alertLogService.deleteById('45726886-7774-11ee-b962-0242ac120002');

      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(alertLogRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });

  describe('OnFailure', () => {
    it('should throw server error to created AlertLog', async () => {
      jest
        .spyOn(alertLogRepository, 'created')
        .mockRejectedValue(new Error('database error'));

      const promise = alertLogService.created(alertLogDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(alertLogRepository.created).toHaveBeenCalledWith(
        createdAlertLogEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should throw server error to find user by id', async () => {
      jest
        .spyOn(alertLogRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = alertLogService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(alertLogRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = alertLogService.findAll({
        startDateTime: null,
        endDateTime: null,
        customerId: null,
      });

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(alertLogRepository.findAll).toHaveBeenCalledWith({
        startDateTime: null,
        endDateTime: null,
        customerId: null,
      });
    });

    it('should throw to update a alertLog error when invalid id is provided', async () => {
      jest.spyOn(alertLogRepository, 'findById').mockResolvedValue(null);
      const updateAlertLogDtoMock = alertLogDtoMock;
      updateAlertLogDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = alertLogService.updateById(updateAlertLogDtoMock);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Alert not found'),
      );
      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(alertLogRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a alertLog ', async () => {
      jest
        .spyOn(alertLogRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateAlertLogMock = alertLogDtoMock;

      updateAlertLogMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = alertLogService.updateById(updateAlertLogMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(alertLogRepository.updateById).toHaveBeenCalledWith(
        createdAlertLogEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
    it('should throw to delete alertLog error when invalid id is provided', async () => {
      jest.spyOn(alertLogRepository, 'findById').mockResolvedValue(null);

      const promise = alertLogService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(
        new NotFoundException('Alert not found'),
      );
      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(alertLogRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a alertLog ', async () => {
      jest
        .spyOn(alertLogRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = alertLogService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(alertLogRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(alertLogRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });
});

const alertLogDtoMock: AlertLogDto = {
  occurredAt: '2023-10-31 12:30:00',
  cameraId: '45726886-7774-11ee-b962-0242ac120002',
};

const createdCameraEntityMock = new CameraEntity({
  id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
  name: 'camera-1',
  ip: new Ip('10.0.0.1'),
  isEnabled: true,
  status: ENTITY_STATUS.ACTIVE,
});

const createdAlertLogEntityMock = new AlertLogEntity({
  id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
  occurredAt: DateTime.fromString('2023-10-31 12:30:00'),
  status: ENTITY_STATUS.ACTIVE,
  camera: createdCameraEntityMock,
});
