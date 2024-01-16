import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

import { Email } from 'src/domain/class/email/email.class';
import { UserEntity } from 'src/domain/entity/user/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private database: DatabaseService) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const saveNewUser = await this.database.user.create({
      data: userEntity.getPrismaModelCreate(),
    });

    return UserEntity.fromDatabase(saveNewUser);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return UserEntity.fromDatabase(user);
  }

  async findByEmail(email: Email): Promise<UserEntity | null> {
    const user = await this.database.user.findUnique({
      where: { email: email.value },
    });

    if (!user) return null;

    return UserEntity.fromDatabase(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const user = await this.database.user.findMany();

    if (!user.length) return [];

    return user.map((user) => UserEntity.fromDatabase(user));
  }

  async updateById(
    data: Prisma.UserUpdateInput,
    id: number,
  ): Promise<UserEntity> {
    const user = await this.database.user.update({
      data,
      where: { id },
    });

    return UserEntity.fromDatabase(user);
  }

  async deleteById(id: number): Promise<UserEntity> {
    const user = await this.database.user.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
    return UserEntity.fromDatabase(user);
  }

  async existsById(id: number): Promise<boolean> {
    const user = await this.database.user.findFirst({
      where: { id },
    });

    return user ? true : false;
  }
}
