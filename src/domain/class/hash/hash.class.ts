import { IHashHandler } from 'src/domain/service/hash-handler/hash-handler.contract';

export class Hash {
  constructor(readonly value: string) {}

  static async create(value: string, handler: IHashHandler) {
    return new Hash(await handler.hash(value));
  }

  async compare(value: string, handler: IHashHandler) {
    return await handler.compare(value, this.value);
  }
}
