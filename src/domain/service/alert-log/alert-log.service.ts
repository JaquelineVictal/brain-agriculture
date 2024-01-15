import { Injectable } from '@nestjs/common';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { NotFoundException } from '../exception-handler/default-exception/not-found.exception copy';
import { TFilterGetAlertLogsDto } from './filter-get-alert-logs.type';
import { AlertLogRepository } from 'src/infrastructure/repository/alert-log/alert-log.repository';
import { CameraService } from '../camera/camera.service';
import { AlertLogDto } from 'src/application/dto/alert-log/alert-log.dto';
import { AlertLogEntity } from 'src/domain/entity/alert-log/alert-log.entity';
import { DateTime } from 'src/domain/class/date-time/date-time.class';

@Injectable()
export class AlertLogService {
  constructor(
    private readonly _repository: AlertLogRepository,
    private readonly _cameraService: CameraService,
  ) {}

  async created(createAlertLogDto: AlertLogDto): Promise<AlertLogEntity> {
    const camera = await this._cameraService.findById(
      createAlertLogDto.cameraId,
    );

    const createAlertLogEntity = await AlertLogEntity.create({
      ...createAlertLogDto,
      camera,
    });

    return await this._repository.created(createAlertLogEntity, camera.id);
  }

  async findById(alertLogId: string): Promise<AlertLogEntity> {
    const findAlertLog = await this._findAlertById(new Uuid(alertLogId));
    return findAlertLog;
  }

  async findAll(filter: TFilterGetAlertLogsDto): Promise<AlertLogEntity[]> {
    const { startDateTime, endDateTime, customerId } = filter;

    return await this._repository.findAll({
      startDateTime: startDateTime ? DateTime.fromString(startDateTime) : null,
      endDateTime: endDateTime ? DateTime.fromString(endDateTime) : null,
      customerId: customerId ? new Uuid(customerId) : null,
    });
  }

  async updateById(alertLogDto: AlertLogDto): Promise<AlertLogEntity> {
    const camera = await this._cameraService.findById(alertLogDto.cameraId);
    const alertLogEntity = await AlertLogEntity.create({
      ...alertLogDto,
      camera,
    });

    await this._findAlertById(alertLogEntity.id);
    await this._cameraService.findById(alertLogDto.cameraId);

    return await this._repository.updateById(
      alertLogEntity,
      new Uuid(alertLogDto.cameraId),
    );
  }

  async deleteById(alertLogId: string): Promise<AlertLogEntity> {
    const alertLogIdUuid = new Uuid(alertLogId);

    await this._findAlertById(alertLogIdUuid);

    return await this._repository.deleteById(alertLogIdUuid);
  }

  private async _findAlertById(userId: Uuid): Promise<AlertLogEntity> {
    const findAlertLog = await this._repository.findById(userId);

    if (!findAlertLog) {
      throw new NotFoundException('Alert not found');
    }
    return findAlertLog;
  }
}
