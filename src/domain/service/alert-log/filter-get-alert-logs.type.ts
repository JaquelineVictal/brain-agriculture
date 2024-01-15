import { DateTime } from 'src/domain/class/date-time/date-time.class';
import { Uuid } from 'src/domain/class/uuid/uuid.class';

export type TFilterGetAlertLogsDto = {
  customerId?: string;
  startDateTime?: string;
  endDateTime?: string;
};

export type TFilterGetAlertLogs = {
  customerId?: Uuid;
  startDateTime?: DateTime;
  endDateTime?: DateTime;
};
