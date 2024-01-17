import { EXCEPTION_CODE } from 'src/domain/class/abstract-exception/exception-code.enum';
import { AbstractException } from 'src/domain/class/abstract-exception/exception.abstract';
import { UserEntity } from 'src/domain/entity/user/user.entity';

export class InvalidPasswordException extends AbstractException {
  readonly code = EXCEPTION_CODE.FORBIDDEN;
  constructor(user: UserEntity) {
    super('Invalid Email or Password');
    this.add('userId', user.id);
    this.add('UserEmail', user.email.value);
    this.add('UserName', user.name.value);
  }
}
