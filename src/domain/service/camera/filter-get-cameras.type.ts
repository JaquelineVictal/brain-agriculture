import { Uuid } from 'src/domain/class/uuid/uuid.class';

export type TFilterGetCamerasDto = {
  isEnabled?: string;
  customerId?: string;
};

export type TFilterGetCameras = {
  isEnabled?: boolean;
  customerId?: Uuid;
};
