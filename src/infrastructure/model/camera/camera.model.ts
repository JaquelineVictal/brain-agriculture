import { Prisma } from '@prisma/client';
import { Ip } from 'src/domain/class/ip/ip.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { CameraEntity } from 'src/domain/entity/camera/camera.entity';
import { ENTITY_STATUS } from 'src/domain/entity/entity-status.enum';
import { TNullable } from 'src/domain/types/nullable.type';

export class CameraModel {
  readonly id: string;
  readonly ip: string;
  readonly name: string;
  readonly isEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;

  constructor(props: TCameraModelProps) {
    this.id = props.id;
    this.ip = props.ip;
    this.name = props.name;
    this.isEnabled = props.isEnabled;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static fromEntity(entity: CameraEntity) {
    return new CameraModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: entity.status === ENTITY_STATUS.ACTIVE ? null : new Date(),
      id: entity.id.value,
      ip: entity.ip.value,
      name: entity.name,
      isEnabled: entity.isEnabled,
    });
  }

  toEntity(): CameraEntity {
    return new CameraEntity({
      id: new Uuid(this.id),
      ip: new Ip(this.ip),
      name: this.name,
      isEnabled: this.isEnabled,
      status: this.deletedAt ? ENTITY_STATUS.INACTIVE : ENTITY_STATUS.ACTIVE,
    });
  }

  saveNewCamera(customerId: string): Prisma.CamerasCreateInput {
    return {
      id: this.id,
      ip: this.ip,
      name: this.name,
      isEnabled: this.isEnabled,
      customer: {
        connect: { id: customerId },
      },
    };
  }
}

type TCameraModelProps = {
  readonly id: string;
  readonly ip: string;
  readonly name: string;
  readonly isEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: TNullable<Date>;
};
