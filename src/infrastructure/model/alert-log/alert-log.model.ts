import { Prisma } from '@prisma/client';
import { DateTime } from 'src/domain/class/date-time/date-time.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { AlertLogEntity } from 'src/domain/entity/alert-log/alert-log.entity';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { TNullable } from 'src/domain/types/nullable.type';

export class AlertLogModel {
  readonly id: string;
  readonly occurredAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;

  constructor(props: TAlertLogModelProps) {
    this.id = props.id;
    this.occurredAt = props.occurredAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static fromEntity(entity: AlertLogEntity) {
    return new AlertLogModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: entity.status === ENTITY_STATUS.ACTIVE ? null : new Date(),
      id: entity.id.value,
      occurredAt: entity.occurredAt.value,
    });
  }

  toEntity(): AlertLogEntity {
    return new AlertLogEntity({
      id: new Uuid(this.id),
      occurredAt: new DateTime(this.occurredAt),
      status: this.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  saveNewAlertLog(cameraId: string): Prisma.AlertLogsCreateInput {
    return {
      id: this.id,
      occurredAt: this.occurredAt,
      camera: {
        connect: { id: cameraId },
      },
    };
  }
}

type TAlertLogModelProps = {
  readonly id: string;
  readonly occurredAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;
};
