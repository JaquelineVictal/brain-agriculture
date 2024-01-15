import { ENV } from 'src/utils/env.enum';
import { EnvUtils } from 'src/utils/env.utils';

export const JWT_EXPIRES_IN_MINUTES = EnvUtils.getNumber(
  ENV.JWT_EXPIRES_IN_MINUTES,
  60,
);

export const JWT_SECRET = EnvUtils.getString(ENV.JWT_SECRET);
