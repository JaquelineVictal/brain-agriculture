import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entity/user/user.entity';
import { HashHandler } from '../hash-handler/hash-handler.service';
import { Email } from 'src/domain/class/email/email.class';
import { ConflictException } from '../exception-handler/default-exception/conflict.exception';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/application/dto/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly _repository: UserRepository,
    private readonly _hashHandler: HashHandler,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createUserEntity = await UserEntity.create({
      ...createUserDto,
      hashHandler: this._hashHandler,
    });

    await this._existingUserByEmail(createUserEntity.email);

    return await this._repository.create(createUserEntity);
  }

  async findById(userId: number): Promise<UserEntity> {
    const findUser = await this._findUserById(userId);
    return findUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this._repository.findAll();
  }

  async updateById(
    updateUserDto: UpdateUserDto,
    id: number,
  ): Promise<UserEntity> {
    await this._findUserById(id);

    return await this._repository.updateById(updateUserDto, id);
  }

  async deleteById(userId: number): Promise<UserEntity> {
    await this._findUserById(userId);

    return await this._repository.deleteById(userId);
  }

  private async _findUserById(userId: number): Promise<UserEntity> {
    const findUser = await this._repository.findById(userId);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  private async _existingUserByEmail(email: Email): Promise<void> {
    const existingUser = await this._repository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }
}
