import { Injectable } from '@nestjs/common';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';
import { CameraRepository } from 'src/infrastructure/repository/camera/camera.repository';
import { CameraDto } from 'src/application/dto/camera/camera.dto';
import { CameraEntity } from 'src/domain/entity/camera/camera.entity';
import { CustomerService } from '../customer/customer.service';
import { TFilterGetCamerasDto } from './filter-get-cameras.type';

@Injectable()
export class CameraService {
  constructor(
    private readonly _repository: CameraRepository,
    private readonly _customerService: CustomerService,
  ) {}

  async created(createCameraDto: CameraDto): Promise<CameraEntity> {
    const createCameraEntity = await CameraEntity.create({
      ...createCameraDto,
    });

    await this._customerService.findById(createCameraDto.customerId);

    return await this._repository.created(
      createCameraEntity,
      new Uuid(createCameraDto.customerId),
    );
  }
  a;

  async findById(cameraId: string): Promise<CameraEntity> {
    const findCamera = await this._findCameraById(new Uuid(cameraId));
    return findCamera;
  }

  async findAll(filter: TFilterGetCamerasDto): Promise<CameraEntity[]> {
    const { isEnabled, customerId } = filter;

    return await this._repository.findAll({
      isEnabled: isEnabled ? this._convertStingToBoolean(isEnabled) : null,
      customerId: customerId ? new Uuid(customerId) : null,
    });
  }

  async updateById(cameraDto: CameraDto): Promise<CameraEntity> {
    const cameraEntity = await CameraEntity.create({
      ...cameraDto,
    });

    await this._findCameraById(cameraEntity.id);
    await this._customerService.findById(cameraDto.customerId);

    return await this._repository.updateById(
      cameraEntity,
      new Uuid(cameraDto.customerId),
    );
  }

  async deleteById(cameraId: string): Promise<CameraEntity> {
    const customerIdUuid = new Uuid(cameraId);

    await this._findCameraById(customerIdUuid);

    return await this._repository.deleteById(customerIdUuid);
  }

  private async _findCameraById(userId: Uuid): Promise<CameraEntity> {
    const findCamera = await this._repository.findById(userId);

    if (!findCamera) {
      throw new NotFoundException('Camera not found');
    }
    return findCamera;
  }

  private _convertStingToBoolean(string: string): boolean {
    return string === 'true';
  }
}
