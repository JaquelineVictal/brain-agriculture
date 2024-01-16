import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from 'src/domain/entity/user/user.entity';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { Email } from 'src/domain/class/email/email.class';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { Hash } from 'src/domain/class/hash/hash.class';
import { HashHandler } from '../hash-handler/hash-handler.service';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(savedUserEntityMock),
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(savedUserEntityMock),
            findAll: jest.fn().mockResolvedValue([savedUserEntityMock]),
            updateById: jest.fn().mockResolvedValue(savedUserEntityMock),
            deleteById: jest.fn().mockResolvedValue(savedUserEntityMock),
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

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('OnSuccess', () => {
    it('should create a new user when valid CreateUserDto is provided', async () => {
      await userService.create(userDtoMock);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserEntityMock);
    });

    it('should get a user user ID when valid ID is provided', async () => {
      const result = await userService.findById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(savedUserEntityMock);
    });

    it('should get all user', async () => {
      const result = await userService.findAll();

      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([savedUserEntityMock]);
    });

    it('should update a user by ID when valid ID and userDto are provided', async () => {
      const updateUserDtoMock = userDtoMock;

      await userService.updateById(updateUserDtoMock, 1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.updateById).toHaveBeenCalledWith(
        updateUserDtoMock,
        1,
      );
    });

    it('should delete a user by ID when valid ID is provided', async () => {
      await userService.deleteById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe('OnFailure', () => {
    it('should throw to created user error when email already exists', async () => {
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(savedUserEntityMock);

      const promise = userService.create(userDtoMock);

      await expect(promise).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(userRepository.create).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to created User', async () => {
      jest
        .spyOn(userRepository, 'create')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.create(userDtoMock);

      await expect(promise).rejects.toThrow(new Error('database error'));

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        new Email('john.doe@example.com'),
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserEntityMock);
    });

    it('should throw server error to find user by id', async () => {
      jest
        .spyOn(userRepository, 'findById')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.findById(1);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw server error to find all user ', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockRejectedValue(new Error('database error'));

      const promise = userService.findAll();

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw to update a user error when invalid id is provided', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);
      const updateUserDtoMock = userDtoMock;

      const promise = userService.updateById(updateUserDtoMock, 1);

      await expect(promise).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.updateById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to update a user ', async () => {
      jest
        .spyOn(userRepository, 'updateById')
        .mockRejectedValue(new Error('database error'));

      const updateUserMock = userDtoMock;

      const promise = userService.updateById(updateUserMock, 1);

      await expect(promise).rejects.toThrow(new Error('database error'));
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.updateById).toHaveBeenCalledWith(updateUserMock, 1);
    });
    it('should throw to delete user error when invalid id is provided', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      const promise = userService.deleteById(1);

      await expect(promise).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.deleteById).toHaveBeenCalledTimes(0);
    });
    it('should throw server error to delete a user ', async () => {
      jest
        .spyOn(userRepository, 'deleteById')
        .mockRejectedValue(new Error('An error occurred'));

      const promise = userService.deleteById(1);

      await expect(promise).rejects.toThrow(new Error('An error occurred'));
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.deleteById).toHaveBeenCalledWith(1);
    });
  });
});

const userDtoMock: CreateUserDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'hashedPassword',
};

const createUserEntityMock = new UserEntity({
  name: new HumanName('John Doe'),
  email: new Email('john.doe@example.com'),
  hash: new Hash('hashedPassword'),
  status: ENTITY_STATUS.ACTIVE,
});

const savedUserEntityMock = new UserEntity({
  id: 1,
  name: new HumanName('John Doe'),
  email: new Email('john.doe@example.com'),
  hash: new Hash('hashedPassword'),
  status: ENTITY_STATUS.ACTIVE,
});
