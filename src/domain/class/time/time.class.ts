export class Time {
  private constructor(readonly value: number) {}

  static fromMillisecond(value: number) {
    return new Time(value);
  }

  static fromSeconds(value: number) {
    return new Time(value * 1000);
  }

  static fromMinutes(value: number) {
    return Time.fromSeconds(value * 60);
  }

  static fromHours(value: number) {
    return Time.fromMinutes(value * 60);
  }

  static fromDays(value: number) {
    return Time.fromMinutes(value * 24);
  }

  get milliseconds() {
    return this.value;
  }

  get days(): number {
    return this.hours * 24;
  }

  get hours(): number {
    return this.minutes * 60;
  }

  get minutes(): number {
    return this.seconds * 60;
  }

  get seconds(): number {
    return this.value * 1000;
  }
}
