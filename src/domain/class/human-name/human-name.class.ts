export class HumanName {
  constructor(readonly value: string) {}

  static create(name: string) {
    return new HumanName(name);
  }

  first() {
    return this.value.split(' ')[0];
  }

  last() {
    const [, ...last] = this.value.split(' ');
    return last.join(' ');
  }
}
