import { Test, TestingModule } from '@nestjs/testing';
import { CameraEntity } from 'src/domain/entity/camera/camera.entity';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { CameraDto } from 'src/application/dto/camera/camera.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CameraService } from './camera.service';
import { CameraRepository } from 'src/infrastructure/repository/camera/camera.repository';
import { Ip } from 'src/domain/class/ip/ip.class';
import { CustomerService } from '../customer/customer.service';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { Email } from 'src/domain/class/email/email.class';
import { Hash } from 'src/domain/class/hash/hash.class';
import { Document } from 'src/domain/class/cpf/cpf.class';

jest.mock('src/domain/class/uuid/uuid.class', () => {
  return {
    Uuid: class MockedUuid {
      static create = () => {
        return new Uuid('45726886-7774-11ee-b962-0242ac120002');
      };
    },
  };
});

describe('CameraService', () => {
  let cameraService: CameraService;
  let customerService: CustomerService;
  let cameraRepository: CameraRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CameraService,
        {
          provide: CameraRepository,
          useValue: {
            created: jest.fn().mockResolvedValue(createdCameraEntityMock),
            findById: jest.fn().mockResolvedValue(createdCameraEntityMock),
            findAll: jest.fn().mockResolvedValue([createdCameraEntityMock]),
            updateById: jest.fn().mockResolvedValue(createdCameraEntityMock),
            deleteById: jest.fn().mockResolvedValue(createdCameraEntityMock),
          },
        },
        {
          provide: CustomerService,
          useValue: {
            findById: jest.fn().mockResolvedValue(createdCustomerEntityMock),
          },
        },
      ],
    }).compile();

    cameraService = module.get<CameraService>(CameraService);
    customerService = module.get<CustomerService>(CustomerService);
    cameraRepository = module.get<CameraRepository>(CameraRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cameraService).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new camera when valid cameraDto is provided', async () => {
      await cameraService.created(cameraDtoMock);

      expect(cameraRepository.created).toHaveBeenCalledWith(
        createdCameraEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should get a camera camera ID when valid ID is provided', async () => {
      const result = await cameraService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(result).toEqual(createdCameraEntityMock);
    });

    it('should get all camera without filter', async () => {
      const result = await cameraService.findAll({
        isEnabled: null,
        customerId: null,
      });

      expect(cameraRepository.findAll).toHaveBeenCalledWith({
        isEnabled: null,
        customerId: null,
      });
      expect(result).toEqual([createdCameraEntityMock]);
    });

    it('should get all camera with filter', async () => {
      const result = await cameraService.findAll({
        isEnabled: 'false',
        customerId: '45726886-7774-11ee-b962-0242ac120002',
      });

      expect(cameraRepository.findAll).toHaveBeenCalledWith({
        isEnabled: false,
        customerId: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      });
      expect(result).toEqual([createdCameraEntityMock]);
    });

    it('should update a camera by ID when valid ID and cameraDto are provided', async () => {
      const _findCameraById = jest.spyOn(
        cameraService as any,
        '_findCameraById',
      );
      const findByIdCustomer = jest.spyOn(customerService as any, 'findById');

      const updateCameraDtoMock = cameraDtoMock;
      updateCameraDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      await cameraService.updateById(updateCameraDtoMock);

      expect(_findCameraById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(findByIdCustomer).toHaveBeenCalledWith(
        '45726886-7774-11ee-b962-0242ac120002',
      );
      expect(cameraRepository.updateById).toHaveBeenCalledWith(
        createdCameraEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should delete a camera by ID when valid ID is provided', async () => {
      await cameraService.deleteById('45726886-7774-11ee-b962-0242ac120002');

      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(cameraRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });

  describe('OnFailure', () => {
    it('should throw server error to created Camera', async () => {
      jest
        .spyOn(cameraRepository, 'created')
        .mockRejectedValue(new Error('database error'));

      const promise = cameraService.created(cameraDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(cameraRepository.created).toHaveBeenCalledWith(
        createdCameraEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should throw server error to find user by id', async () => {
      jest
        .spyOn(cameraRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = cameraService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(cameraRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = cameraService.findAll({
        isEnabled: null,
        customerId: null,
      });

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cameraRepository.findAll).toHaveBeenCalledWith({
        isEnabled: null,
        customerId: null,
      });
    });

    it('should throw to update a camera error when invalid id is provided', async () => {
      jest.spyOn(cameraRepository, 'findById').mockResolvedValue(null);
      const updateCameraDtoMock = cameraDtoMock;
      updateCameraDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = cameraService.updateById(updateCameraDtoMock);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Camera not found'),
      );
      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(cameraRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a camera ', async () => {
      jest
        .spyOn(cameraRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateCameraMock = cameraDtoMock;

      updateCameraMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = cameraService.updateById(updateCameraMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(cameraRepository.updateById).toHaveBeenCalledWith(
        createdCameraEntityMock,
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
    it('should throw to delete camera error when invalid id is provided', async () => {
      jest.spyOn(cameraRepository, 'findById').mockResolvedValue(null);

      const promise = cameraService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(
        new NotFoundException('Camera not found'),
      );
      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(cameraRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a camera ', async () => {
      jest
        .spyOn(cameraRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = cameraService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(cameraRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(cameraRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });
});

const cameraDtoMock: CameraDto = {
  name: 'camera-1',
  ip: '10.0.0.1',
  isEnabled: true,
  customerId: '45726886-7774-11ee-b962-0242ac120002',
};

const createdCameraEntityMock = new CameraEntity({
  id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
  name: 'camera-1',
  ip: new Ip('10.0.0.1'),
  isEnabled: true,
  status: ENTITY_STATUS.ACTIVE,
});

const createdCustomerEntityMock = new CustomerEntity({
  id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
  name: new HumanName('John Doe'),
  email: new Email('john.doe@example.com'),
  hash: new Hash('hashedPassword'),
  status: ENTITY_STATUS.ACTIVE,
  cpf: new Document('31451145063'),
  cameras: [],
});
