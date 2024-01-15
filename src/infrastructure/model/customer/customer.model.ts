import { Prisma } from '@prisma/client';

import { Document } from 'src/domain/class/cpf/cpf.class';
import { Email } from 'src/domain/class/email/email.class';
import { Hash } from 'src/domain/class/hash/hash.class';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { CustomerEntity } from 'src/domain/entity/customer/customer.entity';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { TNullable } from 'src/domain/types/nullable.type';

export class CustomerModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly hash: string;
  readonly cpf: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;

  constructor(props: TCustomerModelProps) {
    this.id = props.id;
    this.name = props.name;
    this.hash = props.hash;
    this.cpf = props.cpf;
    this.email = props.email;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static fromEntity(entity: CustomerEntity) {
    return new CustomerModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: entity.status === ENTITY_STATUS.ACTIVE ? null : new Date(),
      hash: entity.hash.value,
      id: entity.id.value,
      name: entity.name.value,
      email: entity.email.value,
      cpf: entity.cpf.value,
    });
  }

  toEntity(): CustomerEntity {
    return new CustomerEntity({
      email: new Email(this.email),
      hash: new Hash(this.hash),
      id: new Uuid(this.id),
      name: new HumanName(this.name),
      cpf: new Document(this.cpf),
      status: this.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
      cameras: [],
    });
  }

  saveNewCustomer(): Prisma.CustomersCreateInput {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
      password: this.hash,
      email: this.email,
    };
  }
}

type TCustomerModelProps = {
  readonly id: string;
  readonly name: string;
  readonly hash: string;
  readonly email: string;
  readonly cpf: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;
};
