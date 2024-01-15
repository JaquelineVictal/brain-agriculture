import { Ip } from 'src/domain/class/ip/ip.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { ENTITY_STATUS } from '../entity-status.enum';

export class CameraEntity {
  readonly id: Uuid;
  readonly ip: Ip;
  readonly name: string;
  readonly isEnabled: boolean;
  readonly status: ENTITY_STATUS;

  constructor(props: TCameraEntityProps) {
    this.id = props.id;
    this.ip = props.ip;
    this.name = props.name;
    this.isEnabled = props.isEnabled;
    this.status = props.status;
  }

  static async create(params: TCameraEntityParams) {
    return new CameraEntity({
      id: params.id ? new Uuid(params.id) : Uuid.create(),
      ip: Ip.create(params.ip),
      name: params.name,
      isEnabled: params.isEnabled,
      status: ENTITY_STATUS.ACTIVE,
    });
  }

  static fromDatabase(params): CameraEntity {
    return new CameraEntity({
      id: new Uuid(params.id),
      ip: new Ip(params.ip),
      isEnabled: params.isEnabled,
      name: params.name,
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  getResponseValues(): TCamera {
    return {
      id: this.id.value,
      ip: this.ip.value,
      name: this.name,
      isEnabled: this.isEnabled,
      status: this.status,
    };
  }
}

type TCameraEntityProps = {
  readonly id: Uuid;
  readonly ip: Ip;
  readonly isEnabled: boolean;
  readonly name: string;
  readonly status: ENTITY_STATUS;
};

type TCameraEntityParams = {
  readonly id?: string;
  readonly ip: string;
  readonly isEnabled: boolean;
  readonly name: string;
};

export type TCamera = {
  readonly id: string;
  readonly ip: string;
  readonly isEnabled: boolean;
  readonly name: string;
  readonly status: ENTITY_STATUS;
};
