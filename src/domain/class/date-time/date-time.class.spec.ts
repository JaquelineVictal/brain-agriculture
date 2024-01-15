import { DateTime } from './date-time.class';

describe('DateTime', () => {
  it('should create DateTime instance from current date', () => {
    const now = new Date();
    const dateTime = DateTime.now();
    expect(dateTime.value).toEqual(now);
  });

  it('should create DateTime instance from string', () => {
    const dateString = '2023-09-21T12:00:00Z'; // Substitua pelo formato de data desejado
    const expectedDate = new Date(dateString);
    const dateTime = DateTime.fromString(dateString);
    expect(dateTime.value).toEqual(expectedDate);
  });

  it('should check if a date is between an interval', () => {
    const interval = {
      begin: new Date('2023-09-20T00:00:00Z'),
      end: new Date('2023-09-22T00:00:00Z'),
    };
    const dateWithinInterval = new Date('2023-09-21T12:00:00Z');
    const dateBeforeInterval = new Date('2023-09-19T12:00:00Z');
    const dateAfterInterval = new Date('2023-09-23T12:00:00Z');

    const dateTimeWithinInterval = new DateTime(dateWithinInterval);
    const dateTimeBeforeInterval = new DateTime(dateBeforeInterval);
    const dateTimeAfterInterval = new DateTime(dateAfterInterval);

    expect(dateTimeWithinInterval.isBetween(interval)).toBe(true);
    expect(dateTimeBeforeInterval.isBetween(interval)).toBe(false);
    expect(dateTimeAfterInterval.isBetween(interval)).toBe(false);
  });

  it('should check if a date is after another date', () => {
    const date1 = new Date('2023-09-20T00:00:00Z');
    const date2 = new Date('2023-09-21T00:00:00Z');
    const dateTime1 = new DateTime(date1);
    const dateTime2 = new DateTime(date2);

    expect(dateTime2.isAfter(date1)).toBe(true);
    expect(dateTime1.isAfter(date2)).toBe(false);
  });

  it('should check if a date is before another date', () => {
    const date1 = new Date('2023-09-20T00:00:00Z');
    const date2 = new Date('2023-09-21T00:00:00Z');
    const dateTime1 = new DateTime(date1);
    const dateTime2 = new DateTime(date2);

    expect(dateTime1.isBefore(date2)).toBe(true);
    expect(dateTime2.isBefore(date1)).toBe(false);
  });

  it('should check if a date is equal to another date', () => {
    const date1 = new Date('2023-09-20T00:00:00Z');
    const date2 = new Date('2023-09-20T00:00:00Z');
    const dateTime1 = new DateTime(date1);
    const dateTime2 = new DateTime(date2);

    expect(dateTime1.isEqual(date2)).toBe(true);
    expect(dateTime2.isEqual(date1)).toBe(true);
  });

  it('should return timestamp', () => {
    const dateString = '2023-09-21T12:00:00Z';
    const expectedTimestamp = new Date(dateString).getTime();
    const dateTime = DateTime.fromString(dateString);
    const timestamp = dateTime.timestamp();
    expect(timestamp).toEqual(expectedTimestamp);
  });
});
