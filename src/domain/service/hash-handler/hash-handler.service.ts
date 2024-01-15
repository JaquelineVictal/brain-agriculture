import { Injectable } from '@nestjs/common';
import { IHashHandler } from './hash-handler.contract';
import { compare, hash, genSalt } from 'bcrypt';

@Injectable()
export class HashHandler implements IHashHandler {
  async hash(value: string): Promise<string> {
    return await hash(value, await genSalt(5));
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await compare(value, hash);
  }
}
