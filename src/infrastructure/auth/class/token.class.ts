import { UserEntity } from 'src/domain/entity/user/user.entity';

export class Token {
  readonly userId: number;

  constructor(user: UserEntity) {
    this.userId = user.id;
  }
}
