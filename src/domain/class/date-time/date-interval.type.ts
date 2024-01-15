import { TGenericInterval } from 'src/domain/types/generic-interval.type';
import { DateTime } from './date-time.class';

export type TDateInterval = TGenericInterval<Date | DateTime>;
