import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { DateTime } from 'src/domain/class/date-time/date-time.class';
import { CameraEntity } from '../camera/camera.entity';
import { ENTITY_STATUS } from '../entity-status.enum';

export class AlertLogEntity {
  readonly id: Uuid;
  readonly occurredAt: DateTime;
  readonly status: ENTITY_STATUS;
  readonly camera?: CameraEntity;

  constructor(props: TAlertLogEntityProps) {
    this.id = props.id;
    this.occurredAt = props.occurredAt;
    this.status = props.status;
    this.camera = props.camera;
  }

  static async create(params: TAlertLogEntityParams) {
    return new AlertLogEntity({
      id: params.id ? new Uuid(params.id) : Uuid.create(),
      occurredAt: DateTime.fromString(params.occurredAt),
      status: ENTITY_STATUS.ACTIVE,
      camera: params.camera,
    });
  }

  static fromDatabase(params): AlertLogEntity {
    return new AlertLogEntity({
      id: new Uuid(params.id),
      occurredAt: DateTime.fromString(params.occurredAt),
      status: params.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
      camera: params.camera,
    });
  }
  getResponseValues(): TAlertLog {
    return {
      id: this.id.value,
      occurredAt: this.occurredAt.value,
      status: this.status,
    };
  }
}

type TAlertLogEntityProps = {
  readonly id: Uuid;
  readonly occurredAt: DateTime;
  readonly status: ENTITY_STATUS;
  readonly camera?: CameraEntity;
};

type TAlertLogEntityParams = {
  readonly id?: string;
  readonly occurredAt: string;
  readonly camera?: CameraEntity;
};

export type TAlertLog = {
  readonly id: string;
  readonly occurredAt: Date;
  readonly status: ENTITY_STATUS;
};
