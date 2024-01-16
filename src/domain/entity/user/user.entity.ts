import { Hash } from 'src/domain/class/hash/hash.class';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { IHashHandler } from 'src/domain/service/hash-handler/hash-handler.contract';
import { Email } from 'src/domain/class/email/email.class';
import { ENTITY_STATUS } from '../entity-status.enum';
import { Prisma } from '@prisma/client';
import { UserResponseDto } from 'src/application/dto/user/response-user.dto';

export class UserEntity {
  readonly id?: number;
  readonly name: HumanName;
  readonly hash: Hash;
  readonly status: ENTITY_STATUS;
  readonly email: Email;

  constructor(props: TUserEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.hash = props.hash;
    this.status = props.status;
    this.email = props.email;
  }

  static async create(params: TUserEntityParams) {
    return new UserEntity({
      name: HumanName.create(params.name),
      email: Email.create(params.email),
      hash: await Hash.create(params.password, params.hashHandler),
      status: ENTITY_STATUS.ACTIVE,
    });
  }

  static fromDatabase(params): UserEntity {
    return new UserEntity({
      id: params.id,
      name: new HumanName(params.name),
      email: new Email(params.email),
      hash: new Hash(params.password),
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  getPrismaModelCreate(): Prisma.UserCreateInput {
    return {
      name: this.name.value,
      email: this.email.value,
      password: this.hash.value,
    };
  }

  async getPrismaModelUpdate(
    params: TUserEntityUpdateParams,
  ): Promise<Prisma.UserUpdateInput> {
    return {
      name: params.name ? HumanName.create(params.name).value : undefined,
      email: params.email ? Email.create(params.email).value : undefined,
      password: params.password
        ? (await Hash.create(params.password, params.hashHandler)).value
        : undefined,
    };
  }

  getResponseValues(): UserResponseDto {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      status: this.status,
    };
  }
}

type TUserEntityProps = {
  readonly id?: number;
  readonly name: HumanName;
  readonly email: Email;
  readonly hash: Hash;
  readonly status: ENTITY_STATUS;
};

type TUserEntityParams = {
  readonly hashHandler: IHashHandler;
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

type TUserEntityUpdateParams = {
  readonly hashHandler: IHashHandler;
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
};
