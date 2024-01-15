import { InvalidIpException } from './invalid-ip.exception';

export class Ip {
  constructor(readonly value: string) {}

  static create(ipToCheck: string) {
    if (!Ip.validate(ipToCheck)) {
      throw new InvalidIpException(ipToCheck);
    }
    return new Ip(ipToCheck);
  }

  static validate(ipToCheck: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    if (ipv4Regex.test(ipToCheck) || ipv6Regex.test(ipToCheck)) {
      return true;
    }
    return false;
  }
}
