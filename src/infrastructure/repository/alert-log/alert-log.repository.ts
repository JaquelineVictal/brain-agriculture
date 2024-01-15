import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AlertLogEntity } from 'src/domain/entity/alert-log/alert-log.entity';
import { AlertLogModel } from 'src/infrastructure/model/alert-log/alert-log.model';
import { Uuid } from 'src/domain/class/uuid/uuid.class';
import { TFilterGetAlertLogs } from 'src/domain/service/alert-log/filter-get-alert-logs.type';
import { DateTime } from 'src/domain/class/date-time/date-time.class';

@Injectable()
export class AlertLogRepository {
  constructor(private database: DatabaseService) {}

  async created(
    alertLogEntity: AlertLogEntity,
    cameraId: Uuid,
  ): Promise<AlertLogEntity> {
    const alertLogModel = AlertLogModel.fromEntity(alertLogEntity);

    const saveNewAlertLog = await this.database.alertLogs.create({
      data: alertLogModel.saveNewAlertLog(cameraId.value),
    });

    return AlertLogEntity.fromDatabase(saveNewAlertLog);
  }

  async findById(id: Uuid): Promise<AlertLogEntity | null> {
    const alertLog = await this.database.alertLogs.findUnique({
      where: { id: id.value },
    });

    if (!alertLog) return null;

    return AlertLogEntity.fromDatabase(alertLog);
  }

  async findAll(filter: TFilterGetAlertLogs): Promise<AlertLogEntity[]> {
    const { startDateTime, endDateTime, customerId } = filter;

    const conditions = {};

    if (startDateTime !== null && startDateTime !== undefined) {
      conditions['occurredAt'] = { gte: startDateTime.value };
    }

    if (endDateTime !== null && endDateTime !== undefined) {
      conditions['occurredAt'] = { lte: endDateTime.value };
    }

    if (customerId !== null && customerId !== undefined) {
      conditions['camera'] = { customerId: customerId.value };
    }

    if (this._isEmptyObject(conditions)) {
      conditions['occurredAt'] = {
        gte: DateTime.getStartOfDay(DateTime.now()).value,
        lte: DateTime.getEndOfDay(DateTime.now()).value,
      };
    }

    const alertLogs = await this.database.alertLogs.findMany({
      where: { ...conditions },
    });

    if (!alertLogs.length) return [];

    return alertLogs.map((customer) => AlertLogEntity.fromDatabase(customer));
  }

  async updateById(
    alertLogEntity: AlertLogEntity,
    cameraId: Uuid,
  ): Promise<AlertLogEntity> {
    const alertLogModel = AlertLogModel.fromEntity(alertLogEntity);

    const alertLog = await this.database.alertLogs.update({
      data: alertLogModel.saveNewAlertLog(cameraId.value),
      where: { id: alertLogModel.id },
    });

    return AlertLogEntity.fromDatabase(alertLog);
  }

  async deleteById(id: Uuid): Promise<AlertLogEntity> {
    const alertLog = await this.database.alertLogs.update({
      data: { deletedAt: new Date() },
      where: { id: id.value },
    });
    return AlertLogEntity.fromDatabase(alertLog);
  }

  _isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
