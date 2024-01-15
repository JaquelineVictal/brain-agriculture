import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from 'src/infrastructure/repository/customer/customer.repository';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { Document } from 'src/domain/class/cpf/cpf.class';
import { Email } from 'src/domain/class/email/email.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { Hash } from 'src/domain/class/hash/hash.class';
import { HashHandler } from '../hash-handler/hash-handler.service';
import { CustomerDto } from 'src/application/dto/customer/customer.dto';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

jest.mock('src/domain/class/uuid/uuid.class', () => {
  return {
    Uuid: class MockedUuid {
      static create = () => {
        return new Uuid('45726886-7774-11ee-b962-0242ac120002');
      };
    },
  };
});

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {
            created: jest.fn().mockResolvedValue(createdCustomerEntityMock),
            findByEmail: jest.fn().mockResolvedValue(null),
            findByCpf: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(createdCustomerEntityMock),
            findAll: jest.fn().mockResolvedValue([createdCustomerEntityMock]),
            updateById: jest.fn().mockResolvedValue(createdCustomerEntityMock),
            deleteById: jest.fn().mockResolvedValue(createdCustomerEntityMock),
          },
        },
        {
          provide: HashHandler,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('OnSucess', () => {
    it('should create a new customer when valid customerDto is provided', async () => {
      await customerService.created(customerDtoMock);

      expect(customerRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(customerRepository.findByCpf).toHaveBeenCalledWith(
        new Document('31451145063'),
      );
      expect(customerRepository.created).toHaveBeenCalledWith(
        createdCustomerEntityMock,
      );
    });

    it('should get a customer customer ID when valid ID is provided', async () => {
      const result = await customerService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(result).toEqual(createdCustomerEntityMock);
    });

    it('should get all customer', async () => {
      const result = await customerService.findAll();

      expect(customerRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([createdCustomerEntityMock]);
    });

    it('should update a customer by ID when valid ID and customerDto are provided', async () => {
      const updateCustomerDtoMock = customerDtoMock;
      updateCustomerDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      await customerService.updateById(updateCustomerDtoMock);

      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.updateById).toHaveBeenCalledWith(
        createdCustomerEntityMock,
      );
    });

    it('should delete a customer by ID when valid ID is provided', async () => {
      await customerService.deleteById('45726886-7774-11ee-b962-0242ac120002');

      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });

  describe('OnFailure', () => {
    it('should throw to created customer error when email already exists', async () => {
      jest
        .spyOn(customerRepository, 'findByEmail')
        .mockResolvedValue(createdCustomerEntityMock);

      const promise = customerService.created(customerDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
      expect(customerRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(customerRepository.findByCpf).toHaveBeenCalledTimes(0);
      expect(customerRepository.created).toHaveBeenCalledTimes(0);
    });
    it('should throw to created customer error when cpf already exists', async () => {
      jest
        .spyOn(customerRepository, 'findByCpf')
        .mockResolvedValue(createdCustomerEntityMock);

      const promise = customerService.created(customerDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('CPF already exists'),
      );

      expect(customerRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(customerRepository.findByCpf).toHaveBeenCalledWith(
        new Document('31451145063'),
      );
      expect(customerRepository.created).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to created Customer', async () => {
      jest
        .spyOn(customerRepository, 'created')
        .mockRejectedValue(new Error('database error'));

      const promise = customerService.created(customerDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(customerRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(customerRepository.findByCpf).toHaveBeenCalledWith(
        new Document('31451145063'),
      );
      expect(customerRepository.created).toHaveBeenCalledWith(
        createdCustomerEntityMock,
      );
    });

    it('should throw server error to find user by id', async () => {
      jest
        .spyOn(customerRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = customerService.findById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });

    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(customerRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = customerService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(customerRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a customer error when invalid id is provided', async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(null);
      const updateCustomerDtoMock = customerDtoMock;
      updateCustomerDtoMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = customerService.updateById(updateCustomerDtoMock);

      await expect(promise).rejects.toThrow(
        new NotFoundException('Customer not found'),
      );
      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a customer ', async () => {
      jest
        .spyOn(customerRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateCustomerMock = customerDtoMock;

      updateCustomerMock.id = '45726886-7774-11ee-b962-0242ac120002';

      const promise = customerService.updateById(updateCustomerMock);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.updateById).toHaveBeenCalledWith(
        createdCustomerEntityMock,
      );
    });
    it('should throw to delete customer error when invalid id is provided', async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(null);

      const promise = customerService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(
        new NotFoundException('Customer not found'),
      );
      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a customer ', async () => {
      jest
        .spyOn(customerRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = customerService.deleteById(
        '45726886-7774-11ee-b962-0242ac120002',
      );

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(customerRepository.findById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
      expect(customerRepository.deleteById).toHaveBeenCalledWith(
        new Uuid('45726886-7774-11ee-b962-0242ac120002'),
      );
    });
  });
});

const customerDtoMock: CustomerDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  cpf: '31451145063',
  password: 'hashedPassword',
};

const createdCustomerEntityMock = new CustomerEntity({
  id: new Uuid('45726886-7774-11ee-b962-0242ac120002'),
  name: new HumanName('John Doe'),
  email: new Email('john.doe@example.com'),
  hash: new Hash('hashedPassword'),
  status: ENTITY_STATUS.ACTIVE,
  cpf: new Document('31451145063'),
  cameras: [],
});
