import { Hash } from 'src/domain/class/hash/hash.class';
import { HumanName } from 'src/domain/class/human-name/human-name.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { IHashHandler } from 'src/domain/service/hash-handler/hash-handler.contract';
import { Email } from 'src/domain/class/email/email.class';
import { Document } from 'src/domain/class/cpf/cpf.class';
import { CameraEntity } from '../camera/camera.entity';
import { TNullable } from 'src/domain/types/nullable.type';
import { ENTITY_STATUS } from '../entity-status.enum';

export class CustomerEntity {
  readonly id: Uuid;
  readonly name: HumanName;
  readonly hash: Hash;
  readonly status: ENTITY_STATUS;
  readonly email: Email;
  readonly cpf: Document;
  private readonly _cameras: Map<string, CameraEntity>;

  constructor(props: TCustomerEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.hash = props.hash;
    this.status = props.status;
    this.email = props.email;
    this.cpf = props.cpf;
    this._cameras = new Map(
      props.cameras.map((camera) => [camera.id.value, camera]),
    );
  }

  get cameras() {
    return Array.from(this._cameras.values());
  }

  getCamera(id: Uuid): TNullable<CameraEntity> {
    return this._cameras.get(id.value);
  }

  static async create(params: TCustomerEntityParams) {
    return new CustomerEntity({
      id: params.id ? new Uuid(params.id) : Uuid.create(),
      name: HumanName.create(params.name),
      email: Email.create(params.email),
      hash: await Hash.create(params.password, params.hashHandler),
      status: ENTITY_STATUS.ACTIVE,
      cpf: Document.create(params.cpf),
      cameras: [],
    });
  }

  static fromDatabase(params): CustomerEntity {
    return new CustomerEntity({
      id: new Uuid(params.id),
      name: new HumanName(params.name),
      email: new Email(params.email),
      hash: new Hash(params.password),
      cpf: new Document(params.cpf),
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
      cameras: params.cameras ?? [],
    });
  }

  getResponseValues(): TCustomer {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      status: this.status,
      cpf: this.cpf.value,
    };
  }
}

type TCustomerEntityProps = {
  readonly id: Uuid;
  readonly name: HumanName;
  readonly email: Email;
  readonly hash: Hash;
  readonly status: ENTITY_STATUS;
  readonly cpf: Document;
  readonly cameras: CameraEntity[];
};

type TCustomerEntityParams = {
  readonly id?: string;
  readonly hashHandler: IHashHandler;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly cpf: string;
};

export type TCustomer = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly status: ENTITY_STATUS;
  readonly cpf: string;
};
