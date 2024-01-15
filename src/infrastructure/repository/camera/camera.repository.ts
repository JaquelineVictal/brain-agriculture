import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CameraModel } from 'src/infrastructure/model/camera/camera.model';
import { CameraEntity } from 'src/domain/entity/camera/camera.entity';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { TFilterGetCameras } from 'src/domain/service/camera/filter-get-cameras.type';

@Injectable()
export class CameraRepository {
  constructor(private database: DatabaseService) {}

  async created(
    cameraEntity: CameraEntity,
    customerId: Uuid,
  ): Promise<CameraEntity> {
    const cameraModel = CameraModel.fromEntity(cameraEntity);

    const saveNewCamera = await this.database.cameras.create({
      data: cameraModel.saveNewCamera(customerId.value),
    });

    return CameraEntity.fromDatabase(saveNewCamera);
  }

  async findById(id: Uuid): Promise<CameraEntity | null> {
    const camera = await this.database.cameras.findUnique({
      where: { id: id.value },
    });

    if (!camera) return null;

    return CameraEntity.fromDatabase(camera);
  }

  async findAll(filter: TFilterGetCameras): Promise<CameraEntity[]> {
    const { isEnabled, customerId } = filter;

    const conditions = {};

    if (isEnabled !== null && isEnabled !== undefined) {
      conditions['isEnabled'] = isEnabled;
    }

    if (customerId !== null && customerId !== undefined) {
      conditions['customerId'] = customerId.value;
    }

    const cameras = await this.database.cameras.findMany({
      where: { ...conditions },
    });

    if (!cameras.length) return [];

    return cameras.map((customer) => CameraEntity.fromDatabase(customer));
  }

  async updateById(
    cameraEntity: CameraEntity,
    customerId: Uuid,
  ): Promise<CameraEntity> {
    const cameraModel = CameraModel.fromEntity(cameraEntity);

    const camera = await this.database.cameras.update({
      data: cameraModel.saveNewCamera(customerId.value),
      where: { id: cameraModel.id },
    });

    return CameraEntity.fromDatabase(camera);
  }

  async deleteById(id: Uuid): Promise<CameraEntity> {
    const camera = await this.database.cameras.update({
      data: { deletedAt: new Date() },
      where: { id: id.value },
    });
    return CameraEntity.fromDatabase(camera);
  }
}
